import KYCLayout from '@/app/kyc-layout'
import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CustomSelect from '@/components/Custom/Select/Select'
// const CS = require('countrycitystatejson')

const BusinessAddress = () => {

	const { push } = useRouter()
	const [state, setState] = useState(undefined)
	const [streetNo, setStreetNo] = useState('')
	const [lga, setLga] = useState(undefined)
	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const states = [
		'Travel agent',
		'Travel agency',
		'Tour management',
		'Company'
	]
	const lgas = [
		'Travel agent',
		'Travel agency',
		'Tour management',
		'Company'
	]

	// const handleState = (e) => {
	// 	setState(e)
	// }
	// const handleLga = (e) => {
	// 	setLga(e)
	// }

	const handleSubmit = (e) => {
		e.preventDefault()
		push('/kyc/verify-bvn')
	}

	useEffect(()=>{
		if (state && lga && streetNo) {
			setAllFieldsValid(true)
		} else {
			setAllFieldsValid(false)
		}
	}, [state, lga, streetNo])

	return (
		<KYCLayout pageTitle={'Business Address'}>
			<div className={styles.auth}>
				<div className={styles.inner}>
					<div className={styles.center}>
						<h1>Add your business address 🏠</h1>
						<form className={styles.form}
							onSubmit={handleSubmit}>
							<div className={styles.inner}>
								<div className={styles.form_group}>
									<label htmlFor="street-no">Street no.</label>
									<input id="street-no"
										placeholder="91, Lagos road"
										value={streetNo}
										onChange={(e)=>setStreetNo(e.target.value)} />
								</div>
								<div className={styles.form_group}>
									<label>Select state</label>
									<CustomSelect selectOptions={states}
										selectedOption={state}
										emitSelect={(e)=>setState(e)} />
								</div>
								<div className={styles.form_group}>
									<label>Local Govt.</label>
									<CustomSelect disabled={!state}
										selectOptions={lgas}
										selectedOption={lga}
										emitSelect={(e)=>setLga(e)} />
								</div>
							</div>
							<div className={styles.action_ctn}>
								<PrimaryBtn disabled={!allFieldsValid}
									text={'Save and continue'} />
							</div>
						</form>
					</div>
				</div>
			</div>
		</KYCLayout>
	)
}

export default BusinessAddress
