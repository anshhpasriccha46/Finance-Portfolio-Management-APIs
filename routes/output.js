import express from "express";
import axios from "axios";

import { checkUser } from "../middlewares/auth.js";
import { getLivePrice } from "../controller/getLivePrice.js";
import { profitOrLoss } from "../controller/calculateProfitorLoss.js";

const outputRouter = express.Router();


// GET stock details by symbol
outputRouter.get("/stocks/:symbol", checkUser, getLivePrice);

outputRouter.get("/calculateProfitOrLoss" , checkUser , profitOrLoss);

outputRouter.get('/predict', async (req, res) => {
  try {
    // 1. This is the JavaScript object you want to send as JSON
    const jsonDataToSend ={
    "Age": 45,
    "RiskScore": 8,
    "InvestmentHorizon": 25,
    "FinancialGoal": 1,
    "FinancialCondition": 2,
    "AnnualIncome": 120000,
    "TotalNetWorth": 2500000,
    "Dependents": 1,
    "InvestmentKnowledge": 2
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
