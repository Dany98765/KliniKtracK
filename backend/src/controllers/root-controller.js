import userRepo from "../repos/userRepo.js";
import bcrypt from "bcrypt";

export async function createNewUser(req, res){
    let {name, email, password, role} = req.body;
    userRepo.createNewUser(name, email, await bcrypt.hash(password, 12), role);
    res.sendStatus(200);
}