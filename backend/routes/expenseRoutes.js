const express = require("express");
const authenticateToken = require("../middleware/authmiddleware");
const { addExpense, getExpense } = require("../controllers/expenseController");
const router = express.Router();

//router.post("/add-expense", authenticateToken, addExpense);
// router.get("/get-expense", authenticateToken, (req, res) => {
//   res.status(200).json({ message: "Hello" });
// });
router.post("/add-expense", authenticateToken, addExpense);
router.get("/get-expense", authenticateToken, getExpense);
module.exports = router;
