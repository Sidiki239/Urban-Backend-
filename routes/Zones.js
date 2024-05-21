const express = require('express');

const { createZone , getAllZones ,deleteZone,updateZone} = require("../controllers/ZoneController")
const router = express.Router()


router.post("/createZone",createZone)
router.get("/allzone",getAllZones)
router.delete("/delete/:id",deleteZone)
router.put("/update/:id",updateZone)

module.exports = router