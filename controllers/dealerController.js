const { carModel, dealerModel } = require("../models")
const jwt = require("jsonwebtoken")
const md5 = require("md5");
const {sendMail} = require('../middleware/mailer.js')

module.exports = {

    create: async (req, res) =>{
        let {name, email, gender,password} = req.body
        try{
            const emailExists = await dealerModel.findOne({email: email})
            if(!emailExists){
                const dealer = await dealerModel.create({
                    name,
                    email,
                    gender,
                    password:md5(password)
                })
                res.json({status:"success", data: dealer})
            }else{
                res.status(400).json({status:"failure", msg:"Email already exists"})
            }           
        }
        catch(err){
            console.log(err.message)
            res.status(400).json({error: err.message})
        }
    },

    login : async (req, res)=>{
        try{
            const {email, password} = req.body
            const dealer = await dealerModel.findOne({email:email, password: md5(password)})
            if(!dealer){
                res.status(404).json({status:"failure", msg:"email or password is incorrect"})   
            }else{
                const { email, _id } = dealer
                const jwtToken = jwt.sign({ email, _id }, "key");
                res.json({ status: "success", data: { token:jwtToken, email, _id, name:dealer.name } });
            }            
        }
        catch(err){
            console.log(err.message)
            res.status(400).json({error: err.message})
        }
    },

    fetchDealer : async(req, res)=>{
        try{
            const dealer = await dealerModel.find({_id:req.dealerId})
            res.json({status:"success", data: dealer})
        }
        catch(err){
            console.log(err.message)
            res.status(400).json({error: err.message})
        }
    },

    editDealer: async(req, res)=>{
        try{
            const edit = await dealerModel.findOneAndUpdate({_id:req.dealerId},
                {
                    email: req.body.email,
                    name:req.body.name,
                    gender:req.body.gender,
                    profileImage:req.body.profileImage
              },{new:true})
            if(edit){
                res.json({status:"success", data: edit})
            }else{
                res.status(404).json({status:"failure", msg: "Invalid data"})
            }
        }
        catch(err){
            console.log(err.message)
            res.status(400).json({error: err.message})
        }
    },

    createCar: async (req, res) =>{
        let {carImage,kms,majorScratches,color,accidentsReported,previousBuyers,registrationPlace,oemDetails,price} = req.body
        try{
                const car = await carModel.create({carImage,kms,majorScratches,color,accidentsReported,previousBuyers,registrationPlace,oemDetails,dealerId:req.dealerId,price})
                res.json({status:"success", data: car})
        }
        catch(err){
            console.log(err.message)
            res.status(400).json({error: err.message})
        }
    },

    fetchCars :async(req, res)=>{
        try{
            const car = await carModel.find({dealerId:req.dealerId});
            res.json({status:"success", data: car});
        }
        catch(err){
            console.log(err.message)
            res.status(400).json({error: err.message})
        }
    },
    fetchCarsById :async(req, res)=>{
        try{
            const{id}=req.params;
            const car = await carModel.findOne({_id:id});
            res.json({status:"success", data: car});
        }
        catch(err){
            console.log(err.message)
            res.status(400).json({error: err.message})
        }
    },
    
    editCar:async(req, res)=>{
        const {id} = req.params
        let {carImage,kms,majorScratches,color,accidentsReported,previousBuyers,registrationPlace,oemDetails,price} = req.body
        try{
            const edit = await carModel.findOneAndUpdate({_id:id},{   carImage,kms,majorScratches,color,accidentsReported,previousBuyers,registrationPlace,price},{new:true})
            if(edit){
                res.json({status:"success", data: edit})
            }else{
                res.status(404).json({status:"failure", msg: "Invalid data"})
            }
        }
        catch(err){
            console.log(err.message)
            res.status(400).json({error: err.message})
        }
    },
    deleteCars: async(req, res)=>{
        const {carId} = req.body
        try{
                await carModel.deleteMany({_id:{$in:carId}})
                res.json({status:"success", msg: "cars deleted successfully"})
        }
        catch(err){
            console.log(err.message)
            res.status(400).json({error: err.message})
        }
    },
    resetpassword : async (req,res) => {
        try{
            const {password, oldpassword} = req.body;
            if(!oldpassword || !password){
                return res.status(400).json({status:"failure", msg:"oldpassword and password are required"});
            }

            const arbor = await dealerModel.findOne({_id: req.dealerId, password:md5(oldpassword)})
            if(!arbor){
                return res.status(400).json({status:"failure", msg:"oldpassword is incorrect!"})
            } else {
                arbor.password = md5(password);
                arbor.save();
                sendMail(arbor.email, 'Account Password Reset', "<h3>Hello "+arbor.firstName+"</h3><br />Your Arborhawk account password has been reset recently");
                return res.status(200).json({status:"success", msg:"password reset successfully!"})
            }

        } catch(e) {
            console.log(e.message)
            res.status(400).json({status :"failure", error: e.message})
        }
    },
}