const express = require('express');

const { createReleve , getAllReleve ,deleteReleve,updateReleve} = require("../controllers/ReleveController")
const router = express.Router()


router.post("/create",createReleve)
router.put("/update/:id",updateReleve)
router.delete("/delete/:id",deleteReleve)
router.get("/getall",getAllReleve)


module.exports = router