import React, { useEffect, useState } from "react";
import "../styles/dashboardContent.css";
import { getIncome } from "../api/income";
import IncomeForm from "../form/incomeForm";

const IncomeContent = ({ userID }) => {
  const [income, setIncome] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [weekBalance, setWeekBalance] = useState(0);
  const [monthBalance, setMonthBalance] = useState(0);
  const [yearBalance, setYearBalance] = useState(0);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const data = await getIncome(userID);
        setIncome(data);

        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

        // Calculate week balance
        const weekIncome = data
          .filter((item) => new Date(item.income_date) >= oneWeekAgo)
          .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

        // Calculate month balance
        const monthIncome = data
          .filter((item) => new Date(item.income_date) >= oneMonthAgo)
          .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

        // Calculate year balance
        const yearIncome = data
          .filter((item) => new Date(item.income_date) >= oneYearAgo)
          .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

        setWeekBalance(weekIncome);
        setMonthBalance(monthIncome);
        setYearBalance(yearIncome);
      } catch (error) {
        console.error("Failed to fetch income:", error);
      }
    };

    fetchIncome();
  }, [userID]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
      .replace(",", ""); // Remove the comma after the date
  };

  const handleAddIncomeClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="box">
          <h3>Recent Week Income</h3>
          <p>₹{weekBalance}</p>
        </div>
        <div className="box">
          <h3>Recent Month Income</h3>
          <p>₹{monthBalance}</p>
        </div>
        <div className="box">
          <h3>Recent Year Income</h3>
          <p>₹{yearBalance}</p>
        </div>
      </div>
      <div className="recent-transactions-container">
        <div className="transactions-header">
          <h3>Recent Income</h3>
          <button className="add-income-button" onClick={handleAddIncomeClick}>
            ADD INCOME
          </button>
        </div>
        <div className="transactions-table">
          <table>
            <thead>
              <tr>
                <th>Income ID</th>
                <th>User ID</th>
                <th>Amount</th>
                <th>Income Date</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {income.length > 0 ? (
                income.map((transaction) => (
                  <tr key={transaction.income_id}>
                    <td>{`TID3872XG${transaction.income_id}`}</td>
                    <td>{transaction.user_id}</td>
                    <td>{`₹${transaction.amount}`}</td>
                    <td>{formatDate(transaction.income_date)}</td>
                    <td>{transaction.source}</td>
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

      {/* Form for adding income */}
      {showForm && <IncomeForm userID={userID} onFormClose={handleCloseForm} />}
    </>
  );
};

export default IncomeContent;
