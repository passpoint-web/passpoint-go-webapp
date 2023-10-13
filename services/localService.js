
// import cookiesFunc from "@/plugins/cookies"
// const cookies = cookiesFunc()
// setters
export const saveCredentials = (credentials) => {
	localStorage.setItem("registration_cr3dentials", JSON.stringify(credentials));
};

export const getCredentials = () => {
	if (typeof window !== "undefined") {
		const credentials = localStorage.getItem("registration_cr3dentials");
		if (credentials !== "undefined") {
			return JSON.parse(credentials);
		}
	}
};

export const saveUserType = (val) => {
	localStorage.removeItem("registration_cr3dentials");
	localStorage.setItem("user_type", JSON.stringify(val));
};

export const getUserType = () => {
	if (typeof window !== "undefined") {
		const user_type = localStorage.getItem("user_type");
		if (user_type !== "undefined") {
			return JSON.parse(user_type);
		}
	}
};

export const saveForgotPasswordEmail = (val) => {
	if (val) {
		localStorage.setItem("forgot_password_email", JSON.stringify(val));
	} else {
		localStorage.removeItem("forgot_password_email");
	}
};

export const getForgotPasswordEmail = () => {
	if (typeof window !== "undefined") {
		const forgot_password_email = localStorage.getItem("forgot_password_email");
		if (forgot_password_email !== "undefined") {
			return JSON.parse(forgot_password_email);
		}
	}
};

export const saveToken = (val) => {
	if (val) {
		localStorage.setItem("token", JSON.stringify(val));
	} else {
		localStorage.removeItem("token");
	}
};
// export const saveToken = (val) => {
// 	if (val) {
// 		cookies.set('token', val)
// 	}
// };

export const getToken = () => {
	if (typeof window !== "undefined") {
		const token = localStorage.getItem("token");
		if (token !== "undefined") {
			return JSON.parse(token);
		}
	}
};
// export const getToken = () => {
// 	const token = cookies.get("token");
// 	if (typeof window !== "undefined") {
// 		if (token !== "undefined") {
// 			return token
// 		}
// 	}
// };

export const removeToken = () => {
	if (typeof window !== "undefined") {
		localStorage.removeItem("token");
		// cookies.remove('token', '')
		removePublicProfile()
	}
};


export const savePublicProfile = (val) => {
	localStorage.setItem("public_profile", JSON.stringify(val));
};

export const getPublicProfile = () => {
	if (typeof window !== "undefined") {
		const val = localStorage.getItem("public_profile");
		if (val !== "undefined") {
			return JSON.parse(val);
		}
	}
};

export const removePublicProfile = () => {
	if (typeof window !== "undefined") {
		localStorage.removeItem("public_profile")
	}
};