import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="footer-section">
          <h4>Address</h4>
          <p>123 Main Street,Rewari,Haryana</p>
        </div>
        <div className="footer-section">
          <h4>Contact No.</h4>
          <p>+91-9306725390</p>
        </div>
        <div className="footer-section">
          <h4>Email</h4>
          <p>info@TrackMyFunds.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 TrackMyFunds. All rights reserved.</p>
        <p>
          This app helps you manage your expenses efficiently and stay on top of
          your finances.
        </p>
      </div>
    </div>
  );
};

export default Footer;
