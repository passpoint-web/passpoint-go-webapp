import axiosClient from '@/utils/axios'

const getRequestConfig = () => {
	return {
		headers: {},
		params: {}
	}
}

// register user
export const registerUser = (path, data) => {
	const config = getRequestConfig()
	return axiosClient().post(path, data, config)
}

// sign in
export const login = (data) => {
	const config = getRequestConfig()
	return axiosClient().post('login', data, config)
}