
import styles from '@/assets/styles/auth-screens.module.css'
import TertiaryBtn from '@/components/Btn/Tertiary'
import { useEffect, useState } from 'react'
const ResendOTP = ({setCountDown, countDown}) => {

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

	useEffect(()=>{
		countDownTimer()
	}, [countDown])

	const resendOTP = (e) => {
		e.preventDefault()
		setResendOTPStatus('Resending...')
		window.setTimeout(() => {
			setCountDown(59)
			countDownTimer()
		}, 3000)
	}
	return (
		<p className={styles.receive_otp_text}>
      Didn’t receive any code?
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
