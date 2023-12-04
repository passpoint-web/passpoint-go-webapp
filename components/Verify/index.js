'use client'
import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import OtpInput from 'react-otp-input'
import Input from '@/components/Dashboard/Input'
import ResendOTP from '@/components/Verify/ResendOTP'
import { useNotify } from '@/utils/hooks'
import BackBtn from '@/components/Btn/Back'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authenticate } from '@/services/restService'
import functions from '@/utils/functions'

const VerifyEmail = ({nextPath = '/auth/login', backBtnNeeded = false, email, otpType = 'accountVerification'}) => {
	// eslint-disable-next-line no-unused-vars
	const { push, back } = useRouter()
	const [otp, setOtp] = useState('')
	const [errorMsg, setErrorMsg] = useState('')
	const [ctaClicked, setCtaClicked] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [renderInput, setRenderInput] = useState(false)

	const notify = useNotify()

	const {maskedEmail} = functions

	const handleVerificationSubmit = async (e) => {
		e.preventDefault()
		setCtaClicked(true)
		if (otp?.length !== 6) {
			return
		}
		setIsLoading(true)
		try {
			const payload = {
				otp,
				email,
				otpType
			}
			const response = await authenticate.verifyEmailOtp(payload)
			console.log(response)
			notify('success', 'Your email has been verified!')
			push(nextPath)
		} catch (_err) {
			const { message } = _err.response?.data || _err
			notify('error', message)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		setRenderInput(true)
		setErrorMsg('')
	}, [])

	return (
		<div className={`${styles.auth} ${!backBtnNeeded ? styles.no_pd_top : ''}`}>
			<div className={styles.inner}>
				<div className={styles.center}>
					{backBtnNeeded ? <BackBtn onClick={() => back()} /> : <></> }
					<h1 className="title">Verify Email Address</h1>
					<h4 className="sub-title">
              We sent a 6 digit code to {email ? maskedEmail(email) : 'your email'}, please enter the
              code below.
					</h4>
					<form className={styles.form}
						onSubmit={handleVerificationSubmit}>
						<div className={styles.inner}>
							<Input
								error={(ctaClicked && otp?.length !== 6) || errorMsg}
								errorMsg={otp?.length !== 6 ? 'Valid OTP needed' : errorMsg}
								msgPositionCenter={true}
							>
								<div className={styles.otp_input}>
									{
										renderInput ?
											<OtpInput
												value={otp}
												onChange={setOtp}
												numInputs={6}
												shouldAutoFocus={true}
												inputType="number"
												inputMode={null}
												renderSeparator={<span />}
												renderInput={(props) => <input {...props} />}
											/>
											: <></>
									}
								</div>
							</Input>
						</div>
						<div className={styles.action_ctn}>
							<ResendOTP
								email={email}
								clearOtp={()=>setOtp('')}
							/>
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
