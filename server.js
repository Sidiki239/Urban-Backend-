 const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
// const cookie_parser = require("cookie-parser");
const zoneRouter = require("./routes/Zones")
const userRouter = require("./routes/User")
const uniteRouter = require("./routes/Unites")
const releveRouter = require("./routes/Releve")
const jwt = require("jsonwebtoken");
const JWT_SECRET = "jkdewuiue9832iujrop2knlkfoijforf[]]d3u3838ui3ui3";
const bcrypt = require("bcryptjs") 
//mongodb+srv://projeturban:RSHwTH6kIw82NvNa@urbancluster.b7vw0hc.mongodb.net/BPROJET
//const connection_url="mongodb+srv://Sidiki:HEylwqwmKEFI80Qm@cluster123.qfpfory.mongodb.net/BPROJET"

const connection_url="mongodb+srv://projeturban:RSHwTH6kIw82NvNa@urbancluster.b7vw0hc.mongodb.net/BPROJET"
app.get('/', (req, res) => {
  res.send("Hello, World!,Le serveur est en cours d'exécution sur le port 3002.");
});
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization , Cache-Control, Cookie , Postman-Token , Content-Type');
  next();
});
app.use(express.json());
app.use(cors({
  origin: '*' 
}));
   mongoose.connect(connection_url)
  .then(() => {
    console.log("Connecté à MongoDB...");
    app.listen(3002, () => {
      console.log("Le serveur est en cours d'exécution sur le port 3002...");
    });
  }).catch((error) => {
    console.error("Erreur de connexion à MongoDB :", error);
  });
  app.use("/api/zone", zoneRouter);
  app.use("/api/user", userRouter);
  app.use("/api/unite", uniteRouter);
  app.use("/api/releve", releveRouter);

 


