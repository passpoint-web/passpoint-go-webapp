
import AuthLayout from '@/app/auth-layout'
import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import TertiaryBtn from '@/components/Btn/Tertiary'
import BackBtn from '@/components/Btn/Back'
import { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input'
// import functions from '@/utils/functions'
import { useRouter } from 'next/router'

const VerifyEmail = () => {

	const {push} = useRouter()
	// const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [otp, setOtp] = useState('')

	const handleVerificationSubmit = (e) => {
		e.preventDefault()
		push('/auth/login')
	}

	return (
		<AuthLayout LHSRequired={true} fullScreenLoader={false} btn={{text: 'Log in', url: '/auth/login'}} pageTitle={'Signup'}>
			<div className={`${styles.auth} ${styles.no_pd_top}`}>
				<div className={styles.inner}>
					<div className={styles.center}>
						<BackBtn emitClick={()=>push('/auth/signup/business/address')} />
						<h1 className="title">Verify Email Address</h1>
						<h4 className="sub-title">We sent a 6 digit code to daniel****@gmail.com, please enter the code below, or click the verification link in your mail to complete verification </h4>
						<form className={styles.form} onSubmit={handleVerificationSubmit}>
							<div className={styles.inner}>
								<div className={styles.form_group}>
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
								</div>
							</div>
							<div className={styles.action_ctn}>
								<p>Didn’t receive any code? <TertiaryBtn text='Resend OTP'/></p>
								<PrimaryBtn disabled={otp.length !== 6} text='Verify' />
							</div>
						</form>
					</div>
				</div>
			</div>
		</AuthLayout>
	)
}

export default VerifyEmail