// configuration de multer

// importation de multer

const multer = require("multer");

// Création d'un dictionnaire

const dictionnary_MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// création d'un objet de configuration

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    // Suppression des espaces dans le nom orginal remplacer par des '_'
    const name = file.originalname.split(" ").join("_");
    // Création de l'extension du fichier
    const extension = dictionnary_MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

// Exportation du middleware multer configuré

module.exports = multer({ storage }).single("image");
