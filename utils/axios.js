import axios from "axios"

const axiosClient = () => {
  let token = ''
  if (typeof window !== 'undefined') {
    token = localStorage.getItem("goToken")
  }
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
