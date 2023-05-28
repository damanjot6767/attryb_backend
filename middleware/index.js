
let express = require("express");
let router = express.Router();
let { dealerModel,userModel } = require("../models");
let jwt = require("jsonwebtoken");


const checkDealerAuthorization = async (req, res, next) => {
  const header = req.headers.authorization
  try {
    if (header) {
      const type = header.split(" ");
      if (type[0] === "Bearer") {
        const usr = jwt.decode(type[1]);
        let user = await dealerModel.findOne({ _id: usr._id })
        console.log("user: " + user)
        if (user) {
          req.dealerId = user._id;
          next();
        }else{
          res.status(404).json({status: "failure", error: "invalid credentials" })
        }
      }
      else{
         res.status(400).json({status: "failure", error: "user id not valid" })
       }
    } else {
      res.status(400).json({ status: "failure", error: "please provide token" });
    }
   
  } catch (error) {

    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

const checkUserAuthorization = async (req, res, next) => {
  const header = req.headers.authorization
  try {
    if (header) {
      const type = header.split(" ");
      if (type[0] === "Bearer") {
        const usr = jwt.decode(type[1]);
        let user = await userModel.findOne({ _id: usr._id })
        console.log("user: " + user)
        if (user) {
          req.userId = user._id;
          next();
        }else{
          res.status(404).json({status: "failure", error: "invalid credentials" })
        }
      }
      else{
         res.status(400).json({status: "failure", error: "user id not valid" })
       }
    } else {
      res.status(400).json({ status: "failure", error: "please provide token" });
    }
   
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};


module.exports = router;
module.exports = { checkDealerAuthorization, checkUserAuthorization };
