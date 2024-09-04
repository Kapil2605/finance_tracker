const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract the token from "Bearer <token>"

  if (token == null) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    //console.log("Decoded User:", user); // Debugging: Check decoded token
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
