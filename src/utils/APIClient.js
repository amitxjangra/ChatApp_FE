import axios from "axios";

const APIClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// Add token to all requests
APIClient.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

APIClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const customError = {
      status: err.response?.status || 500,
      message: err.response?.data?.message || "Server Error",
    };
    return Promise.reject(customError);
  }
);

export default APIClient;
