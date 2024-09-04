const db = require("../db");

const addExpense = async (req, res) => {
  const { amount, category } = req.body;
  const user_Id = req.user.id; // Get user ID from token

  //console.log("User_id", user_Id);
  // Get the current date and time
  const expense_date = new Date();

  const query =
    "INSERT INTO expense (user_id, amount, expense_date,category) VALUES (?, ?, ?, ?)";
  db.query(query, [user_Id, amount, expense_date, category], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Income added", id: result.insertId });
  });
};

const getExpense = async (req, res) => {
  const user_ID = req.user.id;

  const query = "SELECT * FROM expense where user_id=?";
  db.query(query, user_ID, (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(results);
  });
};

module.exports = { addExpense, getExpense };
