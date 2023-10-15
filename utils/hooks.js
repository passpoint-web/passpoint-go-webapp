
import toast from '@/components/Toast'
import { useCallback } from 'react'

export function useNotify() {
	const notify = useCallback((type, message) => {
		toast({ type, message })
	}, [])
	return notify
}

export function useFormat24HourTime(timeString) {
	if (timeString) {
		const hour = Number(timeString.split(':')?.at(0))
		const minute = timeString.split(':')?.at(1)

		// Check if PM or AM
		if (hour > 12) {
			const timeIn12HourFormat = Math.abs(12 - hour)
			return `${timeIn12HourFormat > 9 ? timeIn12HourFormat : `0${timeIn12HourFormat}`}:${minute} PM`
		}
		return `${timeString} AM`
	}
	return timeString
}
