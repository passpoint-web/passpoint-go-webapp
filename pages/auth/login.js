import AuthLayout from '@/app/auth-layout'
import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
// import {notify} from '@/components/Toast'
import PasswordField from '@/components/Auth/PasswordField'

const Login = () => {
	const {push} = useRouter()
	// const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [fullScreenLoader, setFullScreenLoader] = useState(false)

	const handleSubmit = (e) => {
		// console.log(notify())
		e.preventDefault()
		// notify('yoyoyoy')
		setFullScreenLoader(true)
		window.setTimeout(()=>{
			setFullScreenLoader(false)
			push('/auth/business-kind')
		}, 3000)
	}

	// const onSetPassword = (e) => {
	// 	console.log(e)
	// }

	return (
		<AuthLayout fullScreenLoader={fullScreenLoader} btn={{text: 'Sign up', url: '/auth/signup'}} pageTitle={'Login'}>
			<div className={styles.auth}>
				<div className={styles.inner}>
					<div className={styles.center}>
						<h1><span>Hi,</span> 👋🏾 Welcome back</h1>
						<form className={styles.form} onSubmit={handleSubmit}>
							<div className={styles.inner}>
								<div className={styles.form_group}>
									<label htmlFor="email-address">Email address</label>
									<input placeholder="kelechi@gmail.com" id="email-address" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
								</div>
								<div className={styles.form_group}>
									<label htmlFor="password">Password</label>
									<PasswordField passwordStrengthNeeded={false} emitPassword={(e)=>setPassword(e)} />
								</div>
							</div>
							<div className={styles.action_ctn}>
								<PrimaryBtn disabled={!email || password.length < 7} text='Log in' />
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
