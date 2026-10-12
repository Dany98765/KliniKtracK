import userRepo from "../repos/userRepo.js";

export async function createNewUser(req, res){
    let {name, email, password, role} = req.body;
    userRepo.createNewUser(name, email, password, role);
    res.sendStatus(200);
}