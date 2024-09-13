import { useEffect, useState } from "react";
import "../styles/dashboardContent.css";
import { getExpense } from "../api/expense";
import ExpenseForm from "../form/expenseForm";

const ExpenseContent = ({ userID }) => {
  const [expense, setExpense] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [weekBalance, setWeekBalance] = useState(0);
  const [monthBalance, setMonthBalance] = useState(0);
  const [yearBalance, setYearBalance] = useState(0);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const data = await getExpense(userID);
        setExpense(data);

        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

        // Calculate week balance
        const weekExpense = data
          .filter((item) => new Date(item.expense_date) >= oneWeekAgo)
          .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

        // Calculate month balance
        const monthExpense = data
          .filter((item) => new Date(item.expense_date) >= oneMonthAgo)
          .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

        // Calculate year balance
        const yearExpense = data
          .filter((item) => new Date(item.expense_date) >= oneYearAgo)
          .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

        setWeekBalance(weekExpense);
        setMonthBalance(monthExpense);
        setYearBalance(yearExpense);
      } catch (error) {
        console.error("Failed to fetch income:", error);
      }
    };

    fetchExpense();
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

  const handleAddExpenseClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="box">
          <h3>Recent Week Expense</h3>
          <p>₹{weekBalance}</p>
        </div>
        <div className="box">
          <h3>Recent Month Expense</h3>
          <p>₹{monthBalance}</p>
        </div>
        <div className="box">
          <h3>Recent Year Expense</h3>
          <p>₹{yearBalance}</p>
        </div>
      </div>
      <div className="recent-transactions-container">
        <div className="transactions-header">
          <h3>Recent expense</h3>
          <button className="add-income-button" onClick={handleAddExpenseClick}>
            ADD expense
          </button>
        </div>
        <div className="transactions-table">
          <table>
            <thead>
              <tr>
                <th>expense ID</th>
                <th>User ID</th>
                <th>Amount</th>
                <th>expense Date</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {expense.length > 0 ? (
                expense.map((transaction) => (
                  <tr key={transaction.expense_id}>
                    <td>{`TID3872XG${transaction.expense_id}`}</td>
                    <td>{transaction.user_id}</td>
                    <td>{`₹${transaction.amount}`}</td>
                    <td>{formatDate(transaction.expense_date)}</td>
                    <td>{transaction.category}</td>
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

      {/* Form for adding expense */}
      {showForm && (
        <ExpenseForm userID={userID} onFormClose={handleCloseForm} />
      )}
    </>
  );
};

export default ExpenseContent;
