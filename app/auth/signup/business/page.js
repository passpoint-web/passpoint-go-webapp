'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import PasswordField from '@/components/Auth/PasswordField'
import functions from '@/utils/functions'
import CheckBox from '@/components/Custom/Check/Check'
import CustomSelect from '@/components/Custom/Select/Select'
import BackBtn from '@/components/Btn/Back'
import Input from '@/components/Dashboard/Input'
import { businessIndustries, businessTypes } from '@/utils/CONSTANTS'
const BusinessInformation = () => {
	const { push, back } = useRouter()
	const { validEmail } = functions
	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)
	const [checked, setChecked] = useState(false)
	const [payload, setPayload] = useState({
		businessName: '',
		businessEmail: '',
		businessType: '',
		businessIndustry: '',
		businessId: '',
		password: ''
	})

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
		// window.setTimeout(() => {
		push('/auth/signup/business/address')
		// }, 3000)
	}

	const toggleChecked = () => {
		setChecked(!checked)
	}

	useEffect(() => {
		const {
			businessName,
			businessEmail,
			businessType,
			businessIndustry,
			businessId,
			password
		} = payload
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
		payload, checked
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
								error={ctaClicked && !payload.businessName}
								errorMsg={'Business name is required'}
							/>
							<Input
								label="Business Email Address"
								id="business-email-address"
								name="businessEmail"
								placeholder="John@mail.com"
								value={payload.businessEmail}
								onChange={handleChange}
								error={ctaClicked && !validEmail(payload.businessEmail)}
								errorMsg={!payload.businessEmail ? 'Business email is required' : !validEmail(payload.businessEmail) ? 'Valid business email is required' : 'Business email is required'}
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
								name="businessId"
								placeholder="RC 0123456"
								value={payload.businessId}
								onChange={handleChange}
								error={ctaClicked && !payload.businessId}
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
							<p>By clicking, you accept our <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a></p>
						</div>
						<div className={styles.action_ctn}>
							<PrimaryBtn text="Open account" />
						</div>
					</form>
					{/* </div> */}
				</div>
			</div>
		</div>
	)
}

export default BusinessInformation

