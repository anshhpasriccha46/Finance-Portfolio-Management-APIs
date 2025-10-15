import { createUserAndStock } from "../models/updateDB.js";

export const addNewUser = async function(req ,res){
    createUserAndStock(req, res);
}
