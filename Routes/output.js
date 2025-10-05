import express from "express";
import { NseIndia } from "stock-nse-india";

const outputRouter = express.Router();
const nseIndia = new NseIndia();

// GET stock details by symbol
outputRouter.get("/stocks/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const data = await nseIndia.getEquityDetails(symbol);

    res.json({
      symbol: symbol,
      company: data.info.companyName,
      lastPrice: data.priceInfo.lastPrice,
      dayHigh: data.priceInfo.intraDayHighLow.max,
      dayLow: data.priceInfo.intraDayHighLow.min,
    //   totalTradedVolume: data.securityWiseDP.totalTradedVolume
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default outputRouter;
