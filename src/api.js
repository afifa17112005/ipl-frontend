import axios from "axios";

export const predictWin = async (data) => {
  const baseUrl = import.meta.env.VITE_API_URL.replace(/\/$/, ""); // Remove trailing slash if present
  const res = await axios.post(`${baseUrl}/predict`, data);
  return res.data;
};
