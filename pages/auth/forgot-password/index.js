import AuthLayout from '@/app/auth-layout'
import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import TertiaryBtn from '@/components/Btn/Tertiary'
import SecondaryLink from '@/components/Link/Secondary'
import BackBtn from '@/components/Btn/Back'
import { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input'
import functions from '@/utils/functions'
import { useRouter } from 'next/router'

const ForgotPassword = () => {
	const router = useRouter()
	const { validEmail } = functions
	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [email, setEmail] = useState('')
	const [currentLevel, setCurrentLevel] = useState('forgot')
	const [otp, setOtp] = useState('')

	const handleEmailChange = (event) => {
		setEmail(event.target.value)
	}

	const handleForgotPasswordSubmit = (e) => {
		e.preventDefault()
		setCurrentLevel('verify')
		// router.replace('/auth/forgot-password?level=verify')
	}
	const handleVerificationSubmit = (e) => {
		e.preventDefault()
		setCurrentLevel('reset')
	}
	const handleResetPasswordSubmit = (e) => {
		e.preventDefault()
	}

	useEffect(()=>{
		// setCurrentLevel(router.query.level)
	}, [router])

	const Forgot = () => {
		return (
			<>
				<h1>Forgot password?</h1>
				<p>Enter the email you used to create your account</p>
				<form className={styles.form} onSubmit={handleForgotPasswordSubmit}>
					<div className={styles.inner}>
						<div className={styles.form_group}>
							<label htmlFor="email-address">Email address</label>
							<input placeholder="kelechi@gmail.com" id="email-address" type="email" value={email} onChange={handleEmailChange} />
						</div>
					</div>
					<div className={styles.action_ctn}>
						<PrimaryBtn disabled={!validEmail(email)} text='Reset' />
						<SecondaryLink text='Go back to Log in' href='/auth/login' />
					</div>
				</form>
			</>
		)
	}
	const Verify = () => {
		return (
			<>
				<BackBtn emitClick={()=>setCurrentLevel('forgot')} />
				<h1>Verify email</h1>
				<p>We sent a 6 digit code to daniel****@gmail.com, please enter the code below, or click the verification link in your mail to complete verification </p>
				<form className={styles.form} onSubmit={handleVerificationSubmit}>
					<div className={styles.inner}>
						<div className={styles.form_group}>
							<div className={styles.otp_input}>
								<OtpInput
									value={otp}
									onChange={setOtp}
									numInputs={6}
									inputType="number"
									renderSeparator={<span> </span>}
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
			</>
		)
	}

	const Reset = () => {
		return (
			<>
				<h1>Create new password</h1>
				<p>Kindly enter a unique password to secure your account</p>
				<form className={styles.form} onSubmit={handleResetPasswordSubmit}>
					<div className={styles.inner}>
						<div className={styles.form_group}>
							<label>Create password</label>
							<input placeholder="****" type="password" />
						</div>
						<div className={styles.form_group}>
							<label>Confirm password</label>
							<input placeholder="****" type="password" />
						</div>
					</div>
					<div className={styles.action_ctn}>
						<PrimaryBtn disabled={!allFieldsValid} text='Login' />
					</div>
				</form>
			</>
		)
	}

	return (
		<AuthLayout pageTitle={'Forgot Password'}>
			<div className={styles.auth}>
				<div className={styles.inner}>
					<div className={styles.center}>
						{
							currentLevel === 'forgot' ? 
								Forgot() :
								currentLevel === 'verify' ? 
									Verify() :
									Reset()
						}
					</div>
				</div>
			</div>
		</AuthLayout>
	)
}

export default ForgotPassword
