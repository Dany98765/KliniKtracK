import userRepo from "../repos/userRepo.js";

export function createNewUser(req, res){
    let {name, email, password} = req.body;
    userRepo.createNewUser(name, email, password);
    res.sendStatus(200);
}