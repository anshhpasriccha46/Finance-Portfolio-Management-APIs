import express from "express";
import { addNewUser , loginUser } from "../controller/newUserOrLogin.js";

const inputRouter = express.Router();
inputRouter.post("/newUser" , addNewUser);
inputRouter.post("/login" , loginUser);

export default inputRouter;