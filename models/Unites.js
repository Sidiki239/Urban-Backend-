const mongoose = require("mongoose");

const UnitesSchema = new mongoose.Schema({

  zone: { type: String, required: true ,},
  reference: { type: String, required: true },
  type: {  type: String,
    enum: ["rural", "urbain"],
    required: true},
  nombre_compteur: { type: Number, required: true },

});



const Unites = mongoose.model('Unites', UnitesSchema);

module.exports = Unites;
