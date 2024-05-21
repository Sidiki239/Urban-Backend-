const express = require('express');

const { createUser ,
     getAllUser ,loginUser,
    updateUser, deleteaUser} = require("../controllers/UserController")
const router = express.Router()
router.post("/createUser",createUser)
router.post("/loginUser",loginUser)
router.get("/getAllUser",getAllUser)
router.put("/editUser/:id",updateUser)
router.delete("/deleteUser/:id",deleteaUser)


module.exports = router








