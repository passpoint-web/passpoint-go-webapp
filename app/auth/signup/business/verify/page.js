'use client'
import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import BackBtn from '@/components/Btn/Back'
import { useEffect, useState, useCallback } from 'react'
import OtpInput from 'react-otp-input'
import { useRouter } from 'next/navigation'
import Input from '@/components/Dashboard/Input'
import ResendOTP from '@/components/Auth/ResendOTP'
import { getCredentials } from '@/services/localService'
import { registerUser } from '@/services/restService'
import toast from '@/components/Toast'
import functions from '@/utils/functions'

const VerifyEmail = () => {
	const { push, back } = useRouter()
	const [otp, setOtp] = useState('')
	const [errorMsg, setErrorMsg] = useState('')
	const [ctaClicked, setCtaClicked] = useState(false)
	const [countDown, setCountDown] = useState(0)
	const savedCredentials = getCredentials()
	const [isLoading, setIsLoading] = useState(false)

	const notify = useCallback((type, message) => {
		toast({ type, message })
	}, [])

	const {maskedEmail} = functions

	const handleVerificationSubmit = async (e) => {
		e.preventDefault()
		setCtaClicked(true)
		if (otp.length !== 6) {
			return
		}
		setIsLoading(true)
		try {
			const payload = {
				otp,
				email: savedCredentials.email,
				otpType:'accountVerification'
			}
			const response = await registerUser('verifyUserOtp', payload)
			console.log(response)
			// setSignupLevel({'business', 2})
			notify('success', 'Your email has been verified!')
			push('/auth/login')
		} catch (_err) {
			const { message } = _err.response?.data || _err
			notify('error', message)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		setErrorMsg('')
	}, [])

	return (
		<div className={`${styles.auth} ${styles.no_pd_top}`}>
			<div className={styles.inner}>
				<div className={styles.center}>
					<BackBtn onClick={() => back()} />
					<h1 className="title">Verify Email Address</h1>
					<h4 className="sub-title">
              We sent a 6 digit code to {maskedEmail(savedCredentials.email)}, please enter the
              code below, or click the verification link in your mail to
              complete verification
					</h4>
					<form className={styles.form}
						onSubmit={handleVerificationSubmit}>
						<div className={styles.inner}>
							<Input
								error={(ctaClicked && otp.length !== 6) || errorMsg}
								errorMsg={otp.length !== 6 ? 'Valid OTP needed' : errorMsg}
								msgPositionCenter={true}
							>
								<div className={styles.otp_input}>
									<OtpInput
										value={otp}
										onChange={setOtp}
										numInputs={6}
										inputType="number"
										inputMode="numeric"
										renderSeparator={<span />}
										renderInput={(props) => <input {...props} />}
									/>
								</div>
							</Input>
						</div>
						<div className={styles.action_ctn}>
							<ResendOTP countDown={countDown}
								setCountDown={(v)=>setCountDown(v)} />
							<PrimaryBtn
								text="Verify"
								loading={isLoading}
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default VerifyEmail
