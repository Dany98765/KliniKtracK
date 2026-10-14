import userRepo from "../repos/userRepo.js";
import bcrypt from "bcrypt";
import findMissingFields from "../utils/find-missing-fields.js";
import {validateEmail, validateName, validatePassword} from "../../../frontend/utils/validation/signup.js";
import validateRole from "../utils/validateRole.js";

export async function createNewUser(req, res){
    let {name, email, password, role} = req.body;
    if(!(name && email && password && role)){
        let missingArray = findMissingFields([[name, "name"], [email, "email"], [password, "password"], [role, "role"]]);
        return res.status(400).send("Missing fields are required for signup: " + JSON.stringify(missingArray));
    }else{
        let nameValidation = validateName({name: name});
        let emailValidation = validateEmail({email: email});
        let passwordValidation = validatePassword({password: password});
        let roleValidation = validateRole({role: role});
        if(nameValidation.msg == null){
            nameValidation = false;
        }
        if(emailValidation.msg == null){
            emailValidation = false;
        }
        if(passwordValidation.msg == null){
            passwordValidation = false;
        }
        if(roleValidation.msg == null){
            roleValidation = false;
        }
        if(nameValidation || emailValidation || passwordValidation || roleValidation){
            let invalidArray = [];
            if(nameValidation){
                invalidArray.push(nameValidation.msg)
            }
            if(emailValidation){
                invalidArray.push(emailValidation.msg)
            }
            if(passwordValidation){
                invalidArray.push(passwordValidation.msg);
            }
            if(roleValidation){
                invalidArray.push(roleValidation.msg);
            }
            return res.status(400).send("Some fields do not meet the requirements: " + JSON.stringify(invalidArray));
        }else{
            let hashedPassword = await bcrypt.hash(password, 12);
            await userRepo.createNewUser(name, email, hashedPassword, role);
            return res.sendStatus(201);
        }
    }
}

export async function authorizeLogin(req, res){
    let {email, password} = req.body;
    if(!(email && password)){
        let missingArray = findMissingFields([[email, "email"], [password, "password"]]);
        return res.status(400).send("Missing fields are required for login: " + JSON.stringify(missingArray));
    }else{
        let storedPassword;
        let foundPassword = await userRepo.getUserPassword(email);
        switch(foundPassword){
            case "multiple users have this email": 
                console.log(JSON.stringify({"error source": "/backend/src/controllers/root-controller.js, authorizeLogin", "error cause": "getting user password", "error message/details": "multiple accounts have been found registered with this email"}));
                return res.status(502).send("A data configuration problem has occured with this user's account, Unable to login");
                break;
            case "no user has this email": 
                return res.status(401).send("No user is signed up with this email");
                break;
            case "no password found": 
                console.log(JSON.stringify({"error source": "/backend/src/controllers/root-controller.js, authorizeLogin", "error cause": "getting user password", "error message/details": "A user has been found registered with this email without a password"}));
                return res.status(502).send("A data configuration problem has occured with this user's account, Unable to login");
                break;
            default: 
                storedPassword = foundPassword;
                break;
        };
        if(await bcrypt.compare(password, storedPassword)){
            return res.sendStatus(200);
        }else{
            return res.status(401).send("Incorrect password for user, Unable to login");
        }
    }
}