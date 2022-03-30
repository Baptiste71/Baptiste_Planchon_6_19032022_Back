const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
require("dotenv").config();

app.use(express.json());

// Importation des routers

const userRoutes = require("./routes/user");
const saucesRoutes = require("./routes/sauces");

mongoose
  .connect(process.env.BDD_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

// Creation d'une nouvelle sauce

//app.post("/api/sauces", (req, res, next) => {
//  delete req.body._id;
//  const thing = new Sauces({
//    ...req.body,
//  });
//  thing
//    .save()
//    .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
//    .catch((error) => res.status(400).json({ error }));
//});
//
//// Recuperation d'une sauce specifique
//
//app.get("/api/sauces/:id", (req, res, next) => {
//  Sauces.findOne({ _id: req.params.id })
//    .then((thing) => res.status(200).json(thing))
//    .catch((error) => res.status(404).json({ error }));
//});
//
//// Recuperation de toute les sauces
//
//app.get("/api/sauces", (req, res, next) => {
//  Sauces.find()
//    .then((things) => res.status(200).json(things))
//    .catch((error) => res.status(400).json({ error }));
//});

app.use("/images", express.static(path.join(__dirname, "images")));

// Enregistrement des routes

app.use("/api/auth", userRoutes);
app.use("/api/sauces", saucesRoutes);

// exportation du fichier

module.exports = app;
