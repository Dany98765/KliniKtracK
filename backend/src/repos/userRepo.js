import db from "../pool.js";

let userRepo = {
    async createNewUser(name, email, password, role){
        try{
            await db.query("INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)", [name, email, password, role]);
        }catch(err){
            throw {"error source": "/backend/src/repos/userRepo.js, createNewUser", "error cause": "creating new user", "error message": err.message, "error details": err};
        }
    }, 

    async getUserPassword(email){
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
            throw {"error source": "/backend/src/repos/userRepo.js, getUserPassword", "error cause": "getting user password", "error message": err.message, "error details": err};
        }
    }
}

export default userRepo;