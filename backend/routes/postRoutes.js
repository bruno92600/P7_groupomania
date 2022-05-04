// import de express
const express = require("express");

// fonction router d'express
const router = express.Router();

// import du controllers post
const postController = require("../controllers/post");

// import du middleware auth et multer
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

//Routes des articles
router.post("/article", auth, multer, postController.createPost);
router.get("/", auth, postController.getAllPost);
router.get("/:id", auth, postController.getOnePost);
router.delete("/:id", auth, postController.deletePost);
//Routes des commentaires
router.post("/postComment", auth, postController.commentPost);
router.get("/getComment/:id", auth, postController.getComment);
router.delete("/getComment/delete/:id", auth, postController.deleteComment);

// export du module router
module.exports = router;
