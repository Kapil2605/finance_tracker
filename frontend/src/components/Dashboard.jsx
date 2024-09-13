import React, { useEffect, useState } from "react";
import { getProfile } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import DashboardContent from "../content/DashboardContent";
import IncomeContent from "../content/IncomeContent";
import ExpenseContent from "../content/ExpenseContent";
import TransactionContent from "../content/TransactionContent";

const Dashboard = () => {
  const [user, setUser] = useState({ id: "", name: "", email: "" });
  const [activeSection, setActiveSection] = useState("Dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser({
          id: data[0].id,
          name: data[0].name,
          email: data[0].email,
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return <DashboardContent />;
      case "Income":
        return <IncomeContent userID={user.id} />;
      case "Expense":
        return <ExpenseContent />;
      case "Transactions":
        return <TransactionContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <>
      <Navbar handleLogout={handleLogout} name={user.name} email={user.email} />
      <div className="dashboard-layout">
        <Sidebar
          setActiveSection={setActiveSection}
          activeSection={activeSection}
        />
        <div className="dashboard-content">{renderContent()}</div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Dashboard;
