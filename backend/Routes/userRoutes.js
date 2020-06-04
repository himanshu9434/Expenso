const express = require("express")
const userController = require("./../controller/user-controller")
const router = express.Router()

router.post('/signup/',userController.signup)
router.post('/login/',userController.login)
router.patch("/update/:uid",userController.updateUser)
router.get("/userdata/:uid",userController.userData)

module.exports = router;