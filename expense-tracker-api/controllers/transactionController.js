const Transaction = require('../models/transactionModel');

// @desc   Get all transactions
// @route  GET /api/transactions
const getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find()
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: `Server Error`
        })
    }
}

// @desc   Add transaction
// @route  POST /api/transactions
const addTransaction =  async (req, res, next) => {
    try {
        const { description, amount } = req.body;
        const transaction = await Transaction.create({description: description, amount: amount});
        res.status(201).json({
            success: true,
            data: transaction
        })
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(value => value.message)
            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            res.status(500).json({
                success: false,
                error: `Server Error`
            })
        }
    } 
}

// @desc   Delete transaction
// @route  DELETE /api/transactions/:id
const deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: `Transaction Not Found`
            })
        }
        await transaction.remove();
        return res.status(200).json({
            success: true,
            data: {}
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: `Server Error`
        })
    }
}

module.exports = {
    getTransactions,
    addTransaction,
    deleteTransaction
}