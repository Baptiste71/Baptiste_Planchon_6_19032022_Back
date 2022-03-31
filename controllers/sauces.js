// Importation du modele Sauce

const allSauces = require("../models/Sauces");

// Importation fs 'file system' ici utilisé pour le controller delete

const fs = require("fs");

// controller pour la route get

exports.getAllElement = (req, res, next) => {
  allSauces
    .find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};

// controller pour la route get /:id

exports.getJustOneElement = (req, res, next) => {
  allSauces
    .findOne({ _id: req.params.id })
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};

// controller pour la route Post

exports.addElement = (req, res, next) => {
  const saucesObject = JSON.parse(req.body.sauce);
  delete saucesObject._id;
  const addSauce = new allSauces({
    ...saucesObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [" "],
    usersDisliked: [" "],
  });
  addSauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
};

// controller pour la route put

exports.updateElement = (req, res, next) => {
  const saucesObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      }
    : { ...req.body };

  allSauces
    .updateOne({ _id: req.params.id }, { ...saucesObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
    .catch((error) => res.status(400).json({ error }));
};

// controller pour la route delete

exports.deleteElement = (req, res, next) => {
  allSauces
    .findOne({ _id: req.params.id })
    .then((sauces) => {
      const filename = sauces.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        allSauces
          .deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// controller pour la route post likes / dislikes

exports.likeElement = (req, res, next) => {
  const sauces = req.params.id;
  const user = req.body.userId;
  const likes = req.body.like;

  if (likes) {
    // Dans le cas d'un like

    allSauces
      .updateOne({ _id: sauces }, { usersLiked: user, likes: +1 })
      .then(() => res.status(200).json({ message: "J'aime bien cette sauce !" }))
      .catch((error) => res.status(400).json({ error }));
  } else if (likes) {
    // Dans le cas d'un dislike

    allSauces
      .updateOne({ _id: sauces }, { usersLiked: user, dislikes: -1 })
      .then(() => res.status(200).json({ message: "J'aime pas cette sauce !" }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    // Dans le cas où like n'est pas attribué

    allSauces
      .updateOne({ _id: sauces }, { usersLiked: user })
      .then(() => res.status(200).json({ message: "Je n'ai pas fais mon choix !" }))
      .catch((error) => res.status(400).json({ error }));
  }
};
