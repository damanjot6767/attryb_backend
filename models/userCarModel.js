const mongoose = require("mongoose")

const userCarSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"users"
    },
    carId:
    {
        type:mongoose.Types.ObjectId,
        ref:"cars"
    }

},{timestamps:true})


module.exports = mongoose.model('userCars',userCarSchema);