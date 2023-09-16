import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AuthLayout from '@/app/auth-layout'
import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import CheckBox from '@/components/Custom/Check/Check'
import BackBtn from '@/components/Btn/Back'

const BusinessPersonalInfo = () => {
	const { push } = useRouter()
	const [fullScreenLoader, setFullScreenLoader] = useState(false)

	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [phone, setPhone] = useState('')
	const [checked, setChecked] = useState(false)

	const handlePhoneInput = ({ phone }) => {
		setPhone(phone)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setCtaClicked(true)
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
		const conditionsMet = firstName && lastName && phone && checked
		if (conditionsMet) {
			setAllFieldsValid(true)
		} else {
			setAllFieldsValid(false)
		}
	}, [firstName, lastName, phone, checked])

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
						<BackBtn emitClick={() => push('/auth/signup/business/address')} />
						<h1 className="title">Personal Information</h1>
						<h4 className="sub-title media-max-700">
              Kindly provide personal information
						</h4>
						<form className={styles.form} onSubmit={handleSubmit}>
							<div className={styles.inner}>
								<div className={styles.form_row}>
									<div className={styles.form_group}>
										<label htmlFor="last-name">Last Name</label>
										<input
											placeholder="Doe"
											id="last-name"
											value={lastName}
											onChange={(e) => setLastName(e.target.value)}
										/>
									</div>
									<div className={styles.form_group}>
										<label htmlFor="first-name">First Name</label>
										<input
											placeholder="Jon"
											id="first-name"
											value={firstName}
											onChange={(e) => setFirstName(e.target.value)}
										/>
									</div>
								</div>
								<div
									className={`${styles.form_group} ${
										ctaClicked && !phone ? styles.error : ''
									}`}
								>
									<label htmlFor="phone-number">Phone number</label>
									<PhoneInput
										country={'ng'}
										value={phone}
										onChange={(phone) => handlePhoneInput({ phone })}
									/>
								</div>
								<div className={styles.terms}>
									<CheckBox value={checked} onChange={toggleChecked} />
									<p>
                    By clicking, you indicate your role as the owner or manager
                    of the business
									</p>
								</div>
								<div className={styles.terms}>
									<CheckBox value={checked} onChange={toggleChecked} />
									<p>
                    By clicking, you accept our <a href="#">Terms of use</a> and{' '}
										<a href="#">Privacy Policy</a>
									</p>
								</div>
								<div className={styles.action_ctn}>
									<PrimaryBtn disabled={!allFieldsValid} text="Open account" />
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
