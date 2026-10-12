import userRepo from "../repos/userRepo.js";
import bcrypt from "bcrypt";
import findMissingFields from "../utils/find-missing-fields.js";

export async function createNewUser(req, res){
    let {name, email, password, role} = req.body;
    if(!(name && email && password && role)){
        let missingArray = findMissingFields([[name, "name"], [email, "email"], [password, "password"], [role, "role"]]);
        return res.status(400).send("Missing fields are required for signup: " + JSON.stringify(missingArray));
    }else{
        let hashedPassword = await bcrypt.hash(password, 12);
        await userRepo.createNewUser(name, email, hashedPassword, role);
        return res.sendStatus(201);
    }
}
    }
}