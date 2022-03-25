// Importation du modele Sauce

const allSauces = require("../models/Sauces");
const jsonWT = require("jsonwebtoken");
const req = require("express/lib/request");
const res = require("express/lib/response");
const Sauces = require("../models/Sauces");

// controller pour la route get

exports.getAllElement = (req, res, next) => {
  allSauces
    .find()
    .then(() => res.status(201).json({ message: "Toutes les sauces ont été trouvées !" }))
    .catch((error) => res.status(400).json({ error }));
};

// controller pour la route get /:id

exports.getJustOneElement = (req, res, next) => {
  allSauces
    .findOne({ _id: req.body._id })
    .then(() => res.status(201).json({ message: "La sauce a été trouvée !" }))
    .catch((error) => res.status(400).json({ error }));
};

// controller pour la route Post

exports.addElement = (req, res, next) => {
  const saucesObject = JSON.parse(req.body.Sauces);
  delete saucesObject._id;
  const addSauce = new Sauces({
    ...saucesObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [" "],
    usersDisliked: [" "],
  });
  addSauce
    .save()
    .then(() => res.status(201).json({ message: "Sauces enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
};

// controller pour la route put

exports.updateElement = (req, res, next) => {};
