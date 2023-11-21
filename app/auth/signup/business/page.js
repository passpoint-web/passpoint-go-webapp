'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { businessIndustries, businessTypes } from '@/utils/CONSTANTS'
import { authenticate } from '@/services/restService'
import { saveCredentials } from '@/services/localService'
import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import PasswordField from '@/components/Auth/PasswordField'
import functions from '@/utils/functions'
import CheckBox from '@/components/Custom/Check'
import CustomSelect from '@/components/Custom/Select'
import BackBtn from '@/components/Btn/Back'
import Input from '@/components/Dashboard/Input'
import { useNotify } from '@/utils/hooks'
// import StatusInput from '@/components/Dashboard/StatusInput'

const BusinessInformation = () => {

	// eslint-disable-next-line no-unused-vars
	const { push, back } = useRouter()
	const { validEmail } = functions
	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)
	const [checked, setChecked] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [feedbackError, setFeedbackError] = useState('')
	const [businessNameCheckVerified, setBusinessNameCheckVerified] = useState(null)
	const [businessNameChecking, setBusinessNameChecking] = useState(false)
	const [timeOut, setTimeOut] = useState(null)
	const [payload, setPayload] = useState({
		businessName: '',
		email: '',
		businessType: '',
		businessIndustry: '',
		rcNumber: '',
		password: ''
	})

	const notify = useNotify()

	const handleChange = (e) => {
		const { name, value } = e.target
		setPayload((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setCtaClicked(true)
		if (!allFieldsValid) {
			return
		}
		setIsLoading(true)
		try {
			await authenticate.registerUser('onBoardUserBusinessInfo', payload)
			let credentials = {...payload, regStage: 1}
			delete credentials.password
			saveCredentials(credentials)
			notify('success', 'Your account has been created successfully')
			push('/auth/signup/business/address')
		} catch (_err) {
			const { message } = _err.response?.data || _err
			setFeedbackError(message)
			notify('error', message)
		} finally {
			setIsLoading(false)
		}
	}

	const toggleChecked = () => {
		setChecked(!checked)
	}

	useEffect(()=>{
		if (payload.businessName.length) {
			clearTimeout(timeOut)
			const val = setTimeout(()=>{
				businessNameCheck()
			},1000)
			setTimeOut(val)
		}
	},[payload.businessName])

	const businessNameCheck = async () => {
		const {businessName} = payload
		setBusinessNameChecking(true)
		setBusinessNameCheckVerified(null)
		try {
			await authenticate.checkBusinessName({
				businessName: businessName.trim()
			})
			// console.log(response)
			setBusinessNameCheckVerified(true)
		} catch (_err) { 
			// const { message } = _err.response?.data || _err
			// console.log(message)
			setBusinessNameCheckVerified(false)
			// notify('error', message)
		} finally {
			setIsLoading(false)
			setBusinessNameChecking(false)
		}
	}

	useEffect(() => {
		setFeedbackError('')
		const {
			businessName,
			email,
			businessType,
			businessIndustry,
			rcNumber,
			password
		} = payload

		const conditionsMet =
      rcNumber &&
      businessName &&
      businessIndustry &&
      businessType &&
      validEmail(email) &&
      password && businessNameCheckVerified &&
      checked
		if (conditionsMet) {
			setAllFieldsValid(true)
		} else {
			setAllFieldsValid(false)
		}
	}, [
		payload, checked, businessNameCheckVerified
	])

	return (
		<div className={`${styles.auth} ${styles.no_pd_top}`}>
			<div className={styles.inner}>
				{/* <div className={styles.lhs}> */}
				<div className={styles.center}>
					<BackBtn onClick={()=>back()} />
					<h1 className="title">Provide Business Information</h1>
					<h4 className="sub-title media-max-700">
              We want to know how you want to operate on Passpoint
					</h4>
					<form className={styles.form}
						onSubmit={handleSubmit}>
						<div className={styles.inner}>
							<Input
								label="Business Name"
								id="business-name"
								name="businessName"
								placeholder="John Travels"
								value={payload.businessName}
								onChange={handleChange}
								error={(ctaClicked && !payload.businessName) ||businessNameCheckVerified === false}
								errorMsg={(ctaClicked && !payload.businessName) ? 'Business name is required' : businessNameCheckVerified === false ? 'A Business with this name already exists' : businessNameChecking ? 'Checking' : ''}
								info={(ctaClicked && !payload.businessName) ? 'Business name is required' : businessNameCheckVerified === false ? 'A Business with this name already exists' : businessNameChecking ? 'Checking' : ''}
								successMsg={businessNameCheckVerified === true && payload.businessName.length ? 'Business name is valid' : ''}
							/>
							<Input
								label="Business Email Address"
								id="business-email-address"
								name="email"
								type='email'
								placeholder="John@mail.com"
								value={payload.email}
								onChange={handleChange}
								error={ctaClicked && (!validEmail(payload.email) || feedbackError.toLowerCase().includes('email'))}
								errorMsg={!payload.email ? 'Business email is required' : !validEmail(payload.email) ? 'Valid business email is required' :  feedbackError.toLowerCase().includes('email') ? feedbackError : 'Business email is required'}
							/>
							<Input
								id="business-type"
								label="Business Type"
								error={ctaClicked && !payload.businessType}
								errorMsg="Business Type is required"
							>
								<CustomSelect
									id="business-type"
									selectOptions={businessTypes}
									selectedOption={payload.businessType}
									fieldError={ctaClicked && !payload.businessType}
									emitSelect={(option) =>
										handleChange({
											target: { name: 'businessType', value: option },
										})
									}
								/>
							</Input>
							<Input
								id="business-industry"
								label="Business Industry"
								error={ctaClicked && !payload.businessIndustry}
								errorMsg="Business Industry is required"
							>
								<CustomSelect
									id="business-type"
									selectOptions={businessIndustries}
									selectedOption={payload.businessIndustry}
									fieldError={ctaClicked && !payload.businessIndustry}
									emitSelect={(option) =>
										handleChange({
											target: { name: 'businessIndustry', value: option },
										})
									}
								/>
							</Input>
							<Input
								label="Business Identification Number"
								id="business-id"
								name="rcNumber"
								placeholder="RC 0123456"
								value={payload.rcNumber}
								onChange={handleChange}
								error={ctaClicked && !payload.rcNumber}
								errorMsg="Business ID No. required"
							/>
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
						</div>
						<div className={`${styles.terms} ${ctaClicked && !checked ? styles.error : ''}`}>
							<CheckBox error={ctaClicked && !checked}
								value={checked}
								onChange={toggleChecked} />
							<p>By clicking, you accept our <a href="https://mypasspoint.com/terms_and_conditions"
								rel='noreferrer'
								target='_blank'>Terms of use</a> and <a href="https://mypasspoint.com/privacy_policy"
								rel='noreferrer'
								target='_blank'>Privacy Policy</a>
							</p>
						</div>
						<div className={styles.action_ctn}>
							<PrimaryBtn text="Open Account"
								loading={isLoading} />
						</div>
					</form>
					{/* </div> */}
				</div>
			</div>
		</div>
	)
}

export default BusinessInformation

