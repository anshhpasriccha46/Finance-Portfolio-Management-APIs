import { getUser } from "../service/map.js";
import { calculateProfitOrLoss } from "../calculations/calculate.js";

export async function profitOrLoss(req, res) {
    try {
        const user = getUser(req.cookies?.uid);
        
        if (!user || !user.portfolio) {
            return res.status(404).json({ message: "User or portfolio not found." });
        }

        const profitPromises = user.portfolio.map(async (companyStock) => {
            
            const result = await calculateProfitOrLoss(companyStock);
            
            return { 
                symbol: companyStock.symbol, 
                profit: result 
                
            };
        });

        const calculatedProfits = await Promise.all(profitPromises);

        return res.status(200).json({
            message: "Successfully calculated profit/loss for all stocks.",
            data: calculatedProfits
        });

    } catch (error) {
        console.error("Critical error in profitOrLoss handler:", error);
        return res.status(500).json({ message: "Internal server error during processing." });
    }
}