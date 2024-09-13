import React, { useEffect, useState } from "react";
import "../styles/dashboardContent.css";
import { getIncome } from "../api/income"; // Adjust the import path based on your folder structure
import { getExpense } from "../api/expense"; // Adjust the import path based on your folder structure
import TransactionContent from "./TransactionContent";

const DashboardContent = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);

  const userID = localStorage.getItem("userID"); // Fetch the user ID from localStorage or auth context

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch income and expense data
        const incomeData = await getIncome(userID);
        const expenseData = await getExpense(userID);

        // Calculate total income and expense
        const totalIncome = incomeData.reduce(
          (sum, income) => sum + Number(income.amount),
          0
        );
        const totalExpense = expenseData.reduce(
          (sum, expense) => sum + Number(expense.amount),
          0
        );

        // Calculate available balance
        const availableBalance = totalIncome - totalExpense;

        // Update state with calculated values
        setTotalIncome(totalIncome);
        setTotalExpense(totalExpense);
        setAvailableBalance(availableBalance);
      } catch (error) {
        console.error("Error fetching income or expense data:", error);
      }
    };

    fetchData();
  }, [userID]);

  return (
    <>
      <div className="dashboard-container">
        <div className="box">
          <h3>Available Balance</h3>
          <p>₹{availableBalance}</p>
        </div>
        <div className="box">
          <h3>Total Income</h3>
          <p>₹{totalIncome}</p>
        </div>
        <div className="box">
          <h3>Total Expense</h3>
          <p>₹{totalExpense}</p>
        </div>
      </div>
      <TransactionContent />
    </>
  );
};

export default DashboardContent;
