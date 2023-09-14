import AuthLayout from '@/app/auth-layout'
import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
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
	const [fullScreenLoader, setFullScreenLoader] = useState(false)


	const handleSubmit = (e) =>{
		e.preventDefault()
		setCtaClicked(true)
		if (!allFieldsValid) {
			return
		}
		setFullScreenLoader(true)
		window.setTimeout(()=>{
			setFullScreenLoader(false)
			push('/auth/signup/business/address')
		}, 3000)
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
		<AuthLayout fullScreenLoader={fullScreenLoader} btn={{text: 'Sign up', url: '/auth/signup'}} pageTitle={'Login'}>
			<div className={styles.auth}>
				<div className={styles.inner}>
					<div className={styles.center}>
						<h1 className="title"><span>Hi,</span> 👋🏾 Welcome back</h1>
						<form className={styles.form} onSubmit={handleSubmit}>
							<div className={styles.inner}>
								<div className={`${styles.form_group} ${ctaClicked && !validEmail(email) ? styles.error : ''}`}>
									<label htmlFor="email-address">Email address</label>
									<input placeholder="kelechi@gmail.com" id="email-address" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
									{ctaClicked && !validEmail(email) ? <FeedbackInfo message={!email ? 'Email is needed' : !validEmail(email) ? 'Valid email is required' : 'Email is needed'} /> : <></>}
								</div>
								<div className={`${styles.form_group} ${ctaClicked && !password ? styles.error : ''}`}>
									<label htmlFor="password">Password</label>
									<PasswordField passwordStrengthNeeded={false} emitPassword={(e)=>setPassword(e)} />
									{ctaClicked && !password ? <FeedbackInfo message='Password is needed' /> : <></>}
								</div>
							</div>
							<div className={styles.action_ctn}>
								<PrimaryBtn text='Log in' />
								<p>Forgot password? <Link href="/auth/forgot-password" text='Reset it'>Reset it</Link></p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</AuthLayout>
	)
}

export default Login
