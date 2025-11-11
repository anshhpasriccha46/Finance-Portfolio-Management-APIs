import { getLivePrice , fetchLivePriceData } from "../controller/getLivePrice.js";

export const calculateProfitOrLoss = async function(stock){


// const PB = 200;      // Effective buy price per share (including all buy-side charges)
// const PS = 250;      // Selling price per share (market sell price)
// const N = 100;       // Number of shares
// const T = 14;        // Holding period in months
const PB = stock.price;
const obj =  await fetchLivePriceData(stock.symbol);
const PS = obj.currentPrice;
const N = stock.number;
const purchaseDate = new Date(stock.date);
const currentDate = new Date();
const T = (currentDate.getFullYear() - purchaseDate.getFullYear()) * 12 + (currentDate.getMonth() - purchaseDate.getMonth());
const brokerageRate = 0.0003; // 0.03% brokerage (typical)
const brokerageMax = 20;      // Max brokerage per order (₹)

// === CONSTANT RATES ===
const STT_RATE = 0.001;            // 0.1% on sale (delivery)
const EXCHANGE_CHARGE = 0.0000325; // 0.00325%
const GST_RATE = 0.18;             // 18% on (brokerage + exchange)
const LTCG_EXEMPT = 100000;        // ₹1 lakh exemption (LTCG)
const STCG_RATE = 0.15;            // 15% (short-term)
const LTCG_RATE = 0.10;            // 10% (long-term)
const CESS_RATE = 0.04;            // 4% cess on tax

// === STEP 1: Base values ===
const buyValue = PB * N;
const sellValue = PS * N;

// === STEP 2: Sell-side charges ===
const brokerageSell = Math.min(sellValue * brokerageRate, brokerageMax);
const etcSell = sellValue * EXCHANGE_CHARGE;
const stt = sellValue * STT_RATE;
const gstSell = GST_RATE * (brokerageSell + etcSell);
const totalSellCharges = brokerageSell + etcSell + gstSell + stt;

// === STEP 3: Gross Profit/Loss ===
const grossProfit = (sellValue - totalSellCharges) - buyValue;

// === STEP 4: Capital Gains Tax (applies only on profit) ===
let tax = 0;
if (grossProfit > 0) {
  if (T <= 12) {
    // Short-Term Capital Gain
    tax = STCG_RATE * grossProfit;
  } else {
    // Long-Term Capital Gain
    const taxableGain = Math.max(0, grossProfit - LTCG_EXEMPT);
    tax = LTCG_RATE * taxableGain;
  }
  tax *= (1 + CESS_RATE); // Add 4% cess
} else {
  // Loss case: No tax
  tax = 0;
}

// === STEP 5: Net Profit/Loss ===
const netProfit = grossProfit - tax;

// === STEP 6: OUTPUT ===
console.log("========== STOCK SALE TAX CALCULATOR ==========");
console.log(`Buy Price per Share (₹): ${PB}`);
console.log(`Sell Price per Share (₹): ${PS}`);
console.log(`Shares: ${N}`);
console.log(`Holding Period: ${T} months`);
console.log("-----------------------------------------------");
console.log(`Total Buy Value (₹): ${buyValue.toFixed(2)}`);
console.log(`Total Sell Value (₹): ${sellValue.toFixed(2)}`);
console.log("");
console.log("---- SELL-SIDE CHARGES BREAKDOWN ----");
console.log(`Brokerage (₹): ${brokerageSell.toFixed(2)}`);
console.log(`Exchange Txn Charges (₹): ${etcSell.toFixed(2)}`);
console.log(`GST on (Brokerage+ETC) (₹): ${gstSell.toFixed(2)}`);
console.log(`STT (₹): ${stt.toFixed(2)}`);
console.log(`Total Sell-side Charges (₹): ${totalSellCharges.toFixed(2)}`);
console.log("-----------------------------------------------");
console.log(`Gross Profit/Loss (₹): ${grossProfit.toFixed(2)}`);
console.log(`Capital Gains Tax (₹): ${tax.toFixed(2)}`);
console.log(`Net Profit After Tax (₹): ${netProfit.toFixed(2)}`);
console.log("-----------------------------------------------");

if (grossProfit > 0) {
  console.log("📈 RESULT: PROFIT ✅");
} else if (grossProfit < 0) {
  console.log("📉 RESULT: LOSS ❌ (No tax applied)");
} else {
  console.log("⚖️ RESULT: BREAKEVEN");
}
console.log("===============================================");
return grossProfit;
}
