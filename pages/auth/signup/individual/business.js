import AuthLayout from '@/app/auth-layout'
import styles from '@/assets/styles/auth-screens.module.css'
import { useRouter } from 'next/router'
import React from 'react'
import { useState, useEffect } from 'react'
import CustomSelect from '@/components/Custom/Select/Select'
import PrimaryBtn from '@/components/Btn/Primary'
import BackBtn from '@/components/Btn/Back'
import { businessIndustries } from '@/utils/CONSTANTS'
import Input from '@/components/Dashboard/Input'

const BusinessInformation = () => {
	const { push } = useRouter()
	const [fullScreenLoader, setFullScreenLoader] = useState(false)
	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)
	const [payload, setPayload] = useState({
		businessName: '',
		businessIndustry: '',
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
		setFullScreenLoader(true)
		window.setTimeout(() => {
			setFullScreenLoader(false)
			push('/auth/signup/individual/address')
		}, 3000)
	}

	useEffect(() => {
		const {businessIndustry, businessName} = payload
		const conditionsMet = businessName && businessIndustry
		if (conditionsMet) {
			setAllFieldsValid(true)
		} else {
			setAllFieldsValid(false)
		}
	}, [payload])

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
						<BackBtn onClick={() => push('/auth/signup/individual')} />
						<h1 className="title">Register your business with Passpoint</h1>
						<h4 className="sub-title media-max-700">
              We want to know how you want to operate on Passpoint
						</h4>
						<form className={styles.form}
							onSubmit={handleSubmit}>
							<div className={styles.inner}>
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
									label="Business Name"
									id="business-name"
									name="businessName"
									placeholder="John Travels"
									value={payload.businessName}
									onChange={handleChange}
									error={ctaClicked && !payload.businessName}
									errorMsg={'Business name is required'}
								/>
							</div>
							<div className={styles.action_ctn}>
								<PrimaryBtn
									text="Save and continue"
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</AuthLayout>
	)
}

export default BusinessInformation
