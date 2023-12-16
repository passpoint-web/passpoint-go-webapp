import axios from "axios"
// import { setConfig } from '../restService';
// import functions from '@/utils/functions';
// import { enc } from 'crypto-js';
// const { returnBase64 } = functions
import { getCredentials } from "../localService"
const paymentRestAgent = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PAYMENT_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

const getRequestConfig = () => {
  const { merchantId } = getCredentials()
  return {
    headers: {
      "x-channel-id": 2,
      "x-channel-code": "passpoint-infra-user",
      "x-merchant-id": merchantId,
    },
    params: {},
  }
}
const username = process.env.NEXT_PUBLIC_PAYMENT_USERNAME
const password = process.env.NEXT_PUBLIC_PAYMENT_PASSWORD
// encode credentials in base64
const encode = btoa(`${username}:${password}`)
export const setConfig = () => {
  const config = getRequestConfig()
  config.headers.Authorization = `Basic ${encode}`
  return config
}

export const payment = {
  billPaymentHistory: ({ service, data }) => {
    return paymentRestAgent.post(
      `biller-app/bill-payment-history?serviceType=${service}`,
      data,
      setConfig()
    )
  },
  getCharges: (data) => {
    return paymentRestAgent.post(`biller-app/get-charges`, data, setConfig())
  },
  createFlightBooking: ({ flightId, passengers }) => {
    const data = { flightId, passengers }
    return paymentRestAgent.post(`biller-app/book-flight`, data, setConfig())
  },
}
