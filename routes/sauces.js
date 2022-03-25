// Création du router sauces

// Importation d'express et des middlewares

const express = require("express");
const routerSauces = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

const saucesCrtl = require("../controllers/sauces");

routerSauces.get("/", auth, saucesCrtl.getAllElement);
routerSauces.get("/:id", auth, saucesCrtl.getJustOneElement);
routerSauces.post("/", auth, multer, saucesCrtl.addElement);
routerSauces.put("/:id", auth, multer, saucesCrtl.updateElement);
routerSauces.delete("/:id", auth, saucesCrtl.deleteElement);
routerSauces.post(":id/like", auth, saucesCrtl.likeElement);

// Exportation des routes

module.exports = routerSauces;
