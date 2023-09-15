import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AuthLayout from '@/app/auth-layout'
import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import PasswordField from '@/components/Auth/PasswordField'
// import CountrySelect from '@/components/Custom/CountrySelect'
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'
// import { registerUser } from '@/services/restService'
import functions from '@/utils/functions'
import CheckBox from '@/components/Custom/Check/Check'
import CustomSelect from '@/components/Custom/Select/Select'
import FeedbackInfo from '@/components/FeedbackInfo'

const BusinessInformation = () => {
	const {
		push
	} = useRouter()

	const {validEmail} = functions

	const [fullScreenLoader, setFullScreenLoader] = useState(false)

	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)
	const [businessName, setBusinessName] = useState('')
	const [businessId, setBusinessId] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [checked, setChecked] = useState(false)	
	const [businessType, setBusinessType] = useState(undefined)
	const [businessIndustry, setBusinessIndustry] = useState(undefined)

	const businessTypes = [
		'Sole Proprietorship',
		'Partnership',
		'Limited Liability Company (LLC)',
		'Cooperation',
		'Cooperative',
		'Limited Liability Partnership (LLP)'
	]

	const businessIndustries = [
		'Travel Agents',
		'Tour Operators',
		'Hospitality Service Providers (Hoteliers, rentals, Restaurants)'
	]

	const handleBusinessTypeSelect = (e) => {
		setBusinessType(e)
	}
	const handleBusinessIndustrySelect = (e) => {
		setBusinessIndustry(e)
	}

	const handleSubmit = async (e) => {
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

	const toggleChecked = () => {
		setChecked(!checked)
	}

	useEffect(()=>{
		const conditionsMet =
		businessId && 
		businessName &&
		businessIndustry && 
		businessType && 
		validEmail(email) &&
		password && 
		checked
		if (conditionsMet) {
			setAllFieldsValid(true)
		} else {
			setAllFieldsValid(false)
		}
	}, [
		businessId, 
		businessName,
		businessIndustry,
		businessType,
		email,
		password, 
		checked
	])

	return (
		<AuthLayout LHSRequired={true} fullScreenLoader={fullScreenLoader} btn={{text: 'Log in', url: '/auth/login'}} pageTitle={'Signup'}>
			<div className={`${styles.auth} ${styles.no_pd_top}`}>
				<div className={styles.inner}>
					{/* <div className={styles.lhs}> */}
					<div className={styles.center}>
						<h1 className="title">
							Provide Business Information
						</h1>
						<h4 className="sub-title media-max-700">We want to know how you want to operate on Passpoint</h4>
						<form className={styles.form} onSubmit={handleSubmit}>
							<div className={styles.inner}>
								<div className={`${styles.form_group} ${ctaClicked && !businessName ? styles.error : ''}`}>
									<label htmlFor="business-name">Business Name</label>
									<input placeholder="John Travels" id="business-name" value={businessName} onChange={(e)=>setBusinessName(e.target.value)} />
									{ctaClicked && !businessName ? <FeedbackInfo message='Business name needed' /> : <></>}
								</div>
								<div className={`${styles.form_group} ${ctaClicked && !validEmail(email) ? styles.error : ''}`}>
									<label htmlFor="email-address">Business Email Address</label>
									<input placeholder="john@mail.com" id="email-address" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
									{ctaClicked && !validEmail(email) ? <FeedbackInfo message={!email ? 'Business email is required' : !validEmail(email) ? 'Valid business email is required' : 'Business email is required'} /> : <></>}
									{/* {ctaClicked && !validEmail(email) ? <FeedbackInfo message='Business email needed' /> : <></>} */}
								</div>
								<div className={`${styles.form_group}`}>
									<label>Business Type</label>
									<CustomSelect id="business-type" selectOptions={businessTypes} selectedOption={businessType} fieldError={ctaClicked && !businessType} emitSelect={handleBusinessTypeSelect} />
									{ctaClicked && !businessType? <FeedbackInfo message='Business type needed' /> : <></>}
								</div>
								<div className={styles.form_group}>
									<label>Business Industry</label>
									<CustomSelect id="business-industry" selectOptions={businessIndustries} selectedOption={businessIndustry} fieldError={ctaClicked && !businessIndustry} emitSelect={handleBusinessIndustrySelect} />
									{ctaClicked && !businessIndustry? <FeedbackInfo message='Business industry needed' /> : <></>}
								</div>
								<div className={`${styles.form_group} ${ctaClicked && !businessId ? styles.error : ''}`}>
									<label htmlFor="business-id">Business Identification Number</label>
									<input placeholder="RC 0123456" id="business-id" value={businessId} onChange={(e)=>setBusinessId(e.target.value)} />
									{ctaClicked && !businessId? <FeedbackInfo message='Business ID No. needed' /> : <></>}
								</div>
								<div className={`${styles.form_group} ${ctaClicked && !password ? styles.error : ''}`}>
									<label htmlFor="password">Password</label>
									<PasswordField errorField={ctaClicked && !password} emitPassword={(e)=>setPassword(e)} />
								</div>
							</div>
							<div className={`${styles.terms} ${ctaClicked && !checked ? styles.error : ''}`}>
								<CheckBox error={ctaClicked && !checked} value={checked}  onChange={toggleChecked} />
								<p>By clicking, you accept our <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a></p>
							</div>
							<div className={styles.action_ctn}>
								{/* <PrimaryBtn disabled={!allFieldsValid} text='Open account' /> */}
								<PrimaryBtn text='Open account' />
							</div>
						</form>
						{/* </div> */}
					</div>
				</div>
			</div>
		</AuthLayout>
	)
}

export default BusinessInformation