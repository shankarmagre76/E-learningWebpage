// src/services/authService.js
import api from "./api";

export const registerUser = (data) => api.post("/auth/register", data);

export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);

  // store token + user for later use
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data;
};
