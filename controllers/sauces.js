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
  allSauces.findOne({ _id: req.params.id }).then((sauces) => {
    if (sauces.userId !== req.auth.userId) {
      return res.status(401).json({ message: "Requête non autorisée !" });
    }
    const filename = sauces.imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`, () => {});
  });
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
      if (sauces.userId !== req.auth.userId) {
        return res.status(401).json({ message: "requête non autorisée !" });
      }
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

  switch (likes) {
    case 1:
      // Dans le cas d'un like +1
      allSauces
        .updateOne(
          { _id: sauces },
          {
            $inc: { likes: 1 },
            $push: { usersLiked: user },
          }
        )
        .then(() => res.status(200).json({ message: "J'aime bien cette sauce !" }))
        .catch((error) => res.status(400).json({ error }));
      break;

    case -1:
      // Dans le cas d'un Dislike +1
      allSauces
        .updateOne(
          { _id: sauces },
          {
            $inc: { dislikes: 1 },
            $push: { usersDisliked: user },
          }
        )
        .then(() => res.status(200).json({ message: "J'aime pas cette sauce !" }))
        .catch((error) => res.status(400).json({ error }));

      break;

    case 0:
      // Dans le cas d'un like neutre = 0 (pas de vote) ou d'une remise à zero si on enleve le dislike
      allSauces
        .findOne({ _id: sauces })
        .then((sauce) => {
          if (sauce.usersLiked.includes(user)) {
            allSauces
              .updateOne(
                { _id: sauces },
                {
                  $inc: { likes: -1 },
                  $pull: { usersLiked: user },
                }
              )
              .then(() => res.status(200).json({ message: "Je suis neutre !" }))
              .catch((error) => res.status(400).json({ error }));
          }
          if (sauce.usersDisliked.includes(user)) {
            allSauces
              .updateOne(
                { _id: sauces },
                {
                  $inc: { dislikes: -1 },
                  $pull: { usersDisliked: user },
                }
              )
              .then(() => res.status(200).json({ message: "Je suis neutre !" }))
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(404).json({ error }));
      break;
  }
};
