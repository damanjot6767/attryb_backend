const express = require('express')
let router = express.Router()
let {dealerController} = require("../controllers")
let {checkDealerAuthorization} = require("../middleware")


router.post("/login", dealerController.login)
router.post("/register",dealerController.create)
//-----------------------------------------------------Car
router.post("/createCar", checkDealerAuthorization, dealerController.createCar)
router.get("/fetchCars", checkDealerAuthorization, dealerController.fetchCars)
router.put("/editCar/:id", checkDealerAuthorization,dealerController.editCar)
router.delete("/deleteCars", checkDealerAuthorization, dealerController.deleteCars)
router.get("/fetchCar/:id", checkDealerAuthorization, dealerController.fetchCarsById)

//----------------------------------------------------Dealer
router.get("/fetchDealer", checkDealerAuthorization, dealerController.fetchDealer)
router.put("/editDealer", checkDealerAuthorization, dealerController.editDealer)
router.post("/resetPassword", checkDealerAuthorization, dealerController.resetpassword)

module.exports = router