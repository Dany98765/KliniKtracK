import db from "../pool.js";

let userRepo = {
    async createUser(name, email, password, role) {
        try {
            let newUser = await db.query("INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id", [name, email, password, role]);
            return {
                userId: newUser.rows[0].id
            }
        } catch (err) {
            throw { "error source": "/backend/src/repos/userRepo.js, createUser", "error cause": "creating new user", "error message": err.message, "error details": err };
        }
    },

    async fetchUserPassword(email) {
        try {
            let results = await db.query("SELECT password FROM users WHERE email = $1", [email]);
            let rows = results.rows;
            let idResults = await db.query("SELECT id FROM users WHERE email = $1", [email]);
            let idRows = idResults.rows;
            if (rows.length > 1) {
                return "multiple users have this email";
            } else if (rows.length < 1) {
                return "no user has this email";
            } else {
                let password = rows[0].password
                if (!password) {
                    return "no password found";
                } else {
                    return {
                        foundPassword: password,
                        userId: idRows[0].id
                    };
                }
            }
        } catch (err) {
            throw { "error source": "/backend/src/repos/userRepo.js, fetchUserPassword", "error cause": "getting user password", "error message": err.message, "error details": err };
        }
    },

    async isEmailRegistered(email) {
        try {
            let results = await db.query("SELECT * FROM users WHERE email = $1", [email]);
            let rows = results.rows;
            if (rows.length == 0) {
                return false;
            } else if (rows.length == 1) {
                return true;
            } else {
                console.log(JSON.stringify({ "error source": "/backend/src/repos/userRepo.js, isEmailRegistered", "error cause": "checking ig email is registered", "error message/details": "multiple accounts have been found registered with this email" }));
            }
        } catch (err) {
            throw { "error source": "/backend/src/repos/userRepo.js, isEmailRegistered", "error cause": "checking if email is registered", "error message": err.message, "error details": err };
        }
    },

    async fetchUserActions(id) {
        try {
            let results = await db.query("SELECT name, description, start_date, end_date, doctor, doctor_id, type FROM actions WHERE user_id = $1", [id]);
            let rows = results.rows;
            return rows;
        } catch (err) {
            throw { "error source": "/backend/src/repos/userRepo.js, fetchUserActions", "error cause": "fetching user actions", "error message": err.message, "error details": err };
        }
    },

    async createAction(id, name, description, start_date, end_date, type, doctor, doctor_id) {
        try {
            let results = await db.query("INSERT INTO actions (user_id, name, description, start_date, end_date, type, doctor, doctor_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id", [id, name, description, start_date, end_date, type, doctor, doctor_id]);
            let rows = results.rows;
            let actionId = rows[0].id
            return actionId;
        } catch (err) {
            throw { "error source": "/backend/src/repos/userRepo.js, createAction", "error cause": "creating action", "error message": err.message, "error details": err };
        }
    },

    async fetchUserConditions(id) {
        try {
            let results = await db.query("SELECT name, description, type, symptoms, start_date, end_date FROM conditions WHERE user_id = $1", [id]);
            let rows = results.rows;
            return rows;
        } catch (err) {
            throw { "error source": "/backend/src/repos/userRepo.js, fetchUserConditions", "error cause": "fetching user conditions", "error message": err.message, "error details": err };
        }
    },

    async createCondition(id, name, description, type, symptoms, start_date, end_date) {
        try {
            let results = await db.query("INSERT INTO conditions (user_id, name, description, type, symptoms, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id", [id, name, description, type, symptoms, start_date, end_date]);
            let rows = results.rows;
            let conditionId = rows[0].id
            return conditionId;
        } catch (err) {
            throw { "error source": "/backend/src/repos/userRepo.js, createConditions", "error cause": "creating condition", "error message": err.message, "error details": err };
        }
    },

    async createActionToConditionAssociation(userId, actionId, conditionId, roleOfAction) {
        try {
            await db.query("INSERT INTO actions_to_conditions (user_id, action_id, condition_id, role_of_action) VALUES ($1, $2, $3, $4)", [userId, actionId, conditionId, roleOfAction]);
        } catch (err) {
            throw { "error source": "/backend/src/repos/userRepo.js, createActionToConditionAssociation", "error cause": "creating action to condition association", "error message": err.message, "error details": err };
        }
    },

    async createConditionToActionAssociation(userId, actionId, conditionId, roleOfAction) {
        try {
            await db.query("INSERT INTO actions_to_conditions (user_id, action_id, condition_id, role_of_action) VALUES ($1, $2, $3, $4)", [userId, actionId, conditionId, roleOfAction]);
        } catch (err) {
            throw { "error source": "/backend/src/repos/userRepo.js, createConditionToActionAssociation", "error cause": "creating condition to action association", "error message": err.message, "error details": err };
        }
    }, 

    async fetchActionToConditionAssociation(userId, actionId){
        try{
            let results = await db.query("SELECT atc.condition_id, c.name, atc.role_of_action FROM actions_to_conditions atc JOIN conditions c ON atc.condition_id = c.id WHERE atc.user_id = $1 AND atc.action_id = $2", [userId, actionId]);
            let rows = results.rows;
            return rows;
        }catch(err){
            throw {"error source": "/backend/src/repos/userRepo.js, fetchActionToConditionAssociation", "error cause": "fetching action to condition association", "error message": err.message, "error details": err};
        }
    }, 

    async fetchConditionToActionAssociation(userId, conditionId){
        try{
            let results = await db.query("SELECT atc.action_id, a.name, atc.role_of_action FROM actions_to_conditions atc JOIN actions a ON atc.action_id = a.id WHERE atc.user_id = $1 AND atc.condition_id = $2", [userId, conditionId]);
            let rows = results.rows;
            return rows;
        }catch(err){
            throw {"error source": "/backend/src/repos/userRepo.js, fetchConditionToActionAssociation", "error cause": "fetching condition to action association", "error message": err.message, "error details": err};
        }
    }, 

    async fetchProfileStats(userId){
        let roleData = await db.query("SELECT role FROM users WHERE id = $1", [userId]);
        let role = roleData.rows[0].role;
        let stats;
        if(role == "Patient"){
            let statsData = await db.query("SELECT u.name, u.email, u.role, COUNT(DISTINCT a.id) AS actions_count, COUNT(DISTINCT c.id) AS conditions_count, COUNT(DISTINCT p.id) As permissions_count FROM users u LEFT JOIN actions a ON u.id = a.user_id LEFT JOIN conditions c ON u.id = c.user_id LEFT JOIN permissions p ON u.id = p.patient_id WHERE u.id = $1 GROUP BY u.name, u.email, u.role", [userId]);
            stats = statsData.rows[0];
        }else{
            let statsData = await db.query("SELECT u.name, u.email, u.role, COUNT(DISTINCT p.id) AS total_permissions, COUNT(DISTINCT p.id) FILTER (WHERE current_status = 'Granted') AS granted_permissions, COUNT(DISTINCT p.id) FILTER (WHERE current_status = 'Aborted') AS aborted_permissions FROM users u LEFT JOIN permissions p ON u.id = p.doctor_id WHERE u.id = $1 GROUP BY u.name, u.email, u.role", [userId]);
            stats = statsData.rows[0];
        }
        return stats;
    }, 

    async createPermission(patient_id, doctor_id, scope, current_status, start_date, end_date){
        try{
            let patientData = await db.query("SELECT * FROM users WHERE id = $1", [patient_id]);
            let patient_name = patientData.rows[0].name;
            let doctorData = await db.query("SELECT * FROM users WHERE id = $1", [doctor_id]);
            let doctor_name = doctorData.rows[0].name;
            await db.query("INSERT INTO permissions (patient_name, patient_id, doctor_name, doctor_id, scope, current_status, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [patient_name, patient_id, doctor_name, doctor_id, scope, current_status, start_date, end_date]);
        }catch(err){
            throw { "error source": "/backend/src/repos/userRepo.js, createPermission", "error cause": "creating permission", "error message": err.message, "error details": err };
        }
    }
}

export default userRepo;