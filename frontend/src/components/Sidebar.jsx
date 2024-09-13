import React, { useState } from "react";
import "../styles/sidebar.css";

const Sidebar = ({ setActiveSection, activeSection }) => {
  return (
    <div className="sidebar">
      <div className="profile">
        <img
          src="/images/loginExpense.jpg"
          alt="Login Illustration"
          className="auth-image"
        />
      </div>
      <ul>
        <li
          className={activeSection === "Dashboard" ? "active" : ""}
          onClick={() => setActiveSection("Dashboard")}
        >
          Dashboard
        </li>
        <li
          className={activeSection === "Income" ? "active" : ""}
          onClick={() => setActiveSection("Income")}
        >
          Income
        </li>
        <li
          className={activeSection === "Expense" ? "active" : ""}
          onClick={() => setActiveSection("Expense")}
        >
          Expense
        </li>
        <li
          className={activeSection === "Transactions" ? "active" : ""}
          onClick={() => setActiveSection("Transactions")}
        >
          Transactions
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
