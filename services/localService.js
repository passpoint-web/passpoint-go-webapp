// setters
export const saveCredentials = (email, password) => {
	localStorage.setItem(
		'registration_cr3dentials',
		JSON.stringify({
			email,
			password
		})
	)
}

export const saveUserType = (val) => {
	localStorage.setItem(
		'user_type',
		JSON.stringify(val)
	)
}

// getters
export const getUserType = () => {
	if (typeof window !== 'undefined') {
		const user_type = localStorage.getItem('user_type')
		return JSON.parse(user_type)
	}
}