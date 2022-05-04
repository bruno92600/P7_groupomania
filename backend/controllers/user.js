// import de bcrypt
const bcrypt = require("bcrypt");

// import de jsonwebtoken
const jwt = require("jsonwebtoken");``

// import de la bdd pour s'y connecter
const db = require("../config_db");

// import de fs 
const fs = require('fs'); 

// import de password validator
const passwordValidator = require("password-validator");

// import de emailvalidator
const emailValidator = require("email-validator");

//Création du schéma de mot de passe
const passwordSchema = new passwordValidator();
// schema que doit respectet le mot de passse
passwordSchema
  .is()
  .min(8) // 8 "caractères" min
  .is()
  .max(25) // 25 "caractères" max
  .has()
  .uppercase(1) // 1 demande au moins une majuscule
  .has()
  .lowercase() // demande au moins une mininuscule
  .has()
  .digits(1) // demande au moins 1 chiffre
  .has()
  .not()
  .spaces() // demande a ne pas avoir d'espace
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // pas de mdp comme ça

// signup pour enregistrer les nouveau users
exports.signup = function (req, res, next) {
  
  //Validation des mail et mdp grace a email validator et passwordvalidator
  if (!emailValidator.validate((req.body.email))) {
    return res.status(400).json({
        message: "assurez-vous d'avoir entré une adresse email valide"
    })
} else if (!passwordSchema.validate((req.body.password))) {
    return res.status(400).json({
        message: "votre mot de passe doit contenir au moins 5 caractères"
    })
} else {

  // hacher le mdp avant de l'envoyer dans la base de donnees
  bcrypt
    .hash(req.body.password, 15) // salt = 15 combien de fois sera éxécuté l'algorythme(plus élevé est le chiffre, plus fort sera la protection)
    .then(function (hash) {
      const user = {
        firstName:
          req.body.firstName.charAt(0).toUpperCase() +
          req.body.firstName.slice(1),
        lastName:
          req.body.lastName.charAt(0).toUpperCase() +
          req.body.lastName.slice(1),
        email: req.body.email,
        password: hash,
        bio: req.body.bio,
        imageUrl: "http://localhost:4200/images/imageProfilDéfaut.png",
      };
      // creation de l'utilisateur 
      db.query(`INSERT INTO user SET ?`, [user], function (error) {
        if (error) {
          res.status(400).json({ error });
        } else {
          // création ok!
          res.status(201).json({ message: "Utilisateur créé." });
        }
      });
    })
    // erreur lors de la création
    .catch(function (error) {
      res.status(500).json({ error });
    });

}
};

// login pour se connecter
exports.login = function (req, res, next) {
  // va chercher les infos dans la bdd
  db.query(
    `SELECT id,password, firstName, lastName, isAdmin, imageUrl
    FROM user WHERE email = ?`,
    [req.body.email],
    function (error, result) {
      if (error) {
        throw error;
      } else {
        if (result.length === 0) {
          // erreur si l'utilisateur n'est pazs dans la bdd
          res.status(400).json({ message: "Utilisateur non trouvé." });
        } else {
          bcrypt
            .compare(req.body.password, result[0].password)
            .then(function (valid) {
              if (!valid) {
                return res
                  .status(401)
                  .json({ message: "Mot de passe incorrect" });
              } else {
                // si le mdp est bon
                return res.status(200).json({
                  userId: result[0].id,
                  isAdmin: result[0].isAdmin,
                  firstName: result[0].firstName,
                  lastName: result[0].lastName,
                  message: "Utilisateur connecté !",
                  imageUrl: result[0].imageUrl,

                  token: jwt.sign(
                    {
                      userId: result[0].id,
                    },
                    process.env.token,
                    { expiresIn: "12h" }
                  ),
                });
              }
            });
        }
      }
    }
  );
};


// recuperer le profil d'un utilisateur
exports.getUser = function (req, res, next) {
  const userId = req.body.decodedToken.userId;
  // va chercher dans la bdd ce qui correspond a l'utilisateur
  db.query(
    `SELECT firstName, lastName, bio, imageUrl
    FROM user 
    WHERE id = ?`,
    [userId],
    function (error, result) {
      if (error) {
        throw error;
      } else {
        return res.status(200).json(result[0]);
      }
    }
  );
};

// recuperer le profil de tout les utilisateurs
exports.getAllUser = function (req, res, next) {
  // va chercher dans la bdd tout les utilisateurs existant
  db.query(
    `SELECT user.id, user.firstName, user.lastName, user.imageUrl from user`,
    function (error, result) {
      if (error) {
        throw error;
      } else {
        return res.status(200).json(result);
      }
    }
  );
};

// modifier un profil
exports.userUpdate = function (req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.token);
  const userId = decodedToken.userId;


  let user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    bio: req.body.bio,
  };

  if (req.file) {
    user.imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }

  // va chercher dans la bdd ce qu'il y a a modifié
  db.query(
    `UPDATE user 
     SET ?
     WHERE id = ?`,
    [user, userId],
    function (error) {
      if (error) {
        res.status(400).json({ error });
      } else {
        res
          .status(201)
          .json({ message: "Votre profil a bien été mis à jour !" });
      }
    }
  );
};

// suppresion d'un utilisateur
exports.userDelete = function (req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.token);
  const userId = decodedToken.userId;

  // va chercher dans la bdd l'utilisateur a supprimer
  db.query(
    `DELETE 
    FROM user
    WHERE id = ?`,
    [userId],
    function (error) {
      if (error) {
        res.status(400).json({ error });
      } else {
        res.status(201).json({ message: "Votre compte a bien été supprimé !" });
      }
    }
  );
};

// voir les articles d'un utilisateur
exports.userArticles = function (req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.token);
  const userId = decodedToken.userId;

  // va chercher dans la bdd ce qu'il y a comme articles
  db.query(
    `SELECT post.id, post.title, post.content, post.imageUrl, post.attachment, post.createdAt,   
      post.updatedAt, user.firstName, user.lastName
    FROM post
    JOIN user
    ON post.userId = user.id
    WHERE user.id = ?
    ORDER BY post.createdAt DESC`,
    [userId],
    function (error, result) {
      if (error) {
        res.status(400).json({ error });
      } else {
        res.status(201).json(result);
      }
    }
  );
};
