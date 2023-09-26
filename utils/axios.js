import axios from "axios"
// import {cookie} from 'next/headers'
const axiosClient = () => {
  return axios.create({
    baseURL: "https://api.jessecoders.com/passpointGo/v1/",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${cookie.get('token')}`,
    },
  });
};

// axiosClient.interceptors.request.use((config) => {
//   config.headers["Authorization"] = `Bearer ${localStorage.getItem("goToken")}`;
//   return config;
// });

export default axiosClient;
