'use client'
import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import TertiaryBtn from '@/components/Btn/Tertiary'
import SecondaryLink from '@/components/Link/Secondary'
import BackBtn from '@/components/Btn/Back'
import { useEffect, useState, useCallback } from 'react'
import OtpInput from 'react-otp-input'
import functions from '@/utils/functions'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import PasswordField from '@/components/Auth/PasswordField'
import { forgotPassword } from '@/services/restService'
import Input from '@/components/Dashboard/Input'
import toast from '@/components/Toast'

const ForgotPassword = () => {
	const {push, query, replace} = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const [level, setLevel] = useState(searchParams.get('level'))
	const { validEmail } = functions
	// const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [passwordFieldsValid, setPasswordFieldsValid] = useState(false)
	const [currentLevel, setCurrentLevel] = useState('verify')
	const [isLoading, setIsLoading] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)
	const [otp, setOtp] = useState('')

	const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

	const handleEmailChange = (event) => {
		setEmail(event.target.value)
	}

	const handleForgotPasswordSubmit = async (e) => {
		e.preventDefault()
		setCtaClicked(true)
		if (!validEmail(email)) {
			return
		}
		setIsLoading(true);
    try {
      const response = await forgotPassword({email});
      const {message} = response.data;
      notify("success", message);
			replace(
				{
					pathname,
					query:  {
						level: 'verify'
					},
				},
				undefined,
				{
					shallow: true,
				},
			);
    } catch (_err) {
      const { message } = _err.response?.data || _err;
      notify("error", message);
      console.log(message);
    } finally {
      setIsLoading(false);
    }
		// setCurrentLevel('verify')
	}

	const handleVerificationSubmit = (e) => {
		e.preventDefault()
		setCurrentLevel('reset')
	}

	const handleResetPasswordSubmit = (e) => {
		e.preventDefault()
		push('/auth/business-kind')
	}

	useEffect(()=>{
		if (password === confirmPassword) {
			setPasswordFieldsValid(true)
		} else {
			setPasswordFieldsValid(false)
		}
	}, [password, confirmPassword])

	const Forgot = () => {
		return (
			<>
				<h1 className="title">Forgot password?</h1>
				<h4 className="sub-title">Enter the email you used to create your account</h4>
				<form className={styles.form}
					onSubmit={handleForgotPasswordSubmit}>
					<div className={styles.inner}>
					
						<Input
							label="Email Address"
							id="email-address"
							name="email"
							placeholder="john@mail.com"
							value={email}
							onChange={handleEmailChange}
							error={ctaClicked && !validEmail(email)}
							errorMsg={
								!email
									? "Email address is required"
									: !validEmail(email)
									? "Valid email is required"
									: "Email is required"
							}
						/>
					</div>
					<div className={styles.action_ctn}>
						<PrimaryBtn
							loading={isLoading}
							text='Reset' />
						<SecondaryLink text='Go back to Log in'
							href='/auth/login' />
					</div>
				</form>
			</>
		)
	}
	const Verify = () => {
		return (
			<>
				<BackBtn onClick={()=>setCurrentLevel('forgot')} />
				<h1 className="title">Verify email</h1>
				<h4 className="sub-title">We sent a 6 digit code to daniel****@gmail.com, please enter the code below, or click the verification link in your mail to complete verification </h4>
				<form className={styles.form}
					onSubmit={handleVerificationSubmit}>
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
						<PrimaryBtn disabled={otp.length !== 6}
							text='Verify' />
					</div>
				</form>
			</>
		)
	}

	const Reset = () => {
		return (
			<>
				<h1 className="title">Create new password</h1>
				<h4 className="sub-title">Kindly enter a unique password to secure your account</h4>
				<form className={styles.form}
					onSubmit={handleResetPasswordSubmit}>
					<div className={styles.inner}>
						<div className={styles.form_group}>
							<label>Create password</label>
							<PasswordField id="password"
								emitPassword={(e)=>setPassword(e)} />
						</div>
						<div className={styles.form_group}>
							<label>Confirm password</label>
							<PasswordField id="confirm_password"
								passwordStrengthNeeded={false}
								emitPassword={(e)=>setConfirmPassword(e)} />
						</div>
					</div>
					<div className={styles.action_ctn}>
						<PrimaryBtn disabled={!passwordFieldsValid}
							text='Login' />
					</div>
				</form>
			</>
		)
	}

	return (
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
	)
}

export default ForgotPassword
