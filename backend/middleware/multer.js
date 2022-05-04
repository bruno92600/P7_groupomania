// import de multer pour gerer les images
const multer = require("multer");
const upload = multer({dest: "./images"});

// dictionnaire des mimetypes
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
    'image/gif': 'gif',
    'video/mp4': 'mp4'
  }

// destination du fichier et génerer un nom fichier unique
const storage = multer.diskStorage({
    // destination stockage fichier
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    filename: (req, file, callback) => {
        //supprimer les espaces dans le nom du fichier
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        //callback(null, name + "_" + Date.now() + "." + extension);
        callback(null, name + Date.now() + "." + extension);
    }
});

// export du middleware
module.exports = multer({storage: storage}).single("image");