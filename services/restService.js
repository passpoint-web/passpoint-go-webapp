import axiosClient from "@/utils/axios";

const getRequestConfig = () => {
  return {
    headers: {},
    params: {},
  };
};

const axios = axiosClient()
const config = getRequestConfig();

export const registerUser = (path, data) => {
  return axios.post(path, data, config);
};

export const verifyEmailOtp = (data) => {
  return axios.post('verifyUserOtp', data, config);
};

export const login = (data) => {
  return axios.post("login", data, config);
};

export const forgotPassword = (data) => {
  return axios.post("forgotPassword", data, config);
};


export const resetPassword = (data) => {
  return axios.post("resetPassword", data, config);
};

export const resendOtp = (data) => {
  return axios.post("resendOtp", data, config);
};

// metrics
export const metrics = () => {
  return axios.get("dashboardMetrics", config);
};
