const Unites = require("../models/Unites");
const asyncHandler = require('express-async-handler');

const createUnites = asyncHandler(async (req, res) => {
    const zone = req.body.zone;
   const reference1 = req.body.reference;
   const type = req.body.type;
   const nombre = req.body.nombre_compteur;
   const unitesData = req.body


   const newUnites = await Unites.create(unitesData);

    res.json(newUnites);
  
    /*     const newUnites = await Unites.create({
            zone: zone,
            reference: reference1,
            type:type,
            nombre_compteur:nombre,
        }); */
    
       // res.json(newUnites);

}); 

const getAllUnites = asyncHandler(async (req, res) => {
    try {
       const getUnites = await Unites.find();
       res.json(getUnites);
    } catch (error) {
        throw new Error(error)
    }
});



const deleteUnites = asyncHandler(async (req, res) => {
    const { id } = req.params;
   // validateMongoDbId(id);   
    try {
        const deleteUnites = await Unites.findByIdAndDelete(id);
        res.json({deleteUnites});
     } catch (error) {
         throw new Error(error)
     }
});
const updateUnites = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const findUnites = await Unites.findById(id);
        if (!findUnites) {
            throw new Error('Unites non trouvée');
        }

        const editedUnites = await Unites.findByIdAndUpdate(id, req.body, { new: true });

        res.json(editedUnites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur est survenue lors de la mise à jour de l'unites" });
    }
});



module.exports = { createUnites , getAllUnites, deleteUnites,updateUnites }