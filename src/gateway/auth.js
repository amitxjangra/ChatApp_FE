import APIClient from "../utils/APIClient";

const login = async (credentials) => {
  let res = await APIClient.post("/auth/login", credentials);
  return res;
};

const registerUser = async (userData) => {
  return await APIClient.post("/auth/register", userData);
};

const logout = async () => {
  return await APIClient.post("/auth/logout");
};

export default {
  login,
  registerUser,
  logout,
};
