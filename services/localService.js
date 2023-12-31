// import cookiesFunc from "@/plugins/cookies"
// const cookies = cookiesFunc()
// setters
const save2Local=(keyName, val)=>{
	if (typeof window !== "undefined") {
		localStorage.setItem(keyName, JSON.stringify(val))
	}
}

const get4rmLocal=(keyName)=>{
	if (typeof window !== "undefined") {
		const val = localStorage.getItem(keyName)
		if (val !== "undefined") {
			return JSON.parse(val)
		}
		return null
	}
}

export const remove4rmLocal = (keyName) => {
	if (typeof window !== "undefined") {
		localStorage.removeItem(keyName)
	}
}

export const saveCredentials = (credentials) => {
	localStorage.setItem("registration_cr3dentials", JSON.stringify(credentials));
};

export const getCredentials = () => {
	if (typeof window !== "undefined") {
		const credentials = localStorage.getItem("registration_cr3dentials")
		if (credentials !== "undefined") {
			return JSON.parse(credentials)
		}
	}
}

export const saveUserType = (val) => {
	localStorage.removeItem("registration_cr3dentials")
	localStorage.setItem("user_type", JSON.stringify(val))
}

export const getUserType = () => {
	if (typeof window !== "undefined") {
		const user_type = localStorage.getItem("user_type")
		if (user_type !== "undefined") {
			return JSON.parse(user_type)
		}
	}
}

export const saveForgotPasswordEmail = (val) => {
	if (val) {
		localStorage.setItem("forgot_password_email", JSON.stringify(val))
	} else {
		localStorage.removeItem("forgot_password_email")
	}
}

export const getForgotPasswordEmail = () => {
	if (typeof window !== "undefined") {
		const forgot_password_email = localStorage.getItem("forgot_password_email")
		if (forgot_password_email !== "undefined") {
			return JSON.parse(forgot_password_email)
		}
	}
}

export const saveToken = (val) => {
	if (val) {
		localStorage.setItem("token", JSON.stringify(val))
	} else {
		localStorage.removeItem("token")
	}
}
// export const saveToken = (val) => {
// 	if (val) {
// 		cookies.set('token', val)
// 	}
// };

export const getToken = () => {
	if (typeof window !== "undefined") {
		const token = localStorage.getItem("token")
		if (token !== "undefined") {
			return JSON.parse(token)
		}
	}
}
// export const getToken = () => {
// 	const token = cookies.get("token");
// 	if (typeof window !== "undefined") {
// 		if (token !== "undefined") {
// 			return token
// 		}
// 	}
// };

export const setLogout = () => {
	if (typeof window !== "undefined") {
		localStorage.removeItem("token");
		// cookies.remove("token", "");
		localStorage.removeItem("registration_cr3dentials")
		removePublicProfile();
		removeKycDetails();
	}
};


export const saveKycDetails = (val) => {
	localStorage.setItem("kyc_details", JSON.stringify(val));
};

export const getKycDetails = () => {
	if (typeof window !== "undefined") {
		const val = localStorage.getItem("kyc_details");
		if (val !== "undefined") {
			return JSON.parse(val);
		}
	}
};

export const removeKycDetails = () => {
	if (typeof window !== "undefined") {
		localStorage.removeItem("kyc_details");
	}
};
export const removeToken = () => {
	if (typeof window !== "undefined") {
		localStorage.removeItem("token")
		// cookies.remove('token', '')
		removePublicProfile()
	}
}

export const savePublicProfile = (val) => {
	localStorage.setItem("public_profile", JSON.stringify(val));
};

export const getPublicProfile = () => {
	if (typeof window !== "undefined") {
		const val = localStorage.getItem("public_profile")
		if (val !== "undefined") {
			return JSON.parse(val)
		}
	}
}

export const removePublicProfile = () => {
	if (typeof window !== "undefined") {
		localStorage.removeItem("public_profile")
	}
}

export const setAirportsState = (val) => {
	if (typeof window !== "undefined") {
		localStorage.setItem("airports", JSON.stringify(val))
	}
}

export const getAirportsState = () => {
	if (typeof window !== "undefined") {
		const val = localStorage.getItem("airports")
		if (val !== "undefined") {
			return JSON.parse(val)
		}
		return null
	}
}

export const setMostRecentFlightSearchURL = (val) => {
	if (typeof window !== "undefined") {
		localStorage.setItem("flightSearchURL", JSON.stringify(val))
	}
}

export const getMostRecentFlightSearchURL = () => {
	if (typeof window !== "undefined") {
		const val = localStorage.getItem("flightSearchURL")
		if (val !== "undefined") {
			return JSON.parse(val)
		}
		return null
	}
}

export const setSelectedFlight = (val) => {
	if (typeof window !== "undefined") {
		localStorage.setItem("selectedFlight", JSON.stringify(val))
	}
}

export const getSelectedFlight = () => {
	if (typeof window !== "undefined") {
		const val = localStorage.getItem("selectedFlight")
		if (val !== "undefined") {
			return JSON.parse(val)
		}
		return null
	}
}

// wallets

export const  saveWalletState = (val) => save2Local('wallet_state', val)

export const getWalletState = () => get4rmLocal('wallet_state')

export const  saveBanks = (val) => save2Local('available_banks', val)

export const getBanks = () => get4rmLocal('available_banks')

export const  savePinCreated = (val) => save2Local('pin_created', val)

export const getPinCreated = () => get4rmLocal('pin_created')

export const saveTuEfAyToken = (val) => save2Local('tuEfAyToken', val)

export const getTuEfAyToken = () => get4rmLocal('tuEfAyToken')