const mongoose = require("mongoose");

const ZonesSchema = new mongoose.Schema({

  zone: { type: String, required: true },
  reference: { type: String, required: false },

});



const Zones = mongoose.model('Zones', ZonesSchema);

module.exports = Zones;
