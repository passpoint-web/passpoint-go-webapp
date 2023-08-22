
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AuthLayout from '@/app/auth-layout'
import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import PasswordField from '@/components/Auth/PasswordField'
import CountrySelect from '@/components/Custom/CountrySelect'
// import PhoneSelect from '@/components/Custom/PhoneSelect'
import PhoneInput from 'react-phone-number-input'
// import { registerAgent } from '@/services/restService'
import functions from '@/utils/functions'
import Checkbox from '@/components/Custom/Checkbox/CheckBox'

const Signup = () => {
	// const router = useRouter()
	const { push } = useRouter()

	const {validEmail} = functions

	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)
	const [country, setCountry] = useState(undefined)
	const [
		// countriesSelectProps, 
		setCountriesSelectProps
	] = useState(false)
	const [lastName, setLastName] = useState('')
	const [firstName, setFirstName] = useState('')
	const [businessName, setBusinessName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')
	const [checked, setChecked] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()
		push('/auth/verify-email')
		setCtaClicked(true)
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
		// 	const response = await registerAgent(data)
		// 	console.log(response)
		// } catch (err) { /* empty */ } 
		// finally { /* empty */ }
	}

	const toggleChecked = () => {
		setChecked(!checked)
	}

	useEffect(()=>{
		const conditionsMet = country?.name.common && lastName && firstName && businessName && validEmail(email) && phone && password && checked
		if (conditionsMet) {
			setAllFieldsValid(true)
		} else {
			setAllFieldsValid(false)
		}
	}, [country?.name?.common, lastName, firstName, businessName, email, phone, password, checked])

	return (
		<AuthLayout btn={{text: 'Log in', url: '/auth/login'}} pageTitle={'Signup'}>
			<div className={styles.auth}>
				<div className={styles.inner}>
					<div className={styles.lhs}>
						<h1>
							<span>Hi,</span> 👋🏾 Give your customers the <br/> best traveling experience 
						</h1>
						<form className={styles.form} onSubmit={handleSubmit}>
							<div className={styles.inner}>
								<div className={`${styles.form_group} ${ctaClicked && !country ? styles.error : ''}`}>
									<label htmlFor="country" onClick={()=>setCountriesSelectProps(true)}>
										{/* <label htmlFor="country"> */}
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
										<PhoneInput
											international
											placeholder="Enter phone number"
											defaultCountry="NG"
											value={phone}
											onChange={setPhone}
										/>
									</div>
									<div className={styles.form_group}>
										<label htmlFor="password">Password</label>
										<PasswordField emitPassword={(e)=>setPassword(e)} />
									</div>
								</div>
							</div>
							<div className={styles.terms}>
								{/* <input type="checkbox" toggleCheck={toggleCheck} /> */}
								<Checkbox value={checked}  onChange={toggleChecked} />
								<p>By clicking, you accept our <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a></p>
							</div>
							<div className={styles.action_ctn}>
								<PrimaryBtn disabled={!allFieldsValid} text='Open account' />
							</div>
						</form>
					</div>
				</div>
			</div>
		</AuthLayout>
	)
}

export default Signup
