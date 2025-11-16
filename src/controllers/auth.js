import AuthAPI from "../gateway/auth";

const login = async (email, password) => {
  try {
    let payload = {
      email,
      password,
    };
    const { data } = await AuthAPI.login(payload);
    return data;
  } catch (e) {
    console.error(e);
  }
};
const register = async (params) => {
  try {
    const { data } = await AuthAPI.registerUser(params);
    return data;
  } catch (e) {
    console.error(e);
  }
};
const logout = async () => {
  try {
    const resp = await AuthAPI.logout();
    return resp.data;
  } catch (e) {
    console.error(e);
  }
};

export { login, register, logout };
