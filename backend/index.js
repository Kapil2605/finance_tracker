const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authroutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoute = require("./routes/expenseRoutes");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
//const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

const port = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

// Routes
app.use("/auth", authRoutes);
app.use("/income", incomeRoutes);
app.use("/expense", expenseRoute);
//app.use("/api/transactions", transactionRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
