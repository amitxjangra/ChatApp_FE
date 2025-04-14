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

// Get current user (optional)
// export const getCurrentUser = () => API.get("/auth/me");

// ========== CONVERSATIONS ==========

// Get all conversations (group + private)

// Get messages of a conversation (group or private)
export const getMessages = (conversationId, type) =>
  API.get(`/chat/conversation/${conversationId}`);

// ========== MESSAGES ==========

// Send message via HTTP fallback (mostly using WebSocket though!)
export const sendMessage = (messageData) => API.post("/chat/send", messageData);

// ========== CONTACTS ==========

// Get contacts list (users you’ve chatted with)
export const getContacts = () => API.get("/chat/contacts");

// ========== GROUP CHAT ==========

// Create group chat
export const createGroup = (groupData) => API.post("/group/create", groupData);

// Add members to group
export const addGroupMembers = (groupId, members) =>
  API.post(`/group/${groupId}/add`, { members });

// Get group details (optional)
export const getGroupDetails = (groupId) => API.get(`/group/${groupId}`);

// ========== SEARCH (optional improvement) ==========

// Search users by name
export const searchUsers = (query) => API.get(`/auth/search?query=${query}`);

// Search groups by name
export const searchGroups = (query) => API.get(`/group/search?query=${query}`);
