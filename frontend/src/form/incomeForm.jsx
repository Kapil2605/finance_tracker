import { useState } from "react";
import "../styles/dashboardContent.css";
import { addIncome } from "../api/income";

const IncomeForm = ({ userID, onFormClose }) => {
  const [formData, setFormData] = useState({
    user_id: userID,
    amount: "",
    source: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addIncome(formData);
      console.log("Response:", response);
      // Optionally clear the form or perform other actions
      setFormData({
        user_id: userID,
        amount: "",
        source: "",
      });
      onFormClose(); // Close the form after successful submission
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="income-form-container">
      <div className="form-overlay" onClick={onFormClose}></div>
      <div className="income-form">
        <h3>Add Income</h3>
        <form onSubmit={handleSubmit}>
          <label>
            User ID:
            <input
              type="text"
              name="user_id"
              value={formData.user_id}
              onChange={handleInputChange}
              required
              readOnly // User ID is taken from props and should not be editable
            />
          </label>
          <label>
            Amount:
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Source:
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Submit</button>
          <button type="button" onClick={onFormClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default IncomeForm;
