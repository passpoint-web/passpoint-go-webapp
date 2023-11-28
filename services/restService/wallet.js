import axios from 'axios';
// import { setConfig } from '../restService';
// import functions from '@/utils/functions';
// import { enc } from 'crypto-js';
// const { returnBase64 } = functions
import { getCredentials } from '../localService';
const walletRestAgent = axios.create({
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

export const wallet = {
	createWallet: (data) => {
		return walletRestAgent.post('wallet-app/create-wallet/local', data, setConfig())
	},
	getWalletDetails: () => {
		return walletRestAgent.get('wallet-app/get-wallet-details', setConfig())
	},
	initiatePin: (val=false) => {
		return walletRestAgent.get(`wallet-app/init-pin-reset?forgotpin=${val}`, setConfig())
	},
	setPin: (data) => {
		return walletRestAgent.put(`wallet-app/reset-pin`, data, setConfig())
	},
	getBanks: (countryCode) => {
		return walletRestAgent.get(`ft-app/bank-list/${countryCode || 'NG'}`, setConfig())
	},
	accountEnquiry: (data) => {
		return walletRestAgent.post(`ft-app/account-enquiry`, data, setConfig())
	},

	passpointWalletEnquiry: (data) => {
		return walletRestAgent.post(`ft-app/passpoint-enquiry`, data, setConfig())
	},
	accountTransfer: (data) => {
		return walletRestAgent.post(`ft-app/account-transfer`, data, setConfig())
	},
	transactions: ({data, type}) => {
		return walletRestAgent.post(`ft-app/transaction-history?type=${type}`, data, setConfig())
	},
	allTransactions: ({data, type}) => {
		return walletRestAgent.post(`wallet-app/wallet-history?type=${type}`, data, setConfig())
	},
	payBills: (data) => {
		return walletRestAgent.post(`biller-app/pay-bills`, data, setConfig())
	},
}