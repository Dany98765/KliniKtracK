import db from "../pool.js";

let userRepo = {
    createNewUser(name, email, password, role){
        db.query("INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)", [name, email, password, role]);
    }
}

export default userRepo;