const mongoose = require("mongoose");

const ReleveSchema = new mongoose.Schema({

  id_releveur: { type: String, required: true },
  nombre_compteur: { type: Number, required: true },
  ref_zone: { type: String, required: true },
  ref_zone_unite: { type: String, required: true },
  date_releveur: { type: Date, required: false },

});



const Releves = mongoose.model('Releves', ReleveSchema);

module.exports = Releves;
