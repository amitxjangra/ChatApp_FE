import { logout } from "../controllers/auth";
const logoutUser = async () => {
  const res = await logout();
  localStorage.removeItem("user_id");
  localStorage.removeItem("token");
};

export { logoutUser };
