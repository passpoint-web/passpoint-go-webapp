import axios from 'axios'

const axiosClient = () => {
	return axios.create({
		baseURL: 'https://api.jessecoders.com/passpointGo/v1/',
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

export default axiosClient
