// Importation de mongoose

const mongoose = require("mongoose");

const uniqueEmailValidator = require("mongoose-unique-validator");

// Creation du schéma utilisateur

const userSchema = mongoose.Schema({
  email: { typr: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueEmailValidator);

//Exportation du modele

module.exports = mongoose.model("User", userSchema);
