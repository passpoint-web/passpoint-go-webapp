import axios from "axios"

const axiosClient = () => {
  return axios.create({
    baseURL: "https://api.jessecoders.com/passpointGo/v1/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("goToken")}`,
    },
  });
};

// axiosClient.interceptors.request.use((config) => {
//   config.headers["Authorization"] = `Bearer ${localStorage.getItem("goToken")}`;
//   return config;
// });

export default axiosClient;
