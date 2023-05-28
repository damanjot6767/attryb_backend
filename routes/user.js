const express = require('express')
let router = express.Router()
let {userController} = require("../controllers")
let {checkUserAuthorization} = require("../middleware")



router.post("/login", userController.login)
router.post("/register",userController.create)


//----------------------------------------------------User
router.get("/fetchUser", checkUserAuthorization, userController.fetchUser)
router.put("/editUser/:id", checkUserAuthorization, userController.editUser)
router.post("/resetPassword", checkUserAuthorization, userController.resetpassword)
router.post("/buyCar", checkUserAuthorization, userController.buyCar)
router.post("/filterCar", checkUserAuthorization, userController.filterCar)
router.get("/fetchCars", checkUserAuthorization, userController.fetchUser)

module.exports = router