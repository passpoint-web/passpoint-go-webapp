import KYCLayout from '@/app/kyc-layout'
import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import { useState } from 'react'
import { useRouter } from 'next/router'
import CustomSelect from '@/components/Custom/Select/Select'

const VerifyBVN = () => {
	const { push } = useRouter()
	const [businessType, setBusinessType] = useState(undefined)
	const businessTypes = [
		'Travel agent',
		'Travel agency',
		'Tour management',
		'Company'
	]

	const handleSelect = (e) => {
		setBusinessType(e)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		push('/kyc/business-address')
	}

	return (
		<KYCLayout pageTitle={'Verify Your BVN'}>
			<div className={styles.auth}>
				<div className={styles.inner}>
					<div className={styles.center}>
						<h1>Help us get to know you better 🥳</h1>
						<form className={styles.form}
							onSubmit={handleSubmit}>
							<div className={styles.inner}>
								<div className={styles.form_group}>
									<label>Select your type of business</label>
									<CustomSelect id="business-type"
										selectOptions={businessTypes}
										selectedOption={businessType}
										emitSelect={handleSelect} />
								</div>
							</div>
							<div className={styles.action_ctn}>
								<PrimaryBtn disabled={!businessType}
									text={'Save and continue'} />
							</div>
						</form>
					</div>
				</div>
			</div>
		</KYCLayout>
	)
}

export default VerifyBVN
