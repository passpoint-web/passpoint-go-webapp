'use client'
import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
// import {notify} from '@/components/Toast'
import PasswordField from '@/components/Auth/PasswordField'
import FeedbackInfo from '@/components/FeedbackInfo'
import functions from '@/utils/functions'

const Login = () => {

	const {validEmail} = functions
	const {push} = useRouter()
	const [email, setEmail] = useState('')
	const [ctaClicked, setCtaClicked] = useState(false)
	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [password, setPassword] = useState('')
	// const [payload, setPayload] = useState({
	// 	email: '',
	// 	password: '',
	// })

	// const handleChange = (e) => {
	// 	setPayload((prevState) => ({
	// 		...prevState,
	// 		[e.target.name]: e.target.value,
	// 	}))
	// }


	const handleSubmit = (e) =>{
		e.preventDefault()
		setCtaClicked(true)
		if (!allFieldsValid) {
			return
		}
		// window.setTimeout(() => {
		push('/auth/signup/business/address')
		// }, 3000)
	}


	useEffect(()=>{
		const conditionsMet =
	validEmail(email) &&
		password
		if (conditionsMet) {
			setAllFieldsValid(true)
		} else {
			setAllFieldsValid(false)
		}
	}, [
		email,
		password
	])


	return (
		<div className={styles.auth}>
			<div className={styles.inner}>
				<div className={styles.center}>
					<h1 className="title">
						<span>Hi,</span> 👋🏾 Welcome back
					</h1>
					<form className={styles.form}
						onSubmit={handleSubmit}>
						<div className={styles.inner}>
							<div className={`${styles.form_group} ${ctaClicked && !validEmail(email) ? styles.error : ''}`}>
								<label htmlFor="email-address">Email address</label>
								<input placeholder="kelechi@gmail.com"
									id="email-address"
									type="email"
									value={email}
									onChange={(e)=>setEmail(e.target.value)} />
								{ctaClicked && !validEmail(email) ? <FeedbackInfo message={!email ? 'Email is needed' : !validEmail(email) ? 'Valid email is required' : 'Email is needed'} /> : <></>}
							</div>
							<div className={`${styles.form_group} ${ctaClicked && !password ? styles.error : ''}`}>
								<label htmlFor="password">Password</label>
								<PasswordField passwordStrengthNeeded={false}
									emitPassword={(e)=>setPassword(e)} />
								{ctaClicked && !password ? <FeedbackInfo message='Password is needed' /> : <></>}
							</div>
						</div>
						<div className={styles.action_ctn}>
							<PrimaryBtn text='Log in' />
							<p>Forgot password? <Link href="/auth/forgot-password"
								text='Reset it'>Reset it</Link></p>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login
