import axiosClient from "@/utils/axios";

const getRequestConfig = () => {
  return {
    headers: {},
    params: {},
  };
};

const axios = axiosClient()
const config = getRequestConfig();

// register user
export const registerUser = (path, data) => {
  return axios.post(path, data, config);
};

// sign in
export const login = (data) => {
  return axios.post("login", data, config);
};

// verify
export const resendOtp = (data) => {
  return axios.post("resendOtp", data, config);
};

// metrics
export const metrics = () => {
  return axios.get("dashboardMetrics", config);
};
