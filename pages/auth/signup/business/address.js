import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CustomSelect from '@/components/Custom/Select/Select'
import AuthLayout from '@/app/auth-layout'
import CountrySelect from '@/components/Custom/CountrySelect'
import BackBtn from '@/components/Btn/Back'
// import functions from '@/utils/functions'
// eslint-disable-next-line no-undef
const CS = require('countrycitystatejson')
// const countries = CS.getCountries()

const BusinessAddress = () => {

	const { push } = useRouter()
	const [streetNo, setStreetNo] = useState('')
	const [lga, setLga] = useState(undefined)
	const [country, setCountry] = useState(undefined)
	const [state, setState] = useState(undefined)
	const [states, setStates] = useState([])
	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [fullScreenLoader, setFullScreenLoader] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)
	const [lgas, setLGAs] = useState([])

	// const handleState = (e) => {
	// 	setState(e)
	// }
	// const handleLga = (e) => {
	// 	setLga(e)
	// }

	const handleSubmit = (e) => {
		e.preventDefault()
		push('/auth/signup/business/verify') 
	}

	const handleSetCountry = (e) => {
		setCountry(e)
		setStates(CS.getStatesByShort(e.cca2)) // cca2: country's shortname
	}

	const handleSetState = (e) => {
		setState(e)
		setLGAs(CS.getCities(country.cca2, e))
	}

	useEffect(()=>{
		if (state && lga && streetNo) {
			setAllFieldsValid(true)
		} else {
			setAllFieldsValid(false)
		}
	}, [state, lga, streetNo])

	// useEffect(()=>{
	// console.log(country)
	// console.log(CS)
	// console.log(CS.getStatesByShort('NG'))
	// }, [country])

	return (
		<AuthLayout LHSRequired={true} fullScreenLoader={fullScreenLoader} btn={{text: 'Log in', url: '/auth/login'}} pageTitle={'Signup'}>
			<div className={styles.auth}>
				<div className={styles.inner}>
					<div className={styles.center}>
						<BackBtn emitClick={()=>push('/auth/signup/business/info')} />
						<h1 className="title">Add your business address 🏠</h1>
						<form className={styles.form} onSubmit={handleSubmit}>
							<div className={styles.inner}>
								<div className={`${styles.form_group} ${ctaClicked && !country ? styles.error : ''}`}>
									<label htmlFor="country">
                      Country
									</label>
									<CountrySelect emitCountry={(e)=>handleSetCountry(e)} />
								</div>
								<div className={styles.form_group}>
									<label>Select state</label>
									<CustomSelect disabled={!country?.name?.common} selectOptions={states} selectedOption={state} emitSelect={(e)=>handleSetState(e)} />
								</div>
								<div className={styles.form_group}>
									<label>Local Govt.</label>
									<CustomSelect disabled={!state} selectOptions={lgas} selectedOption={lga} emitSelect={(e)=>setLga(e)} />
								</div>
								<div className={styles.form_group}>
									<label htmlFor="street-no">Street no.</label>
									<input id="street-no" placeholder="91, Lagos road" value={streetNo} onChange={(e)=>setStreetNo(e.target.value)} />
								</div>
							</div>
							<div className={styles.action_ctn}>
								<PrimaryBtn disabled={!allFieldsValid} text={'Save and continue'} />
							</div>
						</form>
					</div>
				</div>
			</div>
		</AuthLayout>
	)
}

export default BusinessAddress
