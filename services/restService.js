import axios from 'axios';

const restAgent = axios.create({
  baseURL: "https://api.jessecoders.com/passpointGo/v1/",
  headers: {
    'Content-Type': 'application/json'
  }
});

const getRequestConfig = () => {
  return {
    headers: {},
    params: {},
  };
};


export const registerUser = (path, data) => {
  return restAgent.post(path, data);
};

export const verifyEmailOtp = (data) => {
  return axios.post('verifyUserOtp', data);
};

export const login = (data) => {
  return restAgent.post("login", data);
};

export const forgotPassword = (data) => {
  return axios.post("forgotPassword", data);
};


export const resetPassword = (data) => {
  return axios.post("resetPassword", data);
};

export const resendOtp = (data) => {
  return restAgent.post("resendOtp", data);
};

// metrics
export const metrics = (token) => {
  const config = getRequestConfig();
  config.headers.Authorization = `Bearer ${token}`;
  return restAgent.get("dashboardMetrics", config);
};
