const jsonWT = require("jsonwebtoken");

// Exportation du middleware

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jsonWT.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID non valide !";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "Requête non autorisée !" });
  }
};
