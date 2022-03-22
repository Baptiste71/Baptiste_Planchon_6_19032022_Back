// Création du router utilisateurs

const express = require("express");
const router = express.Router();
const userCrtl = require("../controllers/user");

// Création de la route Post pour "signup" Nouveau utilisateurs

router.post("/signup", userCrtl.signup);

// Création de la route Post pour "login" Utilisateurs existants

router.post("/login", userCrtl.login);

// Exportation du router

module.exports = router;
