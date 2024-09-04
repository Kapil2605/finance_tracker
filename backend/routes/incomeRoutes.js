const express = require("express");
const authenticateToken = require("../middleware/authmiddleware");
const { addIncome, getIncome } = require("../controllers/incomeController");
const router = express.Router();

router.post("/add-income", authenticateToken, addIncome);
router.get("/get-income", authenticateToken, getIncome);
module.exports = router;
