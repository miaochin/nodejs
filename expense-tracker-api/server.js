const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const transactionRoutes = require('./routes/transactionRoutes');

dotenv.config({path: './.env'});

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost/transactions', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1)
    }
}

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/transactions', transactionRoutes)

app.listen(PORT, (err) => {
    if (err) console.log(err)
    else console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})