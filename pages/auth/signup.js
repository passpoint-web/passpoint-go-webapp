import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AuthLayout from '@/app/auth-layout'
import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import PasswordField from '@/components/Auth/PasswordField'
import CountrySelect from '@/components/Custom/CountrySelect'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
// import { registerUser } from '@/services/restService'
import functions from '@/utils/functions'
import { saveUserType, getUserType } from '@/services/localService'
import CheckBox from '@/components/Custom/Check/Check'
import ChoiceCard from '@/components/BusinessKind/ChoiceCard'

const Signup = () => {
	const { 
		push, replace, 
		// query 
	} = useRouter()
	// console.log(query)

	// const userTypeSet = getUserType()

	const {validEmail} = functions

	const [fullScreenLoader, setFullScreenLoader] = useState(false)

	const [option, setOption] = useState({})
	const [
		// eslint-disable-next-line no-unused-vars
		userType,
		setUserType
	] = useState(undefined)
	const [userTypeChosen, setUserTypeChosen] = useState(false)
	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)
	const [country, setCountry] = useState(undefined)
	const [lastName, setLastName] = useState('')
	const [firstName, setFirstName] = useState('')
	const [businessName, setBusinessName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')
	const [checked, setChecked] = useState(false)

	const onSetOption = (value) => {
		setOption(value)
	}

	const handleConfirmUserOption = (e) => {
		e.preventDefault()
		saveUserType(option.heading)
		setUserTypeChosen(true)
		replace(`/auth/signup?user-type=${option.heading}`)
	}

	const handlePhoneInput = ({phone}) => {
		setPhone(phone)
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		setCtaClicked(true)
		setFullScreenLoader(true)
		window.setTimeout(()=>{
			setFullScreenLoader(false)
			push('/auth/verify-email')
		}, 3000)
		// if (!allFieldsValid) {
		// 	return
		// }
		// const data = {
		// 	email,
		// 	firstname: firstName,
		// 	lastname: lastName,
		// 	phone,
		// 	business_name: businessName,
		// 	password,
		// 	country: country?.name?.common
		// }

		// try {
		// 	const response = await registerUser(data)
		// 	console.log(response)
		// } catch (err) { /* empty */ } 
		// finally { /* empty */ }
	}

	const toggleChecked = () => {
		setChecked(!checked)
	}

	useEffect(()=>{
		if (getUserType) {
			setUserType(getUserType)
		}
	},[])

	useEffect(()=>{
		const conditionsMet = country?.name.common && lastName && firstName && businessName && validEmail(email) && phone && password && checked
		if (conditionsMet) {
			setAllFieldsValid(true)
		} else {
			setAllFieldsValid(false)
		}
	}, [country?.name?.common, lastName, firstName, businessName, email, phone, password, checked])

	const BusinessKind = () => {
		return (
			<>
				<div className={styles.auth}>
					<div className={`${styles.inner} ${styles.business_type}`}>
						<div className={styles.center}>
							<h1 className="center">What kind of business are you?</h1>
							<h4 className="center">Select your category, So that you can accurately define your role and access the appropriate features of passpoint.</h4>
							<form className={styles.form} onSubmit={handleConfirmUserOption}>
								<div className={styles.inner}>
									<ChoiceCard emitSetOption={onSetOption} />
								</div>
								<div className={`${styles.action_ctn} ${styles.end}`}>
									<PrimaryBtn disabled={Object.keys(option).length === 0} text='Continue' />
								</div>
							</form>
						</div>
					</div>
				</div>
			</>
		)
	}

	const SignUpForm = () => {
		return (
			<>
				<div className={styles.auth}>
					<div className={styles.inner}>
						{/* <div className={styles.lhs}> */}
						<div className={styles.center}>
							<h1>
							Provide Business Information
								{/* <span>Hi,</span> 👋🏾 Give your customers the <br/> best traveling experience  */}
							</h1>
							<form className={styles.form} onSubmit={handleSubmit}>
								<div className={styles.inner}>
									<div className={`${styles.form_group} ${ctaClicked && !country ? styles.error : ''}`}>
										<label htmlFor="country">
                      Country
										</label>
										{/* <CountrySelect countriesSelectProps={countriesSelectProps} emitCountry={(e)=>{setCountry(e); setCountriesSelectProps(false)}} /> */}
										<CountrySelect emitCountry={(e)=>setCountry(e)} />
									</div>
									<div className={styles.form_row}>
										<div className={`${styles.form_group} ${ctaClicked && !lastName ? styles.error : ''}`}>
											<label htmlFor="last-name">Last name</label>
											<input placeholder="Doe" id="last-name" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
										</div>
										<div className={`${styles.form_group} ${ctaClicked && !firstName ? styles.error : ''}`}>
											<label htmlFor="first-name">First name</label>
											<input placeholder="John" id="first-name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
										</div>
									</div>
									<div>
										<div className={styles.form_group}>
											<label htmlFor="business-name">Business name</label>
											<input placeholder="John Travels" id="business-name" value={businessName} onChange={(e)=>setBusinessName(e.target.value)} />
										</div>
										<div className={styles.form_group}>
											<label htmlFor="email-address">Email address</label>
											<input placeholder="john@mail.com" id="email-address" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
										</div>
										<div className={`${styles.form_group} ${ctaClicked && !phone ? styles.error : ''}`}>
											<label htmlFor="phone-number">Phone number</label>
											{/* <PhoneSelect emitCountry={(e)=>setCountry(e)} /> */}
											{/* <PhoneInput
											international
											placeholder="Enter phone number"
											defaultCountry="NG"
											value={phone}
											onChange={setPhone}
										/> */}
											<PhoneInput
												country={'ng'}
												value={phone}
												onChange={phone => handlePhoneInput({ phone })}
											/>
										</div>
										<div className={styles.form_group}>
											<label htmlFor="password">Password</label>
											<PasswordField emitPassword={(e)=>setPassword(e)} />
										</div>
									</div>
								</div>
								<div className={styles.terms}>
									<CheckBox value={checked}  onChange={toggleChecked} />
									<p>By clicking, you accept our <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a></p>
								</div>
								<div className={styles.action_ctn}>
									<PrimaryBtn disabled={!allFieldsValid} text='Open account' />
								</div>
							</form>
							{/* </div> */}
						</div>
					</div>
				</div>
			</>
		)
	}

	return (
		<AuthLayout LHSRequired={userTypeChosen} fullScreenLoader={fullScreenLoader} btn={{text: 'Log in', url: '/auth/login'}} pageTitle={'Signup'}>
			{userTypeChosen === false ? BusinessKind() : SignUpForm()}
		</AuthLayout>
	)
}

export default Signup
