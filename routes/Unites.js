const express = require('express');

const { createUnites , getAllUnites ,deleteUnites,updateUnites} = require("../controllers/UnitesControllers")
const router = express.Router()


router.post("/create",createUnites)
router.put("/update/:id",updateUnites)
router.delete("/delete/:id",deleteUnites)
router.get("/getall",getAllUnites)


module.exports = router