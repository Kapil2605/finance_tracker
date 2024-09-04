const db = require("../db");

const addIncome = async (req, res) => {
  const { amount, source } = req.body;
  const user_Id = req.user.id; // Get user ID from token

  //console.log("User_id", user_Id);
  // Get the current date and time
  const income_date = new Date();

  const query =
    "INSERT INTO income (user_id, amount, income_date,source) VALUES (?, ?, ?, ?)";
  db.query(query, [user_Id, amount, income_date, source], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Income added", id: result.insertId });
  });
};

const getIncome = async (req, res) => {
  const user_ID = req.user.id;

  const query = "SELECT * FROM INCOME where user_id=?";
  db.query(query, user_ID, (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(results);
  });
};

module.exports = { addIncome, getIncome };
