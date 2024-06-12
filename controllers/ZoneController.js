const Zone = require("../models/Zones");
const asyncHandler = require('express-async-handler');

const createZone = asyncHandler(async (req, res) => {
    try {
      const { zone } = req.body;
  
      const existingZone = await Zone.findOne({ zone });
      if (existingZone) {
        // Si la zone existe déjà, renvoyer un message d'erreur
        return res.status(400).json({ error: "La zone existe déjà." });
      }
  
      const newZone = await Zone.create({ zone });
      res.json(newZone);
    } catch (error) {
      console.error("Erreur lors de la création de la zone :", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

  const getAllZones = asyncHandler(async (req, res) => {
    try {
      const getZone = await Zone.find().sort({ zone: 1 }); // Utilisez le champ approprié pour le tri
      res.json(getZone);
    } catch (error) {
      throw new Error(error);
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