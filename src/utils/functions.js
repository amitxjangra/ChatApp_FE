const logout = () => {
  localStorage.removeItem("user_id");
  localStorage.removeItem("token");
};

export { logout };
