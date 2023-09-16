import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CustomSelect from '@/components/Custom/Select/Select'
import AuthLayout from '@/app/auth-layout'
import CountrySelect from '@/components/Custom/CountrySelect'
import BackBtn from '@/components/Btn/Back'
import Input from '@/components/Dashboard/Input'
// eslint-disable-next-line no-undef
const CS = require('countrycitystatejson')

const BusinessAddress = () => {
	const { push } = useRouter()
	const [states, setStates] = useState([])
	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [fullScreenLoader, setFullScreenLoader] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)
	const [LGAs, setLGAs] = useState([])
	const [payload, setPayload] = useState({
		country: '',
		state: '',
		LGA: '',
		streetNo: ''
	})

	const handleChange = (e) => {
		const { name, value } = e.target
		setPayload((prevState) => ({
			...prevState,
			[name]: value
		}))
		const resetState = name === 'country' && value.name.common !== payload.country?.name?.common
		const resetLGA = name === 'state' && value !== payload.state
		if (resetState) {
			setPayload((prevState) => ({
				...prevState,
				state: '',
			}))
		}

		if (resetState || resetLGA) {
			setPayload((prevState) => ({
				...prevState,
				LGA: '',
			}))
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setCtaClicked(true)
		if (!allFieldsValid) {
			return
		}
		setFullScreenLoader(true)
		window.setTimeout(() => {
			setFullScreenLoader(false)
			push('/auth/signup/business/personal')
		}, 3000)
	}

	useEffect(()=>{
		setStates(CS.getStatesByShort(payload?.country?.cca2)) // cca2: country's shortname
	},[payload.country?.name?.common])

	useEffect(()=>{
		setLGAs(CS.getCities(payload?.country?.cca2, payload.state))
	},[payload.state])

	useEffect(() => {
		const {country, state, LGA, streetNo} = payload
		const LGANeeded = LGAs?.length ? LGA : false
		if (country?.name?.common && state && LGANeeded && streetNo) {
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
						<BackBtn onClick={() => push('/auth/signup/business')} />
						<h1 className="title">Add your business address 🏠</h1>
						<h4 className="sub-title media-max-700">
              Kindly provide personal information
						</h4>
						<form className={styles.form}
							onSubmit={handleSubmit}>
							<div className={styles.inner}>
								<Input
									id="country"
									label="Country"
									error={ctaClicked && !payload.country?.name?.common}
									errorMsg="Country is required"
								>
									<CountrySelect
										fieldError={ctaClicked && !payload.country?.name?.common}
										emitCountry={(option) =>
											handleChange({
												target: { name: 'country', value: option },
											})}
									/>
								</Input>
								<Input
									id="state"
									label="Select state"
									error={ctaClicked && !payload.state}
									errorMsg="State is required"
								>
									<CustomSelect
										disabled={!payload.country?.name?.common}
										fieldError={ctaClicked && !payload.state}
										selectOptions={states}
										selectedOption={payload.state}
										emitSelect={(e) => handleChange({
											target: { name: 'state', value: e },
										})}
									/>
								</Input>
								<Input
									id="LGA"
									label="Select Local Govt."
									error={ctaClicked && payload.state && (LGAs?.length && !payload.LGA)}
									errorMsg="LGA is required"
								>
									<CustomSelect
										disabled={!payload.state}
										fieldError={ctaClicked && payload.state && (LGAs?.length && !payload.LGA)}
										selectOptions={LGAs}
										selectedOption={payload.LGA}
										emitSelect={(e) => handleChange({
											target: { name: 'LGA', value: e },
										})}
									/>
								</Input>
								<Input
									label="Street No."
									id="street-no"
									name="streetNo"
									placeholder="91, Lagos road"
									value={payload.streetNo}
									onChange={handleChange}
									error={ctaClicked && !payload.streetNo}
									errorMsg="Street No. is required"
								/>
							</div>
							<div className={styles.action_ctn}>
								<PrimaryBtn text={'Save and continue'} />
							</div>
						</form>
					</div>
				</div>
			</div>
		</AuthLayout>
	)
}

export default BusinessAddress
