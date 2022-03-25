// Création du router utilisateurs

const express = require("express");
const routerUser = express.Router();
const userCrtl = require("../controllers/user");

// Création de la route Post pour "signup" Nouveau utilisateurs

routerUser.post("/signup", userCrtl.signup);

// Création de la route Post pour "login" Utilisateurs existants

routerUser.post("/login", userCrtl.login);

// Exportation du router

module.exports = routerUser;
