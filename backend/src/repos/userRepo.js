import db from "../pool.js";

let userRepo = {
    async createUser(name, email, password, role){
        try{
            await db.query("INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)", [name, email, password, role]);
        }catch(err){
            throw {"error source": "/backend/src/repos/userRepo.js, createUser", "error cause": "creating new user", "error message": err.message, "error details": err};
        }
    }, 

    async fetchUserPassword(email){
        try{
            let results = await db.query("SELECT password FROM users WHERE email = $1", [email]);
            let rows = results.rows;
            if(rows.length > 1){
                return "multiple users have this email";
            }else if(rows.length < 1){
                return "no user has this email";
            }else{
                let password = rows[0].password
                if(!password){
                    return "no password found";
                }else{
                    return password;
                }
            }
        }catch(err){
            throw {"error source": "/backend/src/repos/userRepo.js, fetchUserPassword", "error cause": "getting user password", "error message": err.message, "error details": err};
        }
    }, 

    async isEmailRegistered(email){
        try{
            let results = await db.query("SELECT * FROM users WHERE email = $1", [email]);
            let rows = results.rows;
            if(rows.length == 0){
                return false;
            }else if(rows.length == 1){
                return true;
            }else{
                console.log(JSON.stringify({"error source": "/backend/src/repos/userRepo.js, isEmailRegistered", "error cause": "checking ig email is registered", "error message/details": "multiple accounts have been found registered with this email"}));
            }
        }catch(err){
            throw {"error source": "/backend/src/repos/userRepo.js, isEmailRegistered", "error cause": "checking if email is registered", "error message": err.message, "error details": err};
        }
    }, 

    async fetchUseractions(id){
        try{
            let results = await db.query("SELECT name, description, start_date, end_date, doctor, doctor_id, type FROM actions WHERE user_id = $1", [id]);
            let rows = results.rows;
            return rows;
        }catch(err){
            throw {"error source": "/backend/src/repos/userRepo.js, fetchUserActions", "error cause": "fetching user actions", "error message": err.message, "error details": err};
        }
    }, 

    async createAction(id, name, description, start_date, end_date, type, doctor, doctor_id){
        try{
            await db.query("INSERT INTO actions (user_id, name, description, start_date, end_date, type, doctor, doctor_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [id, name, description, start_date, end_date, type, doctor, doctor_id]);
        }catch(err){
            throw {"error source": "/backend/src/repos/userRepo.js, createAction", "error cause": "creating action", "error message": err.message, "error details": err};
        }
    }, 

    async fetchUserConditions(id){
        try{
            let results = await db.query("SELECT name, description, type, symptoms, start_date, end_date FROM conditions WHERE user_id = $1", [id]);
            let rows = results.rows;
            return rows;
        }catch(err){
            throw {"error source": "/backend/src/repos/userRepo.js, fetchUserConditions", "error cause": "fetching user conditions", "error message": err.message, "error details": err};
        }
    }
}

export default userRepo;