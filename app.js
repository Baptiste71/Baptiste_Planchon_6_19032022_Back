const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
app.use(express.json());

const sauces = require("./models/Sauces");

// Importation des routers

const userRoutes = require("./routes/user");
const saucesRoutes = require("./routes/sauces");
const Sauces = require("./models/Sauces");

mongoose
  .connect("mongodb+srv://BaptistePlch:Titi2000@cluster0.dk9rx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.post("/api/sauces", (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body,
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: "Sauces enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
});

app.use("/api/sauces", (req, res, next) => {
  Sauces.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
});

app.use("/images", express.static(path.join(__dirname, "images")));

// Enregistrement des routes

app.use("/api/auth", userRoutes);
app.use("/api/sauces", saucesRoutes);

// exportation du fichier

module.exports = app;
