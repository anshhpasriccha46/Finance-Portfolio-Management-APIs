import express from "express";
import axios from "axios";

import { checkUser } from "../middlewares/auth.js";
import { getLivePrice } from "../controller/getLivePrice.js";
import { profitOrLoss } from "../controller/calculateProfitorLoss.js";
import { getUser } from "../service/map.js";

const outputRouter = express.Router();


// GET stock details by symbol
outputRouter.get("/stocks/:symbol", checkUser, getLivePrice);

outputRouter.get("/calculateProfitOrLoss" , checkUser , profitOrLoss);

outputRouter.get('/predict', checkUser ,async (req, res) => {
  try {
    // 1. This is the JavaScript object you want to send as JSON
    const user = getUser(req.cookies?.uid);
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }
    console.log("User data for prediction:", user);
    console.log("JSON SENT TO PYTHON API:", jsonDataToSend);

    const jsonDataToSend ={
    "Age": user.Age,
    "RiskScore": user.RiskScore,
    "InvestmentHorizon": user.InvestmentHorizon,
    "FinancialGoal": user.FinancialGoal,
    "FinancialCondition": user.FinancialCondition,
    "AnnualIncome": user.AnnualIncome,
    "TotalNetWorth": user.TotalNetWorth,
    "Dependents": user.Dependents,
    "InvestmentKnowledge": user.InvestmentKnowledge
};

    // 2. The external API endpoint you want to send data TO
    const externalApiUrl = 'http://Aritro1905.pythonanywhere.com/recommend';

 
    const response = await axios.post(externalApiUrl, jsonDataToSend);

    // 4. Send back the response from the external API
    // (This is usually a confirmation, e.g., the new object with its new 'id')
    res.status(201).json(response.data);

  } catch (error) {
    // 5. Handle any errors
    console.error('Error posting external data:', error.message);
    res.status(500).json({ message: 'Failed to post data to external source' });
  }
});

export default outputRouter;
