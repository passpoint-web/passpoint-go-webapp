// import CryptoJS from 'crypto-js'

import { getAirportsState } from "@/services/localService"

function number(num, precision) {
  const n = num ? num.toFixed(precision || 0) : num
  let value = `${n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`
  // return sym ? (position === 'pre' ? `${sym} ${value}` : `${value} ${sym}`) : value
  return value
}

function formatMoney(num, currency, precision) {
  const n = num ? Number(num).toFixed(precision || 2) : Number(num)
  return n
    ? `${currency === "USD" ? "$" : currency === "NGN" ? "₦" : "#"}${n
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`
    : `${currency === "USD" ? "$" : currency === "NGN" ? "₦" : "#"}0.00`
}
const createUrl = (pathname, params) => {
  const paramsString = params.toString()
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`

  return `${pathname}${queryString}`
}

function currencySymbol(currency) {
  return currency === "USD" ? "$" : currency === "NGN" ? "₦" : "#"
}

function dateTimestamp(timestamp) {
  const dateString = new Date(timestamp).toDateString()
  return dateString.replace(" ", ", ")
}

function sortAlphabetically(array, key) {
  array.sort((a, b) => {
    const state = a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0
    return state
  })
  return array
}

// function encryptData(data, key) {
//   data = JSON.stringify(data)
//   const encrypted = CryptoJS.AES.encrypt(data, key)
//   return encrypted.toString()
// }

// function decryptData(data, key) {
//   const decryptedData = CryptoJS.AES.decrypt(data, key)
//   return JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8))
// }

function lastFourDigits(number) {
  const stringify = number.toString()
  const ccNumberWithoutFirstNumber = stringify.slice(12, stringify.length)
  const maskedNumber = ccNumberWithoutFirstNumber.padStart(
    stringify.length,
    "*"
  )
  return maskedNumber
}

function maskedEmail(target) {
  const email = target
  let hiddenEmail = ""
  for (let i = 0; i < email.length; i++) {
    if (i > 2 && i < email.indexOf("@")) {
      hiddenEmail += "*"
    } else {
      hiddenEmail += email[i]
    }
  }
  return hiddenEmail
}

function getDaysDifference(dateStringThen, dateStringNow) {
  const thenDate = new Date(dateStringThen)
  const nowDate = new Date(dateStringNow)
  const difference = nowDate.getTime() - thenDate.getTime()

  return Math.round(difference / (1000 * 3600 * 24))
}
function truncateString(str) {
  if (str.length <= 12) {
    return str
  }
  return str.slice(0, 12) + "..."
}

function validEmail(email) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(String(email).toLowerCase())
}

function getMonth(index) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  return months[index - 1]
}
function isValidUrl(url) {
  if (
    // eslint-disable-next-line no-useless-escape
    url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    )
  ) {
    return true
  }
  return false
}

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

const returnBase64 = async (file) => {
  try {
    const result = await toBase64(file)
    return result
  } catch (error) {
    console.error(error)
    return
  }
}

const splitOnCapsLetter = (string) => {
  let str = string
  str = str[0].toUpperCase() + str.slice(1) // incase the first letter is not in caps
  str = str.split(/(?=[A-Z])/)
  str = str.join(" ")
  // console.log(str)
  return str.split(/(?=[A-Z])/)
}

const removeDuplicates = (arr, key) => {
  let newArray = []
  let uniqueObject = {}
  for (let i in arr) {
    let objTitle = arr[i][key]
    uniqueObject[objTitle] = arr[i]
  }

  for (let i in uniqueObject) {
    newArray.push(uniqueObject[i])
  }

  return newArray
}

const makeNumArr = (num) => new Array(num).fill("").map((_, i) => i + 1)

function convertMinutesToHHMM(minutesString) {
  const minutes = parseInt(minutesString, 10)

  if (isNaN(minutes)) {
    return "Invalid input"
  }

  // Calculate the hours and minutes
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  // Format the result as "00h00m"
  const formattedHours = hours.toString().padStart(2, "0")
  const formattedMinutes = remainingMinutes.toString().padStart(2, "0")

  return `${formattedHours}h${formattedMinutes}m`
}

function formatCustomTime(dateString) {
  // Create a Date object from the input date string
  const date = new Date(dateString)

  if (isNaN(date)) {
    return "Invalid date"
  }

  // Get the hours and minutes from the Date object
  const hours = date.getHours()
  const minutes = date.getMinutes()

  // Determine whether it's AM or PM
  const amOrPm = hours >= 12 ? "PM" : "AM"

  // Convert hours to 12-hour format and zero-pad minutes
  const formattedHours = (hours % 12 || 12).toString().padStart(2, "0")
  const formattedMinutes = minutes.toString().padStart(2, "0")

  // Create the final formatted time string
  return `${formattedHours}:${formattedMinutes}${amOrPm}`
}

function convertTo12HourFormat(hour) {
  if (hour < 0 || hour > 23) {
    return "Invalid input"
  }

  const isPM = hour >= 12
  const hour12 = isPM ? (hour === 12 ? 12 : hour - 12) : hour === 0 ? 12 : hour
  const period = isPM ? "PM" : "AM"

  const hourStr = hour12.toString().padStart(2, "0") // Ensure two-digit format
  const minuteStr = "00" // Initialize minutes as "00" for the format

  return `${hourStr}:${minuteStr} ${period}`
}

function getFormattedAirportByIata(iata) {
  const airports = getAirportsState()
  if (airports) {
    return `${
      airports?.find((airport) => airport.iataCode === iata)?.city
    } (${iata})`
  }
  return iata
}

function maskValue(num) {
  // eslint-disable-next-line no-unused-vars
  const str = num?.toString()?.split("")
  // return str.map((_x)=> '*').join('') +' **'
  return "**** **"
}

function eighteenYearsAgo() {
  // Calculate the date that is 18 years ago from the current date
  const currentDate = new Date()
  const eighteenYearsAgo = new Date(currentDate)
  eighteenYearsAgo.setFullYear(currentDate.getFullYear() - 18)
  const formatted18YearsAgo = eighteenYearsAgo.toLocaleDateString()?.split("/")
  const maxDate = `${formatted18YearsAgo[2]}-${
    formatted18YearsAgo[0] > 9 ? "" : "0"
  }${formatted18YearsAgo[0]}-${formatted18YearsAgo[1] > 9 ? "" : "0"}${
    formatted18YearsAgo[1]
  }`
  // console.log(maxDate)
  return maxDate
}

function formattedTodayDate(dateParam, subtract = false) {
  let date = new Date(dateParam)
  date.setDate(subtract ? date.getDate() - 1 : date.getDate() + 1)
  date = date.toLocaleDateString()?.split("/")
  return `${date[2]}-${date[0] > 9 ? "" : "0"}${date[0]}-${
    date[1] > 9 ? "" : "0"
  }${date[1]}`
}

function maskedPhoneNo(number) {
  // Check if the input number is valid
  if (!number || number.length !== 11) {
    throw new Error("Number must be exactly 11 digits long.")
  }
  const firstThree = number.substring(0, 3)
  const lastThree = number.substring(number.length - 3)
  const maskedSection = "*".repeat(number.length - 6)
  return `${firstThree}${maskedSection}${lastThree}`
}

const functions = {
  lastFourDigits,
  formatNumber: number,
  daysDifference: getDaysDifference,
  formatMoney,
  currencySymbol,
  formatTimestamp: dateTimestamp,
  truncateString,
  maskedEmail,
  validEmail,
  getMonth,
  makeNumArr,
  isValidUrl,
  returnBase64,
  splitOnCapsLetter,
  createUrl,
  removeDuplicates,
  sortAlphabetically,
  maskValue,
  getFormattedAirportByIata,
  convertTo12HourFormat,
  formatCustomTime,
  convertMinutesToHHMM,
  eighteenYearsAgo,
  maskedPhoneNo,
  formattedTodayDate,
  // encryptData,
  // decryptData
}

export default functions
