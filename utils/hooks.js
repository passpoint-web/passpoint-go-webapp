
import toast from '@/components/Toast'
import { useCallback } from 'react'

export function useNotify () {
	const notify = useCallback((type, message) => {
		toast({ type, message })
	}, [])
	return notify
}
