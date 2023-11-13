import moment from 'moment'
export const dateDifference = (value, time) =>
	value ? moment(value).diff(new Date(), time) : '-'
export const isBefore = (value) =>
	value ? moment(value, 'YYYY/MM/DD').isBefore(moment()) : false
export const detailedDate = (value) =>
	value ? moment(String(value)).format('Do MMM, YYYY.') : '-'
export const detailedDateInFull = (value) =>
	value ? moment(String(value)).format('Do MMMM YYYY, hh:mm:ss a') : '-'
export const timeFromDate = (value) =>
	value ? moment(String(value)).format('hh:mm:ss a') : '-'
export const numericalDate = (value) =>
	value ? moment(String(value)).format('DD/MM/YYYY') : '-'
export const numericalDateDash = (value) =>
	value ? moment(String(value)).format('DD-MM-YYYY') : '-'
export const numericalDateDashReversed = (value) =>
	value ? moment(String(value)).format('YYYY-MM-DD') : '-'
export const stringToDate = (value) =>
	value ? moment(value, 'LL').toDate() : null
export const fromNow = (value) => (value ? moment(value).fromNow() : '-')
export const month = (value, len) => {
	const date = new Date()
	date.setMonth(value - 1)
	return date.toLocaleString(
		'en-US', { month: len || 'short' } // short or long
	)
}
