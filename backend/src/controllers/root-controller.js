import userRepo from "../repos/userRepo.js";
import bcrypt from "bcrypt";

export async function createNewUser(req, res){
    let {name, email, password, role} = req.body;
    if(!(name && email && password && role)){
        let missingArray = [];
        let fields = [[name, "name"], [email, "email"], [password, "password"], [role, "role"]];
        for(let i = 0; i < fields.length; i++){
            if(!fields[i][0]){
                missingArray.push(fields[i][1]);
            }
        }
        return res.status(400).send("Missing fields are required for signup: " + JSON.stringify(missingArray));
    }else{
        await userRepo.createNewUser(name, email, await bcrypt.hash(password, 12), role);
        res.sendStatus(201);
    }
}