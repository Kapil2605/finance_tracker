const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const getUser = require("../controllers/dashboardController");
const authenticateToken = require("../middleware/authmiddleware");

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/profile", authenticateToken, getUser);

module.exports = router;
