import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AuthLayout from '@/app/auth-layout'
import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import CheckBox from '@/components/Custom/Check/Check'
import BackBtn from '@/components/Btn/Back'
import Input from '@/components/Dashboard/Input'

const BusinessPersonalInfo = () => {
	const { push } = useRouter()
	const [fullScreenLoader, setFullScreenLoader] = useState(false)

	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)
	const [termsAccepted, setTermsAccepted] = useState(false)
	const [roleConfirmed, setRoleConfirmed] = useState(false)

	const [payload, setPayload] = useState({
		lastName: '',
		firstName: '',
		phone: ''
	})
	const handleChange = (e) => {
		const { name, value } = e.target
		setPayload((prevState) => ({
			...prevState,
			[name]: value
		}))
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
			push('/auth/signup/business/verify')
		}, 3000)
	}


	useEffect(() => {
		const {firstName, lastName, phone} = payload
		const conditionsMet = firstName && lastName && phone && termsAccepted && roleConfirmed
		if (conditionsMet) {
			setAllFieldsValid(true)
		} else {
			setAllFieldsValid(false)
		}
	}, [payload, termsAccepted, roleConfirmed])

	return (
		<AuthLayout
			LHSRequired={true}
			fullScreenLoader={fullScreenLoader}
			btn={{ text: 'Log in', url: '/auth/login' }}
			pageTitle={'Signup'}
		>
			<div className={`${styles.auth} ${styles.no_pd_top}`}>
				<div className={styles.inner}>
					<div className={styles.center}>
						<BackBtn onClick={() => push('/auth/signup/business/address')} />
						<h1 className="title">Personal Information</h1>
						<h4 className="sub-title media-max-700">
              Kindly provide personal information
						</h4>
						<form className={styles.form}
							onSubmit={handleSubmit}>
							<div className={styles.inner}>
								<div className={styles.form_row}>
									<Input
										label="Last Name"
										id="last-name"
										name="lastName"
										placeholder="Doe"
										value={payload.lastName}
										onChange={handleChange}
										error={ctaClicked && !payload.lastName}
										errorMsg="Last Name is required"
									/>
									<Input
										label="First Name"
										id="first-name"
										name="firstName"
										placeholder="Jon"
										value={payload.firstName}
										onChange={handleChange}
										error={ctaClicked && !payload.firstName}
										errorMsg="First Name is required"
									/>
								</div>
								<Input
									id="phone"
									label="Phone number"
									error={ctaClicked && !payload.phone}
									errorMsg="Phone is required"
								>
									<PhoneInput
										country={'ng'}
										value={payload.phone}
										onChange={(phone) => handleChange({ target: { name: 'phone', value: phone } })}
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
									<PrimaryBtn
										text="Open account" />
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</AuthLayout>
	)
}

export default BusinessPersonalInfo
