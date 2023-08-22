// import CryptoJS from 'crypto-js'

function number(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function currency(num, currency, precision) {
	const n = num ? num.toFixed(precision || 2) : num
	return n ? `${currency === 'USD' ? '$' : currency === 'NGN' ? '₦' : '#'}${n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}` : `${currency === 'USD' ? '$' : currency === 'NGN' ? '₦' : '#'}0`
}

function currencySymbol(currency) {
	return currency === 'USD' ? '$' : currency === 'NGN' ? '₦' : '#'
}

function dateTimestamp(timestamp) {
	const dateString = new Date(timestamp).toDateString()
	return dateString.replace(' ', ', ')
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
		'*'
	)
	return maskedNumber
}

function hideEmail(target) {
	const email = target
	let hiddenEmail = ''
	for (let i = 0; i < email.length; i++) {
		if (i > 2 && i < email.indexOf('@')) {
			hiddenEmail += '*'
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
	return str.slice(0, 12) + '...'
}

function resetModalState() {
	document.querySelectorAll('.modal-container .child').forEach((modal) => {
		modal.classList.remove('squeeze-in')
	})
	document
		.querySelectorAll('.modal-container .backdrop-ctn')
		.forEach((modal) => {
			modal.classList.remove('blur-out')
			modal.classList.add('blur')
		})
}

function validEmail (email) {
	const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return regex.test(String(email).toLowerCase())
}

function getMonth(index) {
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	]
	return months[index - 1]
}

const functions = {
	lastFourDigits,
	formatNumber: number,
	daysDifference: getDaysDifference,
	formatCurrency: currency,
	currencySymbol,
	formatTimestamp: dateTimestamp,
	truncateString,
	hideEmail,
	validEmail,
	getMonth,
	// encryptData,
	// decryptData
}

export default functions
