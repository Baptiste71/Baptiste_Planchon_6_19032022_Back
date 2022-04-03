// configuration de multer

// importation de multer

const multer = require("multer");

// Création d'un dictionnaire

const dictionnary_MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// création d'un nom de fichier unique

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    // Suppression de l'extension du fichier original
    const fileName = file.originalname.split(".")[0];
    // Suppression des espaces dans le nom orginal remplacer par des '_'
    const name = fileName.split(" ").join("_");
    // Création de Date now() + extension
    const extension = dictionnary_MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

// Exportation du middleware multer configuré

module.exports = multer({ storage }).single("image");
