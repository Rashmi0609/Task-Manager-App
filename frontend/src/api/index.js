import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getTasks = async () => {
  const res = await axios.get(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data;
};

export const addTask = async (task) => {
  const res = await axios.post(`${API_URL}/tasks`, task, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data;
};

export const updateTask = async (taskId, updates) => {
  const res = await axios.put(`${API_URL}/tasks/${taskId}`, updates, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data;
};

export const deleteTask = async (taskId) => {
  const res = await axios.delete(`${API_URL}/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data;
};

export const loginUser = async (credentials) => {
  const res = await axios.post(`${API_URL}/auth/login`, credentials);
  return res.data;
};

export const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}/auth/register`, userData);
  return res.data;
};

export const updateUserProfile = async (profileData) => {
  const res = await axios.put(`${API_URL}/auth/profile`, profileData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data;
};
