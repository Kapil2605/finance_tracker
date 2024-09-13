import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth";
import "../styles/auth.css";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  // Load saved email and password from localStorage if they exist
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ email, password });

      // Save email and password to localStorage
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);

      setUserDetails(user); // Set user details for the popup
      setLoginSuccess(true); // Show the popup
      setTimeout(() => {
        setLoginSuccess(false);
        navigate("/dashboard");
      }, 3000); // Show popup for 3 seconds before redirecting
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <div className="auth-left">
          <img
            src="/images/RegisterExpense.jpg"
            alt="Login Illustration"
            className="auth-image"
          />
        </div>
        <div className="auth-right">
          <div className="auth-form">
            <h2>Login Here</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              <button type="submit">Login</button>
            </form>
            <p>
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </div>
        </div>
      </div>
      {loginSuccess && (
        <div className="login-popup">
          <div className="popup-content">
            <FontAwesomeIcon icon={faCheckCircle} className="popup-icon" />
            <h3>Login Successful</h3>
            {userDetails && (
              <div className="user-details">
                <p>Welcome {userDetails.email}</p>
                {/* Add other user details as needed */}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
