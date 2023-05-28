const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    dealerId:{
        type:mongoose.Types.ObjectId,
        ref:"dealers"
    },
    carImage:{
        type:String,
        default:""
    },
    kms :{
        type:String,
        required:true
    },
    majorScratches:{
        type:String,
        default:"No"
    },
    color:{
        type:String,
        required:true
    },
    accidentsReported:{
        type:Number,
        default:0
    },
    previousBuyers:{
        type:String,
        enum:['First Owner','Second Owner','Third Owner'],
        required:true
    },
    registrationPlace:{
        type:String,
        default:""
    },
    oemId:{
        type:Object,
        default:{}
    },
    price:{
        type:Number,
        required:true
    },
},{timestamps:true})

module.exports = mongoose.model("cars", carSchema)