import db from "../pool.js";

let userRepo = {
    async createNewUser(name, email, password, role){
        await db.query("INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)", [name, email, password, role]);
    }
}

export default userRepo;