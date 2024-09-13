import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = ({ handleLogout, name, email }) => {
  const location = useLocation();
  const isLoggedIn = !!name && !!email;

  return (
    <div className="navbar">
      <div className="navbar-left">
        <h1>TrackMyFunds</h1>
      </div>
      <div className="navbar-middle"></div>
      <div className="navbar-right">
        {location.pathname === "/login" && (
          <Link to="/register">
            <button className="logout-button">Register</button>
          </Link>
        )}
        {location.pathname === "/register" && (
          <Link to="/login">
            <button className="logout-button">Login</button>
          </Link>
        )}
        {isLoggedIn && (
          <>
            <div className="user-info">
              <span className="user-name">{name}</span>
              <span className="user-email">{email}</span>
            </div>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
