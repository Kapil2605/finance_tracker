import axios from "axios";

const API_URL = "http://localhost:8080"; // Replace with your backend URL

export const getIncome = async (userID) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/income/get-income`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      user_id: userID, // Fetch income based on userID
    },
  });
  console.log(userID);
  console.log(response);
  return response.data;
};

export const addIncome = async (formData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_URL}/income/add-income`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // No need to add params for POST request
  });
  console.log(response);
  return response.data;
};
