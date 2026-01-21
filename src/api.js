import axios from "axios";

export const predictWin = async (data) => {
  const res = await axios.post("http://127.0.0.1:8000/predict", data);
  return res.data;
};
