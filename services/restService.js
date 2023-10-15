import axios from 'axios';
import { getToken } from './localService';
// import cookies from '@/plugins/cookies';
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

// restAgent.interceptors.response.use(undefined, (error) => {
// 	const statusCode = error.response ? error.response.status : null;
// 	console.log('Inte', statusCode);
// 	if (
// 		(statusCode && statusCode === 401) ||
//     (statusCode && statusCode === 403)
// 	) {
// 		// Redirect('/auth/login');
// 	}
// });


const setConfig = () => {
	const token = getToken()
	// console.log(cookies.get('token'))
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
	getPublicProfile: () => {
		return restAgent.get('getPublicProfile', setConfig());
	},
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
	deleteService: (data) => {
		return restAgent.post('deleteService', data, setConfig());
	},
	contact: (data) => {
		return restAgent.post('publicProfileContactDetails', data, setConfig());
	},
}

<<<<<<< HEAD

export const kyc = {
	uploadKycIdentity: (data) => {
		return restAgent.post('kycProofCooperateIdentity', data, setConfig());
	},
	uploadKycAddress: (data) => {
		return restAgent.post('kycProofCooperateAddress', data, setConfig());
	},
	uploadKycBusiness: (data) => {
		return restAgent.post('kycProofCooperateURL', data, setConfig());
	},
	uploadIndIdentity: (data) => {
		return restAgent.post('kycProofIndividualIdentity', data, setConfig());
	},
	uploadAddress: (data) => {
		return restAgent.post('kycProofIndividualAddress', data, setConfig());
	},
}
=======
export const accountProfile = {
	changePassword: (data) => {
		return restAgent.post('changeAccountPassword', data,  setConfig());
	},
}

>>>>>>> 16539c30b8c2312fc7a6dedc40f34192530b8ade
// https://api.jessecoders.com/passpointGo/v1/getPrimaryServices
