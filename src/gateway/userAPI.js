import APIClient from "../utils/APIClient";

const fetchUsersByNameOrEmail = async (query) => {
  return await APIClient.get(`/user/search?query=${query}`);
};

const sendFriendRequest = async (id) => {
  return await APIClient.post("/user/sendRequest", { id });
};

const acceptRequest = async (id) => {
  return await APIClient.post("/user/acceptRequest", { id });
};

const rejectRequest = async (id) => {
  return await APIClient.post("/user/rejectRequest", { id });
};

export default {
  fetchUsersByNameOrEmail,
  sendFriendRequest,
  acceptRequest,
  rejectRequest,
};
