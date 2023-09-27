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


// register user
export const registerUser = (path, data) => {
  return restAgent.post(path, data);
};

// sign in
export const login = (data) => {
  return restAgent.post("login", data);
};

// verify
export const resendOtp = (data) => {
  return restAgent.post("resendOtp", data);
};

// metrics
export const metrics = (token) => {
  const config = getRequestConfig();
  config.headers.Authorization = `Bearer ${token}`;
  return restAgent.get("dashboardMetrics", config);
};
