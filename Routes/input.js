import express from "express";
import { createUserAndStock } from "../models/updateDB.js";

const inputRouter = express.Router();
inputRouter.post("/input" , createUserAndStock);

export default inputRouter;