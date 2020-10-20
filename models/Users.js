const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 50,
        minlength: 6
    },
    username:{
        type: String,
        required: true,
        maxlength: 50,
        minlength: 6
    },
    email:{
        type: String,
        required: true,
        maxlength: 50,
        minlength: 6
    },
    password:{
        type: String,
        required: true,
        maxlength: 1020,
        minlength: 6
    },
    date_created:{
        type: Date,
        default: Date.now
    }

})

const User = mongoose.model('User', UserSchema)

module.exports = User;