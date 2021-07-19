const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.Promise = global.Promise;

db = mongoose.connect('mongodb://localhost/usercli', { useNewUrlParser: true, useUnifiedTopology: true });

// Add User
const addUser =  async (user) => {
    try {
        await User.create(user);
        console.info('New User Added');
        process.exit()
    } catch (err) {
        console.error(err)
        process.exit()
    }
}

// Find User
const findUser = async (name) => {
    try {
        const search = new RegExp(name, 'i');
        const user = await User.find({$or: [{firstname: search}, {lastname: search}]});
        console.info(user);
        console.info(`${user.length} matches`);
        process.exit();
    } catch(err) {
        console.error(err)
        process.exit()
    }
}

// Update User
const updateUser = async (_id, user) => {
    try {
        await User.updateOne({ _id }, user)
        console.info('User Updated')
        process.exit()
    } catch(err) {
        console.error(err)
        process.exit()
    }
}

// Remove User
const removeUser = async (_id) => {
    try {
        await User.deleteMany({ _id })
        console.info('User Removed')
        process.exit()
    }
    catch(err) {
        console.error(err)
        process.exit()
    }
}

// List Users
const listUsers = async () => {
    try {
        const users = await User.find();
        console.info(users)
        console.info(`${users.length} users`)
        process.exit()
    } catch(err) {
        console.error(err)
        process.exit()
    }
}

module.exports = {
    addUser,
    findUser,
    updateUser, 
    removeUser,
    listUsers
}