import axios from "axios"
import { getToken } from "@/services/localService";

const axiosClient = () => {
  const token = getToken()
  return axios.create({
    baseURL: "https://api.jessecoders.com/passpointGo/v1/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// axiosClient.interceptors.request.use((config) => {
//   config.headers["Authorization"] = `Bearer ${localStorage.getItem("goToken")}`;
//   return config;
// });

export default axiosClient;
