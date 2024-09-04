const db = require("../db");
const getUser = async (req, res) => {
  const user_ID = req.user.id;

  const query = "SELECT * FROM users where id=?";
  db.query(query, user_ID, (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(results);
  });
};
module.exports = getUser;
