const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const register = async (req, res) => {
  const { email, password, name } = req.body;

  // Check if all required fields are provided
  if (!email || !password || !name) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    // Check if the user already exists
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.createUser(email, hashedPassword, name);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.getUserByEmail(email);
    if (
      user.length === 0 ||
      !(await bcrypt.compare(password, user[0].password))
    ) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user[0].id, name: user[0].name },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.json({
      message: "User Login successfully",
      email,
      password,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
