const Releve = require("../models/Releves");
const asyncHandler = require('express-async-handler');

const createReleve = asyncHandler(async (req, res) => {
    try {
      const { id_releveur, nombre_compteur, ref_zone, ref_zone_unite } = req.body;
  
      // Vérifier que tous les champs requis sont présents
      if (!id_releveur || !nombre_compteur || !ref_zone || !ref_zone_unite) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
      }
  
      const todayDate = new Date();
      const newReleve = await Releve.create({
        id_releveur:id_releveur,
        nombre_compteur:nombre_compteur,
        ref_zone:ref_zone,
        ref_zone_unite:ref_zone_unite,
        date_releveur: todayDate,
      });
  
      res.status(201).json(newReleve);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  const getAllReleve = asyncHandler(async (req, res) => {
    try {
        const getReleve = await Releve.find().sort({ date_releveur: -1 });
        res.json(getReleve);
    } catch (error) {
        throw new Error(error);
    }
});



const deleteReleve = asyncHandler(async (req, res) => {
    const { id } = req.params;
   // validateMongoDbId(id);   
    try {
        const deleteUnites = await Releve.findByIdAndDelete(id);
        res.json({deleteUnites});
     } catch (error) {
         throw new Error(error)
     }
});
const updateReleve = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const findUnites = await Releve.findById(id);
        if (!findUnites) {
            throw new Error('Releve non trouvée');
        }

        const editedUnites = await Releve.findByIdAndUpdate(id, req.body, { new: true });

        res.json(editedUnites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur est survenue lors de la mise à jour de l'unites" });
    }
});



module.exports = { createReleve , getAllReleve, deleteReleve,updateReleve }