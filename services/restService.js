import axios from 'axios';
import { getToken } from './localService';
// import { Redirect } from 'next';

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


const setConfig = () => {
	const token = getToken()
	const config = getRequestConfig();
	config.headers.Authorization = `Bearer ${token}`
	return config
}

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

export const authenticate = {
	registerUser : (path, data) => {
		return restAgent.post(path, data);
	},
	
	verifyEmailOtp : (data) => {
		return restAgent.post('verifyUserOtp', data);
	},
	
	login : (data) => {
		return restAgent.post("login", data);
	},
	
	forgotPassword : (data) => {
		return restAgent.post("forgotPassword", data);
	},
	
	resetPassword : (data) => {
		return restAgent.post("resetPassword", data);
	},
	
	resendOtp : (data) => {
		return restAgent.post("resendOtp", data);
	}
}

export const metrics = () => {
	return restAgent.get("dashboardMetrics", setConfig());
};

export const publicProfile = {
	getPrimaryServices: () => {
		return restAgent.get('getPrimaryServices', setConfig());
	},
	uploadBusinessLogo: (data) => {
		return restAgent.post('publicProfileBusinessLogo', data, setConfig());
	},
	businessDescription: (data) => {
		return restAgent.post('publicProfileBusinessDesc', data, setConfig());
	},
	addServices: (data) => {
		return restAgent.post('publicProfileAddServices', data, setConfig());
	},
	contact: (data) => {
		return restAgent.post('publicProfileContactDetails', data, setConfig());
	},
}

// https://api.jessecoders.com/passpointGo/v1/getPrimaryServices
