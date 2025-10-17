import { NseIndia } from "stock-nse-india";

const nseIndia = new NseIndia();

// 1. PURE DATA FETCHER (Utility Function)
// It only focuses on fetching data and throws on failure.
export async function fetchLivePriceData(symbol) {
    if (!symbol) {
        throw new Error("Symbol is missing.");
    }
    
    // Fetch the raw data from the external package
    const details = await nseIndia.getEquityDetails(symbol.toUpperCase());

    // Transform and return the clean data object
    return { 
        symbol: details.info.symbol,
        companyName: details.info.companyName,
        currentPrice: details.priceInfo.lastPrice,
        dayHigh: details.priceInfo.dayHigh
    };
}


// 2. EXPRESS HANDLER (The API Endpoint)
// It focuses on HTTP requests, responses, and error codes.
export async function getLivePrice(req, res) {
    // Robust input check (params are typically used for required resource IDs)
    const symbol = req.params.symbol || req.query.symbol; 
    
    if (!symbol) {
        return res.status(400).json({ error: "Stock symbol is required." });
    }

    try {
        // CALL the dedicated data fetcher function
        const liveData = await fetchLivePriceData(symbol);
        
        // Success: Send the fetched data
        return res.status(200).json(liveData); 

    } catch (error) {
        console.error(`Error fetching details for ${symbol}:`, error.message);
        
        // General API or Network Error
        return res.status(500).json({ 
            error: "Failed to fetch stock data from NSE.", 
            details: error.message 
        });
    }
}

// --- Example of how to call the new utility function directly ---
// async function runTest() {
    const data = await fetchLivePriceData("RELIANCE");
    console.log(data);
// }
// runTest();