'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveCredentials } from '@/services/localService'
import { registerUser } from '@/services/restService'
import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import PasswordField from '@/components/Auth/PasswordField'
import 'react-phone-input-2/lib/style.css'
import functions from '@/utils/functions'
import CheckBox from '@/components/Custom/Check'
import PhoneInput from 'react-phone-input-2'
import BackBtn from '@/components/Btn/Back'
import Input from '@/components/Dashboard/Input'
import { useNotify } from '@/utils/hooks'

const IndividualInformation = () => {
	const { push, back } = useRouter()
	const { validEmail } = functions
	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)
	const [termsAccepted, setTermsAccepted] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [roleConfirmed, setRoleConfirmed] = useState(false)
	const [feedbackError, setFeedbackError] = useState('')

	const [payload, setPayload] = useState({
		lastName: '',
		firstName: '',
		email: '',
		phone: '',
		password: '',
	})

	const notify = useNotify()

	const handleChange = (e) => {
		const { name, value } = e.target
		setPayload((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	useEffect(() => {
		setFeedbackError('')
		const {firstName, lastName, password, email} = payload
		const conditionsMet =
      lastName &&
      firstName &&
      validEmail(email) &&
      password &&
			termsAccepted &&
			roleConfirmed
		if (conditionsMet) {
			setAllFieldsValid(true)
		} else {
			setAllFieldsValid(false)
		}
	}, [payload, termsAccepted, roleConfirmed])

	const handleSubmit = async (e) => {
		e.preventDefault()
		setCtaClicked(true)
		if (!allFieldsValid) {
			return
		}
		setIsLoading(true)
		try {
			const response = await registerUser('onBoardIndividualPersonalInfo', {...payload, phone: `+${payload.phone}`})
			console.log(response)
			let credentials = {...payload, regStage: 1}
			delete credentials.password
			saveCredentials(credentials)
			notify('success', 'Your account has been created successfully')
			push('/auth/signup/individual/business')
		} catch (_err) {
			const { message } = _err.response?.data || _err
			setFeedbackError(message)
			notify('error', message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className={`${styles.auth} ${styles.no_pd_top}`}>
			<div className={styles.inner}>
				<div className={styles.center}>
					<BackBtn onClick={()=>back()} />
					<p>{feedbackError.toLowerCase().includes('email')}</p>
					<h1 className="title">Personal Information</h1>
					<h4 className='sub-title media-max-700'>Kindly provide personal information</h4>
					<form className={styles.form}
						onSubmit={handleSubmit}>
						<div className={styles.inner}>
							<div className={styles.form_row}>
								<Input
									label="Last Name"
									id="last-name"
									name="lastName"
									placeholder="John"
									value={payload.lastName}
									onChange={handleChange}
									error={ctaClicked && !payload.lastName}
									errorMsg={'Last name is required'}
								/>
								<Input
									label="First Name"
									id="first-name"
									name="firstName"
									placeholder="Travels"
									value={payload.firstName}
									onChange={handleChange}
									error={ctaClicked && !payload.firstName}
									errorMsg={'First name is required'}
								/>
							</div>
							<Input
								label="Email Address"
								id="email-address"
								name="email"
								placeholder="John@mail.com"
								value={payload.email}
								onChange={handleChange}
								error={ctaClicked && (!validEmail(payload.email) || feedbackError.toLowerCase().includes('email'))}
								errorMsg={!payload.email ? 'Email is required' : !validEmail(payload.email) ? 'Valid email is required' : feedbackError.toLowerCase().includes('email') ? feedbackError : 'Email is required'}
							/>
							<Input
								id="phone"
								label="Phone Number"
								error={ctaClicked && !payload.phone || feedbackError.toLowerCase().includes('phone')}
								errorMsg={!payload.phone ? 'Phone is required' : feedbackError.toLowerCase().includes('phone') ? feedbackError : 'Phone is required'}
							>
								<PhoneInput
									country={'ng'}
									value={payload.phone}
									onChange={(phone) => handleChange({ target: { name: 'phone', value: phone } })}
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
									errorField={ctaClicked && !payload.password}
									emitPassword={(e) =>
										handleChange({
											target: { name: 'password', value: e },
										})
									}
								/>
							</Input>
							<div className={`${styles.terms} ${ctaClicked && !roleConfirmed ? styles.error : ''}`}>
								<CheckBox value={roleConfirmed}
									error={ctaClicked && !roleConfirmed}
									onChange={()=>setRoleConfirmed(!roleConfirmed)} />
								<p>
                    By clicking, you indicate your role as the owner or manager
                    of the business
								</p>
							</div>
							<div className={`${styles.terms} ${ctaClicked && !termsAccepted ? styles.error : ''}`}>
								<CheckBox value={termsAccepted}
									error={ctaClicked && !termsAccepted}
									onChange={()=>setTermsAccepted(!termsAccepted)} />
								<p>
                    By clicking, you accept our <a href="#">Terms of use</a> and{' '}
									<a href="#">Privacy Policy</a>
								</p>
							</div>
							<div className={styles.action_ctn}>
								<PrimaryBtn text="Open account"
									loading={isLoading} />
							</div>

						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default IndividualInformation
