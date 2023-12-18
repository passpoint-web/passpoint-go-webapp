import axios from "axios"
import { getToken, setLogout, getCredentials } from "./localService"
// import cookies from '@/plugins/cookies';
// eslint-disable-next-line no-unused-vars
const restAgent = axios.create({
  baseURL: process.env.NEXT_PUBLIC_USERMGT_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

const kycBvnRestAgent = axios.create({
  baseURL: process.env.NEXT_PUBLIC_KYC_USERMGT_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})
const flightRestAgent = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FLIGHTS_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

const notifyAndAccessRestAgent = axios.create({
  baseURL: "https://passpoint-go-app-qa-5na2.onrender.com/v1/",
  headers: {
    "Content-Type": "application/json",
  },
})

const getRequestConfig = () => {
  return {
    headers: {},
    params: {},
  }
}

restAgent.interceptors.response.use(undefined, (error) => {
  const statusCode = error.response ? error.response.status : null
  if (statusCode && statusCode === 401) {
    setLogout()
    if (!window.location.pathname.includes("/auth/login")) {
      window.location.href = `/auth/login?fallBackUrl=${window.location.pathname}`
    }
  }
  return Promise.reject(error)
})

export const setConfig = () => {
  const token = getToken()
  // console.log(cookies.get('token'))
  const config = getRequestConfig()
  config.headers.Authorization = `Bearer ${token}`
  return config
}

const setTravelConfig = () => {
  // const token = getToken()
  // console.log(cookies.get('token'))
  const config = getRequestConfig()
  config.headers.Authorization = `Bearer 123`
  return config
}

const setKycBvnConfig = () => {
  const { merchantId } = getCredentials()
  const username = process.env.NEXT_PUBLIC_PAYMENT_USERNAME
  const password = process.env.NEXT_PUBLIC_PAYMENT_PASSWORD
  const token = `${username}:${password}`
  const encodedToken = btoa(token)
  const config = getRequestConfig()
  config.headers.Authorization = `Basic ${encodedToken}`
  config.headers["x-channel-id"] = process.env.NEXT_PUBLIC_PAYMENT_CHANNEL_ID
  config.headers["x-channel-code"] =
    process.env.NEXT_PUBLIC_PAYMENT_CHANNEL_CODE
  config.headers["x-merchant-id"] = merchantId

  return config
}

export const registerUser = (path, data) => {
  return restAgent.post(path, data)
}

export const verifyEmailOtp = (data) => {
  return restAgent.post("verifyUserOtp", data)
}

export const login = (data) => {
  return restAgent.post("login", data)
}

export const forgotPassword = (data) => {
  return restAgent.post("forgotPassword", data)
}

export const resetPassword = (data) => {
  return restAgent.post("resetPassword", data)
}

export const resendOtp = (data, endpoint) => {
  return restAgent.post(endpoint || "resendOtp", data)
}

export const authenticate = {
  registerUser: (path, data) => {
    return restAgent.post(path, data)
  },
  checkBusinessName: (data) => {
    return restAgent.post("checkBusinessName", data)
  },

  verifyEmailOtp: (data) => {
    return restAgent.post("verifyUserOtp", data)
  },

  login: (data) => {
    return restAgent.post("login", data)
  },

  forgotPassword: (data) => {
    return restAgent.post("forgotPassword", data)
  },

  resetPassword: (data) => {
    return restAgent.post("resetPassword", data)
  },

  resendOtp: (data) => {
    return restAgent.post("resendOtp", data)
  },
  validate2faOtp: (data) => {
    return restAgent.post("validate2faOtp", data)
  },
}

export const metrics = () => {
  return restAgent.get("dashboardMetrics", setConfig())
}

export const publicProfile = {
  getPublicProfile: () => {
    return restAgent.get("getPublicProfile", setConfig())
  },
  getPrimaryServices: () => {
    return restAgent.get("getPrimaryServices", setConfig())
  },
  uploadBusinessLogo: (data) => {
    return restAgent.post("publicProfileBusinessLogo", data, setConfig())
  },
  businessDescription: (data) => {
    return restAgent.post("publicProfileBusinessDesc", data, setConfig())
  },
  deleteBusinessDescription: (data) => {
    return restAgent.post("deleteBusinessDesc", data, setConfig())
  },
  addServices: (data) => {
    return restAgent.post("publicProfileAddServices", data, setConfig())
  },
  deleteService: (data) => {
    return restAgent.post("deleteService", data, setConfig())
  },
  contact: (data) => {
    return restAgent.post("publicProfileContactDetails", data, setConfig())
  },
  deleteSocial: (data) => {
    return restAgent.post("deleteSocials", data, setConfig())
  },
}

export const kycBvn = {
  verifyBvn: (data) => {
    return kycBvnRestAgent.post("verify-id", data, setKycBvnConfig())
  },
  confirmBvn: (data) => {
    return kycBvnRestAgent.post(
      "confirm-bvn-verification",
      data,
      setKycBvnConfig()
    )
  },
}

export const kyc = {
  getKycDetails: () => {
    return restAgent.get("getKycDetails", setConfig())
  },
  verifyBvn: (data) => {
    return restAgent.post("verifyBvn", data, setConfig())
  },
  uploadKycIdentity: (data) => {
    return restAgent.post("kycProofCooperateIdentity", data, setConfig())
  },
  uploadKycAddress: (data) => {
    return restAgent.post("kycProofCooperateAddress", data, setConfig())
  },
  uploadKycBusiness: (data) => {
    return restAgent.post("kycProofCooperateURL", data, setConfig())
  },
  uploadKycOwnership: (data) => {
    return restAgent.post("kycProofCooperateOwnership", data, setConfig())
  },
  uploadIndIdentity: (data) => {
    return restAgent.post("kycProofIndividualIdentity", data, setConfig())
  },
  uploadIndAddress: (data) => {
    return restAgent.post("kycProofIndividualAddress", data, setConfig())
  },
}
export const accountProfile = {
  changePassword: (data) => {
    return restAgent.post("changeAccountPassword", data, setConfig())
  },
  getAccountActivity: () => {
    return restAgent.get("getActivities", setConfig())
  },
  getUserDetails: () => {
    return restAgent.get("getUserDetails", setConfig())
  },
}

export const travel = {
  // getFlightBookings: (params) => {
  //   const config = setTravelConfig()
  //   config.params = params
  //   return flightRestAgent.get("flight/bookings", config)
  // },
  getFlightBookings: (params) => {
    const config = setTravelConfig()
    config.params = params
    return flightRestAgent.get("flight/bookings", config)
  },
  getFlightBooking: (bookingRef) => {
    return flightRestAgent.post(
      `flight/bookingdetails?bookingReference=${bookingRef}`,
      setTravelConfig()
    )
  },
  getAirports: (page = 0, pageSize = 10000, searchParam = "") => {
    return flightRestAgent.get(
      `airports/airports?page=${page}&pageSize=${pageSize}&searchParam=${searchParam}`,
      setTravelConfig()
    )
  },
  getAirlines: (page = 0, pageSize = 10000, searchParam = "") => {
    return flightRestAgent.get(
      `airports/airlines?page=${page}&pageSize=${pageSize}&searchParam=${searchParam}`,
      setTravelConfig()
    )
  },
  searchFlights: (queryParams) => {
    return flightRestAgent.post(
      `flight/searchflight?adults=${queryParams.adults}&cabin=${queryParams.cabin}&children=${queryParams.children}&departureDate=${queryParams.departureDate}&destination=${queryParams.destination}&infants=${queryParams.infants}&origin=${queryParams.origin}&returnDate=${queryParams.returnDate}`,
      setTravelConfig()
    )
  },
  createFlightBooking: (requestBody) => {
    return flightRestAgent.post(
      "/flight/flightbooking",
      requestBody,
      setTravelConfig()
    )
  },
  confirmFlightPrice: (queryParams) => {
    return flightRestAgent.post(
      `/flight/confirmprice?flightId=${queryParams.flightId}`,
      setTravelConfig()
    )
  },
  cancelBooking: (queryParams) => {
    return flightRestAgent.post(
      `/flight/cancelbooking?bookingReference=${queryParams.bookingReference}`,
      setTravelConfig()
    )
  },
}

export const notifyAndAccess = {
  getNotifications: () => {
    return notifyAndAccessRestAgent.get("notify/page", setConfig())
  },
}

export const security = {
  getTuEfAyDetails: () => {
    return restAgent.get("/get2faDetails", setConfig())
  },
  validatePassword: (data) => {
    return restAgent.post("/validatePassword", data, setConfig())
  },
  verifyTuEfAy: (data) => {
    return restAgent.post("/update2faOtp", data, setConfig())
  },
  updateTuEfAyStatus: (data) => {
    return restAgent.post("/update2faStaus", data, setConfig())
  },
}

export const teams = {
  getPermissions: () => {
    return restAgent.get("/getPermission", setConfig())
  },
  getRoles: () => {
    return restAgent.get("/getTeamRoles", setConfig())
  },
  createRole: (data) => {
    return restAgent.post("/createNewRole", data, setConfig())
  },
}
