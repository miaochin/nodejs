const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    phone:{
        type: String
    }, 
    email: {
        type: String
    }, 
    job: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)