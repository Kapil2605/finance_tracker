import React, { useEffect, useState } from "react";
import "../styles/dashboardContent.css";
import { getIncome } from "../api/income";
import { getExpense } from "../api/expense";

const TransactionContent = ({ userID }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const incomeData = await getIncome(userID);
        const expenseData = await getExpense(userID);

        // Combine income and expense data
        const combinedData = [
          ...incomeData.map((item) => ({
            ...item,
            type: "Income",
            id: `INCOME-${item.income_id}`,
            date: item.income_date, // Ensure this date format is consistent
            source: item.source,
          })),
          ...expenseData.map((item) => ({
            ...item,
            type: "Expense",
            id: `EXPENSE-${item.expense_id}`,
            date: item.expense_date, // Ensure this date format is consistent
            source: item.category,
          })),
        ];

        // Sort combined data by date in descending order
        combinedData.sort((a, b) => new Date(b.date) - new Date(a.date));

        setTransactions(combinedData);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    fetchTransactions();
  }, [userID]);

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  // Define color styles
  const getColorStyle = (type) => {
    switch (type) {
      case "Income":
        return { color: "#00ff00" }; // Green for income
      case "Expense":
        return { color: "#ff0000" }; // Red for expense
      default:
        return { color: "#000000" }; // Default color
    }
  };

  return (
    <>
      <div className="recent-transactions-container">
        <h3>Recent Transactions</h3>
        <div className="transactions-table">
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Amount Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Source/Category</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td style={getColorStyle(transaction.type)}>
                      {transaction.id}
                    </td>
                    <td style={getColorStyle(transaction.type)}>
                      {transaction.type}
                    </td>
                    <td
                      style={getColorStyle(transaction.type)}
                    >{`₹${transaction.amount}`}</td>
                    <td style={getColorStyle(transaction.type)}>
                      {formatDate(transaction.date)}
                    </td>
                    <td style={getColorStyle(transaction.type)}>
                      {transaction.source}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No transactions available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TransactionContent;
