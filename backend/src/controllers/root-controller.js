import userRepo from "../repos/userRepo.js";
import bcrypt from "bcrypt";
import findMissingFields from "../utils/find-missing-fields.js";
import { validateEmail, validateName, validatePassword } from "../../../frontend/utils/validation/auth.js";
import validateRole from "../utils/validateRole.js";

export async function createUser(req, res) {
    let { name, email, password, role } = req.body;
    if (email && await userRepo.isEmailRegistered(email)) {
        return res.status(409).send("Email already in use");
    }
    if (!(name && email && password && role)) {
        let missingArray = findMissingFields([[name, "name"], [email, "email"], [password, "password"], [role, "role"]]);
        return res.status(400).send("Missing fields are required for signup: " + JSON.stringify(missingArray));
    } else {
        let nameValidation = validateName({ name: name });
        let emailValidation = validateEmail({ email: email });
        let passwordValidation = validatePassword({ password: password });
        let roleValidation = validateRole({ role: role });
        if (nameValidation.msg == null) {
            nameValidation = false;
        }
        if (emailValidation.msg == null) {
            emailValidation = false;
        }
        if (passwordValidation.msg == null) {
            passwordValidation = false;
        }
        if (roleValidation.msg == null) {
            roleValidation = false;
        }
        if (nameValidation || emailValidation || passwordValidation || roleValidation) {
            let invalidArray = [];
            if (nameValidation) {
                invalidArray.push(nameValidation.msg);
            }
            if (emailValidation) {
                invalidArray.push(emailValidation.msg);
            }
            if (passwordValidation) {
                invalidArray.push(passwordValidation.msg);
            }
            if (roleValidation) {
                invalidArray.push(roleValidation.msg);
            }
            return res.status(400).send("Some fields do not meet the requirements: " + JSON.stringify(invalidArray));
        } else {
            let hashedPassword = await bcrypt.hash(password, 12);
            let { userId } = await userRepo.createUser(name, email, hashedPassword, role);
            return res.status(201).send(String(userId));
        }
    }
}

export async function authorizeLogin(req, res) {
    let { email, password } = req.body;
    if (!(email && password)) {
        let missingArray = findMissingFields([[email, "email"], [password, "password"]]);
        return res.status(400).send("Missing fields are required for login: " + JSON.stringify(missingArray));
    } else {
        let storedPassword;
        let { foundPassword, userId } = await userRepo.fetchUserPassword(email);
        switch (foundPassword) {
            case "multiple users have this email":
                console.log(JSON.stringify({ "error source": "/backend/src/controllers/root-controller.js, authorizeLogin", "error cause": "getting user password", "error message/details": "multiple accounts have been found registered with this email" }));
                return res.status(502).send("A data configuration problem has occured with this user's account, Unable to login");
                break;
            case "no user has this email":
                return res.status(401).send("No user is signed up with this email");
                break;
            case "no password found":
                console.log(JSON.stringify({ "error source": "/backend/src/controllers/root-controller.js, authorizeLogin", "error cause": "getting user password", "error message/details": "A user has been found registered with this email without a password" }));
                return res.status(502).send("A data configuration problem has occured with this user's account, Unable to login");
                break;
            default:
                storedPassword = foundPassword;
                break;
        };
        if (await bcrypt.compare(password, storedPassword)) {
            return res.status(200).send(String(userId));
        } else {
            return res.status(401).send("Incorrect password for user, Unable to login");
        }
    }
}

export async function fetchActions(req, res) {
    let { id } = req.params;
    let userId = Number(id);
    if (!Number.isInteger(userId)) {
        return res.status(400).send("Integer user id must be passed in as a route parameter" );
    } else {
        let actions = await userRepo.fetchUserActions(userId);
        return res.status(200).json({ actions: actions });
    }
}

export async function createAction(req, res) {
    let { name, description, startDate, endDate, type, doctor, doctorId, causedConditions, solvedConditions } = req.body;
    let { id } = req.params;
    let userId = Number(id);
    if (!Number.isInteger(userId)) {
        return res.status(400).send("Integer user id must be passed in as a route parameter");
    } else if (!(name && description && startDate && endDate && type)) {
        let missingArray = findMissingFields([[name, "name"], [description, "description"], [startDate, "startDate"], [endDate, "endDate"], [type, "type"]]);
        return res.status(400).send("Missing fields are required to create new action: " + JSON.stringify(missingArray));
    } else {
        let actionId = await userRepo.createAction(userId, name, description, startDate, endDate, type, doctor, doctorId);
        if (causedConditions) {
            for (let i = 0; i < causedConditions.length; i++) {
                await userRepo.createActionToConditionAssociation(userId, actionId, causedConditions[i], "Caused");
            }
        }
        if (solvedConditions) {
            for (let i = 0; i < solvedConditions.length; i++) {
                await userRepo.createActionToConditionAssociation(userId, actionId, solvedConditions[i], "Solved");
            }
        }
        return res.sendStatus(201);
    }
}

export async function fetchConditions(req, res) {
    let { id } = req.params;
    let userId = Number(id);
    if (!Number.isInteger(userId)) {
        return res.status(400).send("Integer user id must be passed in as a route parameter");
    } else {
        let conditions = await userRepo.fetchUserConditions(userId);
        return res.status(200).json({ conditions: conditions });
    }
}

export async function createCondition(req, res) {
    let { name, description, type, symptoms, startDate, endDate, causedWhichActions, sideEffectForWhichActions } = req.body;
    let { id } = req.params;
    let userId = Number(id);
    if (!Number.isInteger(userId)) {
        return res.status(400).send("Integer user id must be passed in as a route parameter");
    } else if (!(name && description && type && symptoms && startDate && endDate)) {
        let missingArray = findMissingFields([[name, "name"], [description, "description"], [type, "type"], [symptoms, "symptoms"], [startDate, "startDate"], [endDate, "endDate"]]);
        return res.status(400).send("Missing fields are required to create new condition: " + JSON.stringify(missingArray));
    } else {
        if (!(symptoms.length > 0)) {
            return res.status(400).send("At least one symptom is needed to create a condition");
        } else {
            let conditionId = await userRepo.createCondition(userId, name, description, type, symptoms, startDate, endDate);
            if (causedWhichActions) {
                for (let i = 0; i < causedWhichActions.length; i++) {
                    await userRepo.createConditionToActionAssociation(userId, causedWhichActions[i], conditionId, "Solved");
                }
            }
            if (sideEffectForWhichActions) {
                for (let i = 0; i < sideEffectForWhichActions.length; i++) {
                    await userRepo.createConditionToActionAssociation(userId, sideEffectForWhichActions[i], conditionId, "Caused");
                }
            }
            return res.sendStatus(201);
        }
    }
}

export async function fetchConditionsForAction(req, res) {
    let { id, actionId } = req.params;
    let userId = Number(id);
    let actionIdInt = Number(actionId);
    if (!Number.isInteger(userId)) {
        if (!Number.isInteger(actionIdInt)) {
            return res.status(400).send("Integer user id and integer action id must be passed in as route parameters");
        } else {
            return res.status(400).send("Integer user id must be passed in as a route parameter");
        }
    } else if (!Number.isInteger(actionIdInt)) {
        return res.status(400).send("Integer action id must be passed in as a route parameter");
    } else {
        let conditions = await userRepo.fetchActionToConditionAssociation(userId, actionIdInt);
        return res.status(200).json({ conditions: conditions });
    }
}

export async function fetchActionsForCondition(req, res) {
    let { id, conditionId } = req.params;
    let userId = Number(id);
    let conditionIdInt = Number(conditionId);
    if (!Number.isInteger(userId)) {
        if (!Number.isInteger(conditionIdInt)) {
            return res.status(400).send("Integer user id and integer condition id must be passed in as route parameters");
        } else {
            return res.status(400).send("Integer user id must be passed in as a route parameter");
        }
    } else if (!Number.isInteger(conditionIdInt)) {
        return res.status(400).send("Integer condition id must be passed in as a route parameter");
    } else {
        let actions = await userRepo.fetchConditionToActionAssociation(userId, conditionIdInt);
        return res.status(200).json({ actions: actions });
    }
}

export async function fetchProfileStats(req, res) {
    let { id } = req.params;
    let userId = Number(id);
    if (!Number.isInteger(userId)) {
        return res.status(400).send("Integer user id must be passed in as a route parameter");
    } else {
        let stats = await userRepo.fetchProfileStats(userId);
        return res.status(200).json(stats);
    }
}

export async function grantPermission(req, res) {
    let { id } = req.params;
    let patientId = Number(id);
    let { doctorId, scope, startDate, endDate } = req.body;
    if (!Number.isInteger(patientId)) {
        return res.status(400).send("Integer patient id must be passed in as a route parameter");
    } else if (!(doctorId && scope && startDate && endDate)) {
        let missingArray = findMissingFields([[doctorId, "doctorId"], [scope, "scope"], [startDate, "startDate"], [endDate, "endDate"]]);
        return res.status(400).send("Missing fields are required to create new condition: " + JSON.stringify(missingArray));
    } else {
        await userRepo.createPermission(patientId, doctorId, scope, 'Granted', startDate, endDate);
        return res.sendStatus(201);
    }
}

export async function requestPermission(req, res) {
    let { id } = req.params;
    let doctorId = Number(id);
    let { patientId, scope, startDate, endDate } = req.body;
    if (!Number.isInteger(doctorId)) {
        return res.status(400).send("Integer doctor id must be passed in as a route parameter");
    } else if (!(patientId && scope && startDate && endDate)) {
        let missingArray = findMissingFields([[patientId, "patientId"], [scope, "scope"], [startDate, "startDate"], [endDate, "endDate"]]);
        return res.status(400).send("Missing fields are required to create new condition: " + JSON.stringify(missingArray));
    } else {
        await userRepo.createPermission(patientId, doctorId, scope, 'Pending', startDate, endDate);
        return res.sendStatus(201);
    }
}

export async function decidePermission(req, res){
    let { id } = req.params;
    let userId = Number(id);
    let { permissionId, decision } = req.body;
    if(!(permissionId && decision)){
        let missingArray = findMissingFields([[permissionId, "permissionId"], [decision, "decision"]]);
        return res.status(400).send("Missing fields are required for login: " + JSON.stringify(missingArray));
    }else{
        await userRepo.decidePermission(permissionId, decision);
        return res.sendStatus(200);
    }
}

export async function fetchPermissions(req, res){
    let { id } = req.params;
    let userId = Number(id);
    if(!Number.isInteger(userId)){
        return res.status(400).send("Integer user id must be passed in as a route parameter");
    }else{
        let permissions = await userRepo.fetchPermissions(userId);
        return res.status(200).json({permissions: permissions});
    }
}