import axios from 'axios';
// import { setConfig } from '../restService';
// import functions from '@/utils/functions';
// import { enc } from 'crypto-js';
// const { returnBase64 } = functions
import { getCredentials } from '../localService';
const paymentRestAgent = axios.create({
	baseURL: "https://payment-sandbox.mypasspoint.com/passpoint-payserv/v1",
	headers: {
		'Content-Type': 'application/json'
	}
});

const getRequestConfig = () => {
	const {merchantId} = getCredentials()
	return {
		headers: {
			'x-channel-id' : 2,
			'x-channel-code' : 'passpoint-infra-user',
			'x-merchant-id' : merchantId
		},
		params: {},
	};
};
const username = 'PVTL3CYSKG'
const password = '-Zi-pIyZX9Udr0ms-13mS4Z6PcGuzLdvYC9VRgq6'
// encode credentials in base64
const encode = btoa(`${username}:${password}`)
export const setConfig = () => {
	const config = getRequestConfig();
	config.headers.Authorization = `Basic ${encode}`
	return config
}

export const payment = {
	
	billPaymentHistory: ({service, data}) => {
		return paymentRestAgent.post(`biller-app/bill-payment-history?serviceType=${service}`, data, setConfig())
	},
}