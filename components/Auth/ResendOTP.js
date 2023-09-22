
import styles from '@/assets/styles/auth-screens.module.css'
import TertiaryBtn from '@/components/Btn/Tertiary'
import { useEffect, useState, useCallback } from 'react'
import { resendOtp } from '@/services/restService'
import toast from '@/components/Toast'

const ResendOTP = ({setCountDown, countDown, email}) => {

	const [resendOTPStatus, setResendOTPStatus] = useState('Resend OTP')
	const countDownTimer = () => {
		if (countDown > 0) {
			window.setTimeout(() => {
				setCountDown(countDown - 1)
			}, 1000)
		} else {
			setResendOTPStatus('Resend OTP')
		}
	}

	const notify = useCallback((type, message) => {
		toast({ type, message })
	}, [])

	useEffect(()=>{
		countDownTimer()
	}, [countDown])

	const resendOTP = async (e) => {
		e.preventDefault()
		setResendOTPStatus('Resending...')
		// window.setTimeout(() => {
		// }, 3000)
		try {
			const payload = {
				email,
			}
			const response = await resendOtp(payload)
			// console.log(response)
			const {message} = response.data || 'OTP Resent Successfully to Email Address. Please Retry New OTP.'
			notify('success', message)
			setCountDown(59)
			countDownTimer()
		} catch (_err) {
			const { message } = _err.response?.data || _err
			notify('error', message)
		} finally {
			setResendOTPStatus('Resend OTP')
		}
	}

	return (
		<p className={styles.receive_otp_text}>
      Didn’t receive any code? {' '}
			{
				!countDown && resendOTPStatus === 'Resend OTP' ?
					<TertiaryBtn
						text='Resend OTP'
						onClick={resendOTP}
					/> :
					!countDown && resendOTPStatus === 'Resending...' ?
						<span className={styles.otp_count_down}>Resending...</span> :
						<span className={styles.otp_count_down}>Resend OTP(0.{countDown}s)</span>
			}
		</p>
	)
}

export default ResendOTP
