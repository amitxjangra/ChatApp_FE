import APIClient from "../utils/APIClient";

const fetchChats = async () => {
  let resp = await APIClient.get("/chat/all");
  console.log(resp);
  return resp;
};

const fetchGroupChats = async (id) => {
  let resp = await APIClient.get(`/chat/group/${id}`);
  // console.log(resp);
  return resp;
};
export default { fetchChats, fetchGroupChats };
