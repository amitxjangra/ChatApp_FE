import axios from "axios";

// Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/app",
});

// Add token to all requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ========== AUTH ==========

// Login
export const login = (credentials) => API.post("/auth/login", credentials);

// Register
export const registerUser = (userData) => API.post("/auth/register", userData);

export const userSeach = (query) => API.get(`/users/search?query=${query}`);
