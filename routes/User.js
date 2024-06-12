const express = require('express');

const { createUser ,
     getAllUser ,loginUser, updateUserInfo,
    updateUser, deleteaUser,updatePassword} = require("../controllers/UserController")
const router = express.Router()
router.post("/createUser",createUser)
router.put("/updatePassword/:id",updatePassword)
router.post("/loginUser",loginUser)
router.post("/editUserInfo",updateUserInfo)
router.get("/getAllUser",getAllUser)
router.put("/editUser/:id",updateUser)
router.delete("/deleteUser/:id",deleteaUser)


module.exports = router








