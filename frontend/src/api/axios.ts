import axios from "axios";
import apiRequest from "./apiRequest";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ! HƏR REQUESTDƏN ƏVVƏL ACCESSTOKEN HEADER-A ƏLAVƏ EDİLİR...

axiosInstance.interceptors.request.use((config) => {
  const TOKEN = localStorage.getItem("accessToken");

  if (TOKEN) {
    config.headers.Authorization = `Bearer ${TOKEN}`;
  }
  return config;
});

// ! ACCESS TOKEN-NİN VAXTI BİTDİKDƏ REFRESH TOKEN İLE YENİ ACCESS TOKEN ƏLDƏ ETMƏK...

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");

      try {
        const res = await apiRequest({
          method: "POST",
          url: "/refresh-token",
          data: { token: refreshToken },
        });

        const newAccessToken = res.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);

        error.config.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance.request(error.config);
      } catch (err) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
