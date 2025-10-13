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
    }]
});

const user = mongoose.model('user', userSchema);

export default user;