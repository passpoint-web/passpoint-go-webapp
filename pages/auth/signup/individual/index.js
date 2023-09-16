import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AuthLayout from '@/app/auth-layout'
import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import PasswordField from '@/components/Auth/PasswordField'
import 'react-phone-input-2/lib/style.css'
import functions from '@/utils/functions'
import CheckBox from '@/components/Custom/Check/Check'
import PhoneInput from 'react-phone-input-2'
import BackBtn from '@/components/Btn/Back'

const IndividualInformation = () => {
	const { push } = useRouter()
	const { validEmail } = functions
	const [checked, setChecked] = useState(false)
	const [password, setPassword] = useState('')
	const [fullScreenLoader, setFullScreenLoader] = useState(false)
	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)
	const [payload, setPayload] = useState({
		lastName: '',
		firstName: '',
		email: '',
		phone: '',
		password: '',
	})

	const handleChange = (e) => {
		const { name, value } = e.target
		setPayload((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}
	const toggleChecked = () => {
		setChecked(!checked)
	}

	useEffect(() => {
		const conditionsMet =
      payload.lastName &&
      payload.firstName &&
      validEmail(payload.email) &&
      password &&
      checked
		if (conditionsMet) {
			setAllFieldsValid(true)
		} else {
			setAllFieldsValid(false)
		}
	}, [payload, password, checked])

	const handleSubmit = async (e) => {
		e.preventDefault()
		console.log(payload)
		setCtaClicked(true)
		setFullScreenLoader(true)
		window.setTimeout(() => {
			setFullScreenLoader(false)
			push('/auth/signup/individual/business')
		}, 3000)
	}

	return (
		<AuthLayout
			LHSRequired={true}
			fullScreenLoader={fullScreenLoader}
			btn={{ text: 'Log in', url: '/auth/login' }}
			pageTitle={'Signup'}
		>
			<div className={styles.auth}>
				<div className={styles.inner}>
					<div className={styles.center}>
						<BackBtn onClick={()=>push('/auth/signup')} />
						<h1 className="title">Provide Business Information</h1>
						<form className={styles.form}
							onSubmit={handleSubmit}>
							<div className={styles.inner}>
								<div className={styles.form_row}>
									<div className={styles.form_group}>
										<label htmlFor="last-name">Last name</label>
										<input
											placeholder="John"
											id="last-name"
											name="lastName"
											value={payload.lastName}
											onChange={handleChange}
										/>
									</div>
									<div className={styles.form_group}>
										<label htmlFor="first-name">First name</label>
										<input
											placeholder="Kelechi"
											id="first-name"
											name="firstName"
											value={payload.firstName}
											onChange={handleChange}
										/>
									</div>
								</div>
								<div
									className={`${styles.form_group} ${
										ctaClicked && !validEmail(payload.email) ? styles.error : ''
									}`}
								>
									<label htmlFor="email">Email address</label>
									<input
										placeholder="kelechi@gmail.com"
										id="email"
										name="email"
										value={payload.email}
										onChange={handleChange}
									/>
								</div>
								<div
									className={`${styles.form_group} ${
										ctaClicked && !payload.phone ? styles.error : ''
									}`}
								>
									<label htmlFor="phone-number">Phone number</label>
									<div>
										<PhoneInput
											country={'ng'}
											name="phone"
											value={payload.phone}
											onChange={(phoneValue) => {
												setPayload((prevState) => ({
													...prevState,
													phone: phoneValue,
												}))
											}}
										/>
									</div>
								</div>
								<div
									className={`${styles.form_group} ${
										ctaClicked && !password ? styles.error : ''
									}`}
								>
									<label htmlFor="password">Password</label>
									<PasswordField
										errorField={ctaClicked && !password}
										emitPassword={(e) => setPassword(e)}
										setPayload={setPayload}
									/>
								</div>
							</div>
							<div className={styles.terms}>
								<CheckBox value={checked}
									onChange={toggleChecked} />
								<p>
                  By clicking, you indicate your role as the owner or manager of
                  the business
								</p>
							</div>
							<div className={styles.terms}>
								<CheckBox value={checked}
									onChange={toggleChecked} />
								<p>
                  By clicking, you accept our <a href="#">Terms of use</a> and{' '}
									<a href="#">Privacy Policy</a>
								</p>
							</div>
							<div className={styles.action_ctn}>
								<PrimaryBtn disabled={!allFieldsValid}
									text="Open account" />
							</div>
						</form>
					</div>
				</div>
			</div>
		</AuthLayout>
	)
}

export default IndividualInformation
