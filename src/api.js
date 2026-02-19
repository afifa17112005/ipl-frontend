import axios from "axios";

export const predictWin = async (data) => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/predict`, data);
  return res.data;
};
