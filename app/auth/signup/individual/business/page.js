'use client'
import styles from '@/assets/styles/auth-screens.module.css'
import { useRouter } from 'next/navigation'
import { businessIndustries } from '@/utils/CONSTANTS'
import { useState, useEffect, useCallback } from 'react'
import { registerUser } from '@/services/restService'
import { getCredentials, saveCredentials } from '@/services/localService'
import CustomSelect from '@/components/Custom/Select'
import PrimaryBtn from '@/components/Btn/Primary'
// import BackBtn from '@/components/Btn/Back'
import Input from '@/components/Dashboard/Input'
import toast from '@/components/Toast'
import PasspointBusinessModal from '@/components/Modal/PasspointBusiness'

const BusinessInformation = () => {
	// eslint-disable-next-line no-unused-vars
	const { push, back } = useRouter()
	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [showBusinessWarning, setShowBusinessWarning] = useState(false)
	const [payload, setPayload] = useState({
		businessName: '',
		businessIndustry: '',
	})

	const savedCredentials = getCredentials()

	const notify = useCallback((type, message) => {
		toast({ type, message })
	}, [])

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
			const response = await registerUser('onBoardIndividualBusinessInfo', {email: savedCredentials.email, ...payload})
			console.log(response)
			// setSignupLevel({'business', 2})
			saveCredentials({...savedCredentials, ...payload, regStage: 2})
			notify('success', 'Your business information has been saved')
			push('/auth/signup/individual/address')
		} catch (_err) {
			const { message } = _err.response?.data || _err
			notify('error', message)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(function delayBusinessWarningModal() {
		window.setTimeout(()=>{
			setShowBusinessWarning(true)
		}, 1000)
	},[])

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
		<>
			{
				showBusinessWarning ? 
				<PasspointBusinessModal 
					onClose={()=>setShowBusinessWarning(false)} 
				/> : 
				<></>
			}
			<div className={`${styles.auth} ${styles.no_pd_top}`}>
				<div className={styles.inner}>
					<div className={styles.center}>
						{/* <BackBtn onClick={() => back()} /> */}
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
									loading={isLoading}
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default BusinessInformation
