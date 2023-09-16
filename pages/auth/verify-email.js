import AuthLayout from '@/app/auth-layout'
import styles from '@/assets/styles/auth-screens.module.css'
import TertiaryBtn from '@/components/Btn/Tertiary'
import PrimaryBtn from '@/components/Btn/Primary'
import BackBtn from '@/components/Btn/Back'
import { useState } from 'react'
import OtpInput from 'react-otp-input'
import { useRouter } from 'next/router'

const VerifyEmail = () => {

	const { push } = useRouter()

	// const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [otp, setOtp] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		push('/auth/business-kind')
	}

	return (
		<AuthLayout pageTitle={'Verify Email'}>
			<div className={styles.auth}>
				<div className={styles.inner}>
					<div className={styles.center}>
						<BackBtn onClick={()=>push('/auth/signup')} />
						<h1>Verify email address</h1>
						<p>
              We sent a 6 digit code to kelechi****@gmail.com, please enter the code below, or click the verification link in your mail to complete verification
						</p>
						<form className={styles.form}
							onSubmit={handleSubmit}>
							<div className={styles.inner}>
								<div className={styles.form_group}>
									<div className={styles.otp_input}>
										<OtpInput
											value={otp}
											onChange={setOtp}
											numInputs={6}
											renderSeparator={<span> </span>}
											renderInput={(props) => <input {...props} />}
										/>
									</div>
								</div>
							</div>
							<div className={styles.action_ctn}>
								<p>Didn’t receive any code? <TertiaryBtn text='Resend OTP'/></p>
								<PrimaryBtn disabled={otp.length !== 6}
									text='Verify OTP' />
							</div>
						</form>
					</div>
				</div>
			</div>
		</AuthLayout>
	)
}

export default VerifyEmail
