import chatsAPI from "../gateway/chatsAPI";

const fetchChats = async () => {
  try {
    const res = await chatsAPI.fetchChats();
  } catch (err) {
    console.log(err);
  }
};

const fetchGroupChats = async (id) => {
  try {
    let { data } = await chatsAPI.fetchGroupChats(id);
    return data[0];
  } catch (err) {
    console.log(err);
  }
};

export { fetchChats, fetchGroupChats };
