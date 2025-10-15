import { createUserAndStock , handleLogin } from "../models/updateDB.js";

export  async function addNewUser (req, res) {
   createUserAndStock(req, res);
}
export  async function loginUser (req, res) {
   handleLogin(req, res);
}