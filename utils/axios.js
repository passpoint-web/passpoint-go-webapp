import axios from "axios";

const axiosClient = () => {
  return axios.create({
    baseURL: "/" 
  });
}

export default axiosClient
