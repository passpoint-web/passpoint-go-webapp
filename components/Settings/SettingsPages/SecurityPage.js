
'use client'
import styles from '@/components/Settings/settings.module.css'
import formStyles from '@/assets/styles/auth-screens.module.css'
import { useState } from 'react'
import Input from '@/components/Dashboard/Input'
import PasswordField from '@/components/Auth/PasswordField'
import Button from '@/components/Btn/Button'
// import ModalWrapper from '@/components/Modal/ModalWrapper'
// import { getCredentials } from '@/services/localService'
// import { useNotify } from '@/utils/hooks'
import { useRouter, useSearchParams } from 'next/navigation'
// import { forgotPassword } from '@/services/restService'
import functions from '@/utils/functions'
import ForgotPasswordFlow from '@/components/AccountProfile/ForgotPasswordFlow'
// import Link from 'next/link'
const Security = () => {
	const {createUrl} = functions
	const {push} = useRouter()
	const searchParams = useSearchParams()
	// const notify = useNotify()
	const [ctaClicked, setCtaClicked] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	// const [forgotPasswordModal, setForgotPasswordModal] = useState(false)
	const [payload, setPayload] = useState({
		password: '',
		confirm: '',
	})
	const handleChange = (e) => {
		const { name, value } = e.target
		setPayload((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleForgotPasswordModals = (e) => {
		e.preventDefault()
		handleForgotPasswordLevel('forgot')
		// setForgotPasswordModal(true)
	}

	const handleForgotPasswordLevel = (val) => {
		const newParams = new URLSearchParams(searchParams.toString());
		newParams.set('forgotPasswordLevel', val)
		push(createUrl('/dashboard/settings/security', newParams))
	}

	const handleResetPasswordSubmit = async (e) => {
		e.preventDefault()
		setCtaClicked(true)
	}

	const ChangePassword = () => (
		<>
			{
				searchParams?.get('forgotPasswordLevel') && <ForgotPasswordFlow />}
			<form className={formStyles.form}
				onSubmit={handleResetPasswordSubmit}>
				<div className={styles.inner}>
					<Input
						label="Password"
						id="password"
						name="password"
						placeholder="Password"
						error={ctaClicked && !payload.password}
					>
						<PasswordField
							id="password-field"
							passwordStrengthNeeded={false}
							errorField={ctaClicked && !payload.password}
							emitPassword={(e) =>
								handleChange({
									target: { name: 'password', value: e },
								})
							}
						/>
					</Input>
					<Input
						label="Password"
						id="password"
						name="password"
						placeholder="Password"
						error={ctaClicked && !payload.password}
					>
						<PasswordField
							id="password-field"
							errorField={ctaClicked && !payload.password}
							emitPassword={(e) =>
								handleChange({
									target: { name: 'password', value: e },
								})
							}
						/>
					</Input>
					<Input
						label="Confirm Password"
						id="confirm-password"
						name="confirm-password"
						placeholder="Confirm Password"
						error={ctaClicked && (!payload.confirm || payload.password !== payload.confirm)}
						errorMsg={ctaClicked && !payload.confirm ? 'Confirm password is required' : ctaClicked && payload.password !== payload.confirm ? 'Passwords do not match' : ''}
					>
						<PasswordField
							disabled={!payload.password}
							id="confirm-password-field"
							passwordStrengthNeeded={false}
							errorField={ctaClicked && !payload.confirm}
							emitPassword={(e) =>
								handleChange({
									target: { name: 'confirm', value: e },
								})
							}
						/>
					</Input>
				</div>
				<div className={formStyles.action_ctn}>
					<Button className='primary sd'
						loading={isLoading}
						text='Update Password'
					/>
					<p>
                Forgot password?{" "}
						<Button className='tertiary'
							onClick={handleForgotPasswordModals}
							text="Reset it">
                  Reset it
						</Button>
					</p>
				</div>
			</form></>
	)

	return (
		<div className={styles.security_page}>
			<h1>Security & Privacy</h1>
			<div className={styles.security_box}>
				<h3>Change Password</h3>
				{ChangePassword()}
			</div>
			<div className={styles.security_box}>
				<h3>Privacy Settings</h3>
				
			</div>
		</div>
	)
}

export default Security
