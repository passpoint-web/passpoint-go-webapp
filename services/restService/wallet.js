import axios from "axios"
import { getCredentials } from "../localService"
const walletRestAgent = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PAYMENT_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

const getRequestConfig = () => {
  const { merchantId } = getCredentials()
  return {
    headers: {
      "x-channel-id": process.env.NEXT_PUBLIC_PAYMENT_CHANNEL_ID,
      "x-channel-code": process.env.NEXT_PUBLIC_PAYMENT_CHANNEL_CODE,
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

export const wallet = {
  createWallet: (data) => {
    return walletRestAgent.post(
      "wallet-app/create-wallet/local",
      data,
      setConfig()
    )
  },
  createForeignWallet: (data) => {
    return walletRestAgent.post(
      "wallet-app/create-wallet/foreign",
      data,
      setConfig()
    )
  },
  getWalletDetails: () => {
    return walletRestAgent.get("wallet-app/get-wallet-details", setConfig())
  },
  getWalletBalance: (currency) => {
    return walletRestAgent.get(
      `wallet-app/get-wallet-balance/${currency}`,
      setConfig()
    )
  },
  initiatePin: (val = false) => {
    return walletRestAgent.get(
      `wallet-app/init-pin-reset?forgotpin=${val}`,
      setConfig()
    )
  },
  setPin: (data) => {
    return walletRestAgent.put(`wallet-app/reset-pin`, data, setConfig())
  },
  getBanks: (countryCode) => {
    return walletRestAgent.get(
      `ft-app/bank-list/${countryCode || "NG"}`,
      setConfig()
    )
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
  transactions: ({ data, type }) => {
    return walletRestAgent.post(
      `ft-app/transaction-history?type=${type}`,
      data,
      setConfig()
    )
  },
  allTransactions: ({ data, type }) => {
    return walletRestAgent.post(
      `wallet-app/wallet-history?type=${type}`,
      data,
      setConfig()
    )
  },
  payBills: (data) => {
    return walletRestAgent.post(`biller-app/pay-bills`, data, setConfig())
  },
  getCurrencies: () => {
    return walletRestAgent.get(
      "wallet-app/currency-list?type=fiat&filter=no",
      setConfig()
    )
  },
  /**
   * Endpoint to get conversation rates between two currencies
   * Also doubles as endpoint to get fees from a transaction (only when the [data.amount] is included)
   * @param {*} data
   */
  getExchangeRateOrFees: (data) => {
    return walletRestAgent.post("ft-app/get-rate", data, setConfig())
  },
  convertFunds: (data) => {
    return walletRestAgent.post("ft-app/convert-funds", data, setConfig())
  },
  getMomoCollectionCurrencies: () => {
    return walletRestAgent.get(
      "ft-app/currency-list/momo?type=collection",
      setConfig()
    )
  },
  getMomoCollectionNetworks: (currency) => {
    return walletRestAgent.get(
      `momo-app/momo-networks/${currency}?type=collection`,
      setConfig()
    )
  },
  momoRequestToPay: (data) => {
    return walletRestAgent.post("momo-app/request-payment", data, setConfig())
  },
  momoValidateMsisdn: (msisdn) => {
    return walletRestAgent.get(
      `momo-app/validate-msisdn?msisdn=${msisdn}`,
      setConfig()
    )
  },
  momoTransfer: (data) => {
    return walletRestAgent.post(`momo-app/transfer`, data, setConfig())
  },
}
