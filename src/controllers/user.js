import userAPI from "../gateway/userAPI";

const fetchUsersByNameOrEmail = async (query) => {
  let { data } = await userAPI.fetchUsersByNameOrEmail(query);
  return data;
};

const sendFriendRequest = async (id) => {
  let { data } = await userAPI.sendFriendRequest(id);
  return data;
};

const acceptRequest = async (id) => {
  let { data } = await userAPI.acceptRequest(id);
  return data;
};

const rejectRequest = async (id) => {
  let { data } = await userAPI.rejectRequest(id);
  return data;
};

export {
  fetchUsersByNameOrEmail,
  sendFriendRequest,
  acceptRequest,
  rejectRequest,
};
