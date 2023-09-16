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
import BackBtn from '@/components/Btn/Back'
import Input from '@/components/Dashboard/Input'

const BusinessInformation = () => {
	const { push } = useRouter()

	const { validEmail } = functions

	const [fullScreenLoader, setFullScreenLoader] = useState(false)

	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)
	const [businessName, setBusinessName] = useState('')
	const [businessId, setBusinessId] = useState('')
	const [businessEmail, setBusinessEmail] = useState('')
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
		'Limited Liability Partnership (LLP)',
	]

	const businessIndustries = [
		'Travel Agents',
		'Tour Operators',
		'Hospitality Service Providers (Hoteliers, rentals, Restaurants)',
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
		window.setTimeout(() => {
			setFullScreenLoader(false)
			push('/auth/signup/business/address')
		}, 3000)
	}

	const toggleChecked = () => {
		setChecked(!checked)
	}

	useEffect(() => {
		const conditionsMet =
      businessId &&
      businessName &&
      businessIndustry &&
      businessType &&
      validEmail(businessEmail) &&
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
		businessEmail,
		password,
		checked,
	])

	return (
		<AuthLayout LHSRequired={true} fullScreenLoader={fullScreenLoader} btn={{text: 'Log in', url: '/auth/login'}} pageTitle={'Signup'}>
			<div className={`${styles.auth} ${styles.no_pd_top}`}>
				<div className={styles.inner}>
					{/* <div className={styles.lhs}> */}
					<div className={styles.center}>
						<BackBtn emitClick={()=>push('/auth/signup')} />
						<h1 className="title">Provide Business Information</h1>
						<h4 className="sub-title media-max-700">
              We want to know how you want to operate on Passpoint
						</h4>
						<form className={styles.form} onSubmit={handleSubmit}>
							<div className={styles.inner}>
								<Input
									label="Business Name"
									id="business-name"
									name="business-name"
									placeholder="John Travels"
									value={businessName}
									onChange={(e) => setBusinessName(e.target.value)}
									error={ctaClicked && !businessName}
									errorMsg={'Business name is required'}
								/>
								<Input
									label="Business Email Address"
									id="business-email-address"
									name="business-email"
									placeholder="John@mail.com"
									value={businessEmail}
									onChange={(e) => setBusinessEmail(e.target.value)}
									error={ctaClicked && !validEmail(businessEmail)}
									errorMsg={!businessEmail ? 'Business email is required' : !validEmail(businessEmail) ? 'Valid business email is required' : 'Business email is required'}
								/>
								<Input
									id="business-type"
									label="Business Type"
									error={ctaClicked && !businessType}
									errorMsg="Business Type is required"
								>
									<CustomSelect
										id="business-type"
										selectOptions={businessTypes}
										selectedOption={businessType}
										fieldError={ctaClicked && !businessType}
										emitSelect={handleBusinessTypeSelect}
									/>
								</Input>
								<Input
									id="business-industry"
									label="Business Industry"
									error={ctaClicked && !businessIndustry}
									errorMsg="Business Industry is required"
								>
									<CustomSelect
										id="business-type"
										selectOptions={businessIndustries}
										selectedOption={businessIndustry}
										fieldError={ctaClicked && !businessIndustry}
										emitSelect={handleBusinessIndustrySelect}
									/>
								</Input>
								<Input
									label="Business Identification Number"
									id="business-id"
									name="businessId"
									placeholder="RC 0123456"
									value={businessId}
									onChange={(e) => setBusinessId(e.target.value)}
									error={ctaClicked && !businessId}
									errorMsg="Business ID No. required"
								/>
								<Input
									label="Password"
									id="password"
									name="password"
									placeholder="Password"
									error={ctaClicked && !password}
								>
									<PasswordField
										errorField={ctaClicked && !password}
										emitPassword={(e) => setPassword(e)}
									/>
								</Input>
							</div>
							<div className={`${styles.terms} ${ctaClicked && !checked ? styles.error : ''}`}>
								<CheckBox error={ctaClicked && !checked} value={checked}  onChange={toggleChecked} />
								<p>By clicking, you accept our <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a></p>
							</div>
							<div className={styles.action_ctn}>
								{/* <PrimaryBtn disabled={!allFieldsValid} text='Open account' /> */}
								<PrimaryBtn text="Open account" />
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

