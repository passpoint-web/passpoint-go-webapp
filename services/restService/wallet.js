import axios from 'axios';
// import { setConfig } from '../restService';
import functions from '@/utils/functions';
import { enc } from 'crypto-js';
const { returnBase64 } = functions
const walletRestAgent = axios.create({
	baseURL: "https://payment-sandbox.mypasspoint.com/passpoint-payserv/v1",
	headers: {
		'Content-Type': 'application/json'
	}
});

const getRequestConfig = () => {
	return {
		headers: {
			'x-channel-id' : 2,
			'x-channel-code' : 'passpoint-infra-user',
			'x-merchant-id' : '749ed60a-535d-4c04-a2a9-16d00f9aaa3a'
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

export const wallet = {
	createWallet: (data) => {
		return walletRestAgent.post('wallet-app/create-wallet/local', data, setConfig())
	},
	getWalletDetails: () => {
		return walletRestAgent.get('wallet-app/get-wallet-details', setConfig())
	},
	initiatePin: (boo=false) => {
		return walletRestAgent.get(`wallet-app/init-pin-reset?forgotpin=${boo}`, setConfig())
	},
	setPin: (data) => {
		return walletRestAgent.put(`wallet-app/reset-pin`, data, setConfig())
	}
}