const { userModel, userCarModel, carModel }  = require("../models")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
var md5 = require('md5');
const {sendMail} = require('../middleware/mailer.js');

module.exports ={
    create: async (req, res) =>{
        let {name, email, gender,password} = req.body
        try{
            const emailExists = await userModel.findOne({email: email})
            if(!emailExists){
                const dealer = await userModel.create({
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
            const dealer = await userModel.findOne({email:email, password: md5(password)})
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

    fetchUser : async(req, res)=>{
        try{
            const dealer = await userModel.find({_id:req.userId})
            res.json({status:"success", data: dealer})
        }
        catch(err){
            console.log(err.message)
            res.status(400).json({error: err.message})
        }
    },

    editUser: async(req, res)=>{
        const {id} = req.params
        try{
            const edit = await userModel.findOneAndUpdate({_id:id},
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

    resetpassword : async (req,res) => {
        try{
            const {password, oldpassword} = req.body;
            if(!oldpassword || !password){
                return res.status(400).json({status:"failure", msg:"oldpassword and password are required"});
            }

            const arbor = await userModel.findOne({_id: req.user._id, password:md5(oldpassword)})
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
    
    buyCar:async (req, res) =>{
        let {carId} = req.body;
        try{
            const emailExists = await userCarModel.findOne({carId,userId:req.userId})
            if(!emailExists){
                const create = await userCarModel.create({
                    carId,
                    userId:req.userId,
                })
                res.json({status:"success", data: create})
            }else{
                res.status(400).json({status:"failure", msg:"You already buy this car!"})
            }           
        }
        catch(err){
            console.log(err.message)
            res.status(400).json({error: err.message})
        }
    },
    filterCar: async (req, res) => {
        const { price, color } = req.body;

        const filter = {};
      
        if (price && color) {
          // Filter by both price and color
          filter['models.price'] = { $lte: parseInt(price) };
          filter['models.color'] = color;
        } else if (price) {
          // Filter by price only
          filter['models.price'] = { $lte: parseInt(price) };
        } else if (color) {
          // Filter by color only
          filter['models.color'] = color;
        }
      
        try {
          const carManufacturers = await carModel.find(filter);
      
          res.json(carManufacturers);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
      fetchCars :async(req, res)=>{
        try{
            const car = await carModel.find();
            res.json({status:"success", data: car});
        }
        catch(err){
            console.log(err.message)
            res.status(400).json({error: err.message})
        }
    },
}