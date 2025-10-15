import express from "express";
import { addNewUser } from "../Controller/addNewUser.js";

const inputRouter = express.Router();
inputRouter.post("/newUser" , addNewUser);

export default inputRouter;