// import de mysql pour creer la connexion
const mysql = require("mysql2");

// import de dotenv pour caché les données type : password, token etc...
const dotenv = require("dotenv").config({path: ".env"});

//Connexion à la base de données
const db = mysql.createConnection({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_database,
});

// log pour savoir si erreur ou si bonne connection
db.connect((error) => {
  if(error) {
    throw error;
  } else {
    console.log("connecté a groupomaniaaa (sql) avec l\'ID " + db.threadId);
  }
});

// export de db pour l'acces a la bdd
module.exports = db;
