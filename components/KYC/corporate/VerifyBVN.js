/* eslint-disable no-unused-vars */
'use client'
import ModalWrapper from '@/components/Modal/ModalWrapper'
import Input from '@/components/Dashboard/Input'
import OtpInput from 'react-otp-input'
import styles from '@/assets/styles/auth-screens.module.css'
import { useState } from 'react'
import ResendOTP from '@/components/Verify/ResendOTP'

const VerifyBVN = () => {
	const [otp, setOtp] = useState('')
	const [errorMsg, setErrorMsg] = useState('')
	const [ctaClicked, setCtaClicked] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	return (
		<ModalWrapper
			heading='Verify BVN'
			subHeading='We sent an OTP 081****261 please enter the code below.'
			ctaBtnText='Continue'
			topCancelNeeded={false}
			bottomCancelNeeded={false}
		>
			<form className={styles.form}
			>
				<div className={styles.inner}>
					<Input
						error={(ctaClicked && otp?.length !== 6) || errorMsg}
						errorMsg={otp?.length !== 6 ? 'Valid OTP needed' : errorMsg}
						msgPositionCenter={true}
					>
						<div className={styles.otp_input}>
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
						</div>
					</Input>
				</div>
				<ResendOTP
					clearOtp={()=>setOtp('')}
				/>
			</form>
		</ModalWrapper>
	)
}

export default VerifyBVN
