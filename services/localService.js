// setters
export const saveCredentials = (credentials) => {
	localStorage.setItem(
		'registration_cr3dentials',
		JSON.stringify(credentials)
	)
}

export const getCredentials = () => {
	if (typeof window !== 'undefined') {
		const credentials = localStorage.getItem('registration_cr3dentials')
		if (credentials !== 'undefined') {
			return JSON.parse(credentials)
		}
	}
}

export const saveUserType = (val) => {
	localStorage.removeItem('registration_cr3dentials')
	localStorage.setItem(
		'user_type',
		JSON.stringify(val)
	)
}
export const saveForgotPasswordEmail = (val) => {
	console.log(val)
	localStorage.setItem(
		'forgot_password_email',
		JSON.stringify(val)
	)
}

// getters
export const getUserType = () => {
	if (typeof window !== 'undefined') {
		const user_type = localStorage.getItem('user_type')
		if (user_type !== 'undefined') {
			return JSON.parse(user_type)
		}
	}
}
export const getForgotPasswordEmail = () => {
	if (typeof window !== 'undefined') {
		const forgot_password_email = localStorage.getItem('forgot_password_email')
		if (forgot_password_email !== 'undefined') {
			return JSON.parse(forgot_password_email)
		}
	}
}