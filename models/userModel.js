const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:['male','female','other']
    },
    role:{
        type:String,
        default:'user'
    },
    profileImage:{
        type:String,
    },
},{timestamps:true})

module.exports = mongoose.model("users", userSchema)