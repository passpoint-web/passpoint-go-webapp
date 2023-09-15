import styles from '@/assets/styles/auth-screens.module.css'
import { useEffect, useState } from 'react'
import PasswordStrength from './PasswordStrength'
import { EyeClose, EyeOpen } from '@/constants/icons'

const PasswordField = ({
	id = 'password',
	passwordStrengthNeeded = true,
	emitPassword,
	errorField,
	// setPayload,
}) => {
	const [type, setType] = useState('password')
	const [password, setPassword] = useState('')

	const handlePasswordType = (e) => {
		e.preventDefault()
		setType(type === 'password' ? 'text' : 'password')
	}

	// const handlePasswordChange = (e) => {
	// 	const newPassword = e.target.value

	// 	// Update both password state and payload
	// 	setPassword(newPassword)
	// 	setPayload((prevState) => ({
	// 		...prevState,
	// 		password: newPassword,
	// 	}))
	// }

	const isUpToEightChars = () => {
		return password.length > 7
	}

	const hasUpperCase = () => {
		const re = /[A-Z]/
		return re.test(password)
	}

	const containsSpecialChars = () => {
		const regexString = /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>\\/?~]/
		return regexString.test(password)
	}

	const containsNumbers = () => {
		const regexString = /\d/
		return regexString.test(password)
	}

	const passwordStrength = [
		{
			valid: isUpToEightChars(),
			text: 'Atleast 8 characters',
		},
		{
			valid: hasUpperCase(),
			text: 'Atleast one uppercase',
		},
		{
			valid: containsNumbers(),
			text: 'Atleast one number',
		},
		{
			valid: containsSpecialChars(),
			text: 'Atleast one special character',
		},
	]

	useEffect(() => {
		// eg login screen
		if (!passwordStrengthNeeded) {
			emitPassword(password)
		}
		isUpToEightChars()
		containsNumbers()
		hasUpperCase()
		containsSpecialChars()
		if (
			isUpToEightChars() &&
      containsNumbers() &&
      hasUpperCase() &&
      containsSpecialChars()
		) {
			emitPassword(password)
		} else {
			if (passwordStrengthNeeded) {
				emitPassword('')
			}
		}
	}, [password])

	return (
		<>
			<div className={styles.input_wrapper}>
				<input
					id={id}
					type={type}
					placeholder="Password"
					value={password}
					onChange={(e)=>setPassword(e.target.value)}
				/>
				<button
					className={`${styles.absolute_side} ${styles.show}`}
					onClick={handlePasswordType}
				>
					{type === 'password' ? <EyeOpen /> : <EyeClose />}
				</button>
			</div>

			{passwordStrengthNeeded ? (
				<div className={styles.password_strength_ctn}>
					{passwordStrength.map((p, index) => (
						<PasswordStrength
							key={index}
							error={errorField && !p.valid}
							valid={p.valid}
							text={p.text}
						/>
					))}
				</div>
			) : (
				<></>
			)}
		</>
	)
}

export default PasswordField
