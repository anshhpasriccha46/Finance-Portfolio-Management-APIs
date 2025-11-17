import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
     portfolio: [{
       
        companyName: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },

    number:{
        type: Number, required: true
    },

    date: { 
        type: Date, required: true 
    },

    price: { 
        type: Number, required: true }
    }],
    Age: {
        type: Number
    },
    RiskScore: {
        type: Number
        
    },
    InvestmentHorizon: {
        type: Number
    },
    FinancialGoal: {
        type: Number
    },
    FinancialCondition: {
        type: Number
    },
    AnnualIncome: {
        type: Number
    },
    TotalNetWorth: {
        type: Number
    },
    Dependents: {
        type: Number
    },
    InvestmentKnowledge: {
        type: Number
    }
});

const user = mongoose.model('user', userSchema);

export default user;