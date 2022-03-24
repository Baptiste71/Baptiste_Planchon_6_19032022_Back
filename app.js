const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const thing = require("./models/Sauces");

// Importation des routers

const userRoutes = require("./routes/user");

mongoose
  .connect("mongodb+srv://BaptistePlch:Titi2000@cluster0.dk9rx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.post("/api/stuff", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({ message: "objet crée !" });
});

app.get("/api/stuff", (req, res, next) => {
  const stuff = [
    {
      userId: "oeihfzeoi",
      name: "Mon premier objet",
      description: "Les infos de mon premier objet",
      imageUrl: "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      heat: 3,
      likes: 6,
      dislikes: 4,
      manufacturer: "qsomihvqios",
      mainPepper: "piment rouge",
    },
  ];
  res.status(200).json(stuff);
});
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

// Enregistrement des routes

app.use("/api/auth", userRoutes);

// exportation du fichier

module.exports = app;
