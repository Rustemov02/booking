import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "",
  timeout: 10000,
  headers: {
    "Content-type": "application/json",
  },
});

export default axiosInstance;
