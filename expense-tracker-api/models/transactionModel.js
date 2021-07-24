const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: [true, 'Please add some description']
    },
    amount: {
        type: Number,
        required: [true, 'Please add a positive or negative number']
    }, 
    Date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Transaction', transactionSchema)