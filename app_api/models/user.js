const mongoose = require('mongoose');

const listsSchema = new mongoose.Schema({
    list: String,
    items: [String]
})
const userSchema = new mongoose.Schema({
    user: String,
    password: String,
    lists: [listsSchema]
})
mongoose.model('User', userSchema, 'Users');