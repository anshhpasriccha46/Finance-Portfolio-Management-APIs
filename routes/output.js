import express from "express";

import { checkUser } from "../middlewares/auth.js";
import { getLivePrice } from "../controller/getLivePrice.js";
import { profitOrLoss } from "../controller/calculateProfitorLoss.js";

const outputRouter = express.Router();


// GET stock details by symbol
outputRouter.get("/stocks/:symbol", checkUser, getLivePrice);

outputRouter.get("/calculateProfitOrLoss" , checkUser , profitOrLoss);

export default outputRouter;
