import db from "../pool.js";

let userRepo = {
    createNewUser(name, email, password){
        db.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, password]);
    }
}

export default userRepo;