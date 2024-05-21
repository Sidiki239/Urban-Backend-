const mongoose = require("mongoose");

 const UserSchema = new mongoose.Schema({
 username: { type: String, required: true },
   nom: { type: String, required: true },  prenom: { type: String, required: true },
  password: { type: String, required: true },
  userType: {
   type: String,
   enum: ["admin", "releveur", "visiteur"],
   required: true
 },
  date_ajout: {type: Date,required:false}
 });
const User = mongoose.model('User', UserSchema);
 module.exports = User;


