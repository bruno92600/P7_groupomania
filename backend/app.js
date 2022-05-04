// import de dotenv pour y mettre les données sensibles(token, mdp...)
require("dotenv").config();

// import de express pour la création de l'app
const express = require("express");

// import de node.js utilitaires pour travailler avec les chemins de fichiers et de repertoires
const path = require("path");

//Lancement de l'application express
const app = express();

// import de helmet
const helmet = require("helmet");

// import de express session 
const session = require("express-session");

// import des routes pour sécuriser les headers
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

// analyseur de cookies
let datecookie = new Date(Date.now() + 60 * 60 * 1000);
app.use(
  session({
    secret: process.env.cookieSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: true, expires: datecookie },
  })
);

// gerer les problemes cors(cross origin request sharing)
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content, Accept, Content-type, Authorization"
  );
  next();
});

// helmet pour sécuriser les headers
app.use(helmet());


app.use(express.json());

// route pour accéder aux images
app.use("/images", express.static(path.join(__dirname, "images")));

// route de la fiche user
app.use("/api/users", userRoutes);

// route de la fiche post
app.use("/api/post", postRoutes);

// export de app.js pour y acceder via un autre fichier
module.exports = app;
