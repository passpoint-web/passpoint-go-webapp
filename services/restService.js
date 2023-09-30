import axios from 'axios';
import { getToken } from './localService';

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
	return restAgent.post('verifyUserOtp', data);
};

export const login = (data) => {
	return restAgent.post("login", data);
};

export const forgotPassword = (data) => {
	return restAgent.post("forgotPassword", data);
};

export const resetPassword = (data) => {
	return restAgent.post("resetPassword", data);
};

export const resendOtp = (data) => {
	return restAgent.post("resendOtp", data);
};

export const metrics = () => {
	const token = getToken()
	const config = getRequestConfig();
	config.headers.Authorization = `Bearer ${token}`;
	return restAgent.get("dashboardMetrics", config);
};

export const services = {
	getPrimaryServices: () => {
		const token = getToken()
		const config = getRequestConfig();
		config.headers.Authorization = `Bearer ${token}`;
		return restAgent.get('getPrimaryServices', config);
	},

}

// https://api.jessecoders.com/passpointGo/v1/getPrimaryServices
