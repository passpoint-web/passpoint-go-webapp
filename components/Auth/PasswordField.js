import styles from '@/assets/styles/auth-screens.module.css'
import { useEffect, useState } from 'react'
import PasswordStrength from './PasswordStrength'
const PasswordField = ({passwordStrengthNeeded = true, emitPassword}) => {

	const [type, setType] = useState('password')
	const [password, setPassword] = useState('')

	const handlePasswordType = (e) => {
		e.preventDefault()
		setType(type === 'password' ? 'text' : 'password')
	}

	const handlePasswordChange = (e) => {
		// e.preventDefault()
		setPassword(e.target.value)
	}

	const isUpToEightChars =()=> {
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
	useEffect(()=>{
		// eg login screen
		if (!passwordStrengthNeeded) {
			emitPassword(password)
		}
		isUpToEightChars()
		containsNumbers()
		hasUpperCase()
		containsSpecialChars()
		if (isUpToEightChars() && containsNumbers() && hasUpperCase() && containsSpecialChars()) {
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
					id="password"
					type={type}
					placeholder="Password"
					value={password}
					onChange={handlePasswordChange}
				/>
				<button className={`${styles.absolute_side} ${styles.show}`} onClick={handlePasswordType}>
					{type === 'password' ? 
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
							<path d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z" stroke="#565C69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z" stroke="#565C69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
						</svg> :
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
							<path d="M12.1083 7.89172L7.89166 12.1084C7.35 11.5667 7.01666 10.8251 7.01666 10.0001C7.01666 8.35006 8.35 7.01672 10 7.01672C10.825 7.01672 11.5667 7.35006 12.1083 7.89172Z" stroke="#565C69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M14.85 4.80828C13.3917 3.70828 11.725 3.10828 10 3.10828C7.05834 3.10828 4.31667 4.84161 2.40834 7.84161C1.65834 9.01661 1.65834 10.9916 2.40834 12.1666C3.06667 13.1999 3.83334 14.0916 4.66667 14.8083" stroke="#565C69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M7.01666 16.2749C7.96666 16.6749 8.975 16.8916 10 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00828 17.5917 7.83328C17.3167 7.39994 17.0167 6.99161 16.7083 6.60828" stroke="#565C69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M12.925 10.5834C12.7083 11.7584 11.75 12.7167 10.575 12.9334" stroke="#565C69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M7.89167 12.1083L1.66667 18.3333" stroke="#565C69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M18.3333 1.66663L12.1083 7.89163" stroke="#565C69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>}
				</button>
			</div>

			{passwordStrengthNeeded ? 
				<div className={styles.password_strength_ctn}>
					<PasswordStrength valid={isUpToEightChars()} text='Atleast 8 characters' />
					<PasswordStrength valid={hasUpperCase()} text='Atleast one uppercase' />
					<PasswordStrength valid={containsNumbers()} text='Atleast one number' />
					<PasswordStrength valid={containsSpecialChars()} text='Atleast one spcial character' />
				</div> :
				<></>
			}
		</>
	)
}

export default PasswordField
