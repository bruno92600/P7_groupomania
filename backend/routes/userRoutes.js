// import de express
const express = require("express");

// fonction router d'express
const router = express.Router();

// import  du controllers user.js
const userController = require("../controllers/user");

// import des middleware 
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");
const limiter = require("../middleware/limiter");

// route signup 
router.post("/signup", userController.signup);

// route login
router.post("/login", limiter, userController.login);

// route général pour les users
router.get("/getUser", auth, userController.getUser);
router.get("/getAllUser", auth, userController.getAllUser);
router.get("/userArticles", auth, userController.userArticles);
router.post("/userUpdate", auth, multer, userController.userUpdate);
router.delete("/userDelete", auth, userController.userDelete);

// export du module router
module.exports = router;
