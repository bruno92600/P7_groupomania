// import de jsonwebtoken pour la securité d'authentification
const jwt = require("jsonwebtoken");

// import de dotenv
const dotenv = require("dotenv").config();

// exports de la fonction du middleware
module.exports = function (req, res, next) {
  try {
    // recuperer le token dans le headers authorization
    const token = req.headers.authorization.split(" ")[1];

    // décoder le token 
    const decodedToken = jwt.verify(token, process.env.token);

    // recuperer le userid a l'interieur du token
    const userId = decodedToken.userId;

    // comparaison du userId qu'il y a en clair dans le req avec le userId qu'il y a dans le token
    if (req.body.userId && req.body.userId !== userId) {
      throw "User Id non valide !";
      // controle quand ca passe par req.params
    } else {
      req.body.decodedToken = decodedToken;
      next();
    }
  } catch (error) {
    res.status(401).json("Requête non authentifiée !" );
  }
};
