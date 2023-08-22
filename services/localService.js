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