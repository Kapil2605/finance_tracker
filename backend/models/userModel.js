const db = require("../db");

//in case of login to find the user
const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM Users WHERE email = ?",
      [email],
      (error, results) => {
        if (error) return reject(error);
        resolve(results);
      }
    );
  });
};

//to check whether user already registered or not
const findUserByEmail = async (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (error, results) => {
        if (error) return reject(error);
        if (results.length > 0) {
          resolve(results[0]);
        } else {
          resolve(null);
        }
      }
    );
  });
};

const createUser = (email, hashedPassword, name) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO Users (email, password,name) VALUES (?,?, ?)",
      [email, hashedPassword, name],
      (error, results) => {
        if (error) return reject(error);
        resolve(results);
      }
    );
  });
};

module.exports = { getUserByEmail, findUserByEmail, createUser };
