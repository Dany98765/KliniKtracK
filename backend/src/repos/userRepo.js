import db from "../pool.js";

let userRepo = {
    async createNewUser(name, email, password, role){
        try{
            await db.query("INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)", [name, email, password, role]);
        }catch(err){
            throw {"error source": "/backend/src/repos/userRepo.js, createNewUser", "error message": err};
        }
    }
}

export default userRepo;