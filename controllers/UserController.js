const User = require("../models/Users");
const asyncHandler = require('express-async-handler');
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshtoken");
const bcrypt = require("bcrypt");


const createUser = asyncHandler(async (req, res) => {
    try {
        const { username, nom, prenom, password, userType  } = req.body;
        // Vérifier si le Pseudo existe déjà dans la base de données
        const existingUser = await User.findOne({ username:  username  });
        if (existingUser) {
          // Si le Pseudo existe déjà, renvoyer un message d'erreur
          return res.status(400).json({ error: "Le Pseudo existe déjà." });
        }
    
        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
        const todayDate1 = new Date();
        const day = todayDate1.getDate();
        const month = todayDate1.getMonth() + 1; // Les mois sont indexés à partir de 0, donc on ajoute 1
        const year = todayDate1.getFullYear();
        const todayDate = day + '/' + month + '/' + year;
        // Créer l'utilisateur dans la base de données
        await User.create({
          username,nom,prenom,
          password: hashedPassword,
          userType:userType,
          date_ajout:todayDate1
       });
    
        res.status(200).json("SUCCESS");
      } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        res.status(500).json({ error: "Erreur serveur" });
      }
    });







    const updateUser = asyncHandler(async (req, res) => {
        const id2 = req.params.id;
        const { username, nom, prenom, userType } = req.body;
      
        try {
          const updateUser = await User.findById(id2)
      
          if (!updateUser) {
            return res.status(404).json({ error: "User not found" });
          }
      
          await User.findByIdAndUpdate(id2, {
            username: username,
            nom: nom,
            prenom: prenom,
            userType: userType
          }, {
            new: true
          });
      
          res.status(200).json({ status: "SUCCESS" });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal server error" });
        }
      });
      
//  UPDATE A USER

/* 
router.put('/changePassword/:id', async (req, res) => {
    const id2 = req.params.id;
    const { OldPassword, NewPassword } = req.body;
    try {
      const list_user = await d_user.findOne({ where: { Id_users: id2 } });
      if (!list_user) {
        return res.status(404).json({ status: "User not found" });
      }
  
      const match = await bcrypt.compare(OldPassword, list_user.Password);
  
      if (!match) {
        return res.status(400).json({ status: "WrongPassword" });
      }
  
      const hash = await bcrypt.hash(NewPassword, 10);
      await d_user.update({ Password: hash }, { where: { Id_users: id2 } });
  
      res.json({ status: "SUCCESS" });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mot de passe :", error);
      res.status(500).json({ status: "Erreur serveur" });
    }
  });
  
 */



  const deleteaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    //validateMongoDbId(id);
    try {
        const deleteaUser = await User.findByIdAndDelete(id);
        res.json({deleteaUser});
     } catch (error) {
         throw new Error(error)
     }
});








    const loginUser = asyncHandler(async(req,res) => {
        const { username, password } =  req.body;
        //CHECK IF USER EXSISTS OR NOT
        const findUser = await User.findOne({ username });

        if(findUser && (  await bcrypt.compare(password.toString(), findUser.password)) ){
            const refreshToken = await generateRefreshToken(findUser?._id,);
            const updateduser = await User.findByIdAndUpdate(findUser?._id, 
                {
                    refreshToken: refreshToken
                },
                {
                    new: true
                });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge:72*60*60*1000,
            });
            res.json({
                _id: findUser?._id,
                prenom: findUser?.prenom,
                lastname : findUser?.nom ,
                username: findUser?.username,
                userType:findUser?.userType,
                token: generateToken(findUser?._id)
            });
        }
        else{
            throw new Error("Invalid Credentials");
        }
        });
        

const getAllUser = asyncHandler(async (req, res) => {
    try {
       const getUser = await User.find();
       res.json(getUser);
    } catch (error) {
        throw new Error(error)
    }
});


module.exports = {
    createUser , loginUser, getAllUser,updateUser,deleteaUser
}





