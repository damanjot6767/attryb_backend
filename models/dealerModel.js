const mongoose = require('mongoose');

const dealerSchema = new mongoose.Schema({
    
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
        default:'dealer'
    },
    profileImage:{
        type:String,
    },
},{timestamps:true})

module.exports = mongoose.model("dealers", dealerSchema)