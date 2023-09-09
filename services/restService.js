import axiosClient from '@/utils/axios'
// import Router from 'next/router'
// import { useRouter } from 'next/router'
// const router = useRouter()
// axiosClient.interceptors.response.use(undefined, (error) => {
// 	const statusCode = error.response ? error.response.status : null
// 	console.log('error from api', statusCode)
// 	if (
// 		(statusCode && statusCode === 401) ||
//     (statusCode && statusCode === 403)
// 	) {
// 		Router.push('/auth/login')
// 	}
// })

const getRequestConfig = () => {
	return {
		headers: {},
		params: {}
	}
}

// register agent
export const registerUser = (data) => {
	const config = getRequestConfig()
	return axiosClient().post('onboardUser', data, config)
}