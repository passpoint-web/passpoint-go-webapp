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
			// console.log(credentials)
			return JSON.parse(credentials)
		}
	}
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
		if (user_type !== 'undefined') {
			return JSON.parse(user_type)
		}
	}
}