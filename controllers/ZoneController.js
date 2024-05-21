const Zone = require("../models/Zones");
const asyncHandler = require('express-async-handler');

const createZone = asyncHandler(async (req, res) => {
    const zone = req.body.zone;
   const reference = req.body.reference;
  
        const newZone = await Zone.create({
            zone: zone,
            reference: reference
        });
    
        res.json(newZone);

}); 

const getAllZones = asyncHandler(async (req, res) => {
    try {
       const getZone = await Zone.find();
       res.json(getZone);
    } catch (error) {
        throw new Error(error)
    }
});



const deleteZone = asyncHandler(async (req, res) => {
    const { id } = req.params;
   // validateMongoDbId(id);
    try {
        const deleteAZone = await Zone.findByIdAndDelete(id);
        res.json({deleteAZone});
     } catch (error) {
         throw new Error(error)
     }
});
const updateZone = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const findZone = await Zone.findById(id);
        if (!findZone) {
            throw new Error('Zone non trouvée');
        }

        const editedZone = await Zone.findByIdAndUpdate(id, req.body, { new: true });

        res.json(editedZone);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de la zone' });
    }
});



module.exports = {
    createZone , getAllZones, deleteZone,updateZone
}