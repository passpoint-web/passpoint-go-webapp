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


export const getUserType = () => {
	if (typeof window !== 'undefined') {
		const user_type = localStorage.getItem('user_type')
		if (user_type !== 'undefined') {
			return JSON.parse(user_type)
		}
	}
}

export const saveToken = (val) => {
	if (val) {
		localStorage.setItem(
			'token',
			JSON.stringify(val)
		)
	} else {
		localStorage.removeItem('token')
	}
}


export const getToken = () => {
	if (typeof window !== 'undefined') {
		const token = localStorage.getItem('token')
		if (token !== 'undefined') {
			return JSON.parse(token)
		}
	}
}