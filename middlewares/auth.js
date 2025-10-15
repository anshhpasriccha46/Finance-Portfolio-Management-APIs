import {getUser} from '../service/map.js';

export async function checkUser(req, res, next) {
  const userUid = req.cookies?.uid;

    if(userUid){
        console.log("User is GOOD!!!");
    }
    if(!userUid){
        console.log("User is BAD!!!");
        return res.status(401).json({ message: "Unauthorized: No user session found" });
    }
    const user = getUser(userUid);
    req.user = user; // Attach user to request object
    next();
    
}