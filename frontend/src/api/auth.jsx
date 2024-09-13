// src/api/auth.js
import axios from "axios";

const API_URL = "http://localhost:8080"; // Replace with your backend URL

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  console.log(response.data);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  console.log(response.data);
  return response.data;
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
