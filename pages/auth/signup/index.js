import { useState } from 'react'
import { useRouter } from 'next/router'
import AuthLayout from '@/app/auth-layout'
import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import { saveUserType } from '@/services/localService'
import ChoiceCard from '@/components/BusinessKind/ChoiceCard'
import FeedbackInfo from '@/components/FeedbackInfo'

const Signup = () => {
	const {
		push
	} = useRouter()
	const [option, setOption] = useState({})
	const [ctaClicked, setCtaClicked] = useState(false)

	const onSetOption = (value) => {
		setOption(value)
	}

	const handleConfirmUserOption = (e) => {
		e.preventDefault()
		setCtaClicked(true)
		if (!option.heading) {
			return
		}
		saveUserType(option.heading)
		if (option.heading === 'Corporate Business') {
			push('/auth/signup/business')
		} else {
			push('/auth/signup/individual')
		}
	}

	return (
		<AuthLayout LHSRequired={false} btn={{text: 'Log in', url: '/auth/login'}} pageTitle={'Signup'}>
			{
				<div className={styles.auth}>
					<div className={`${styles.inner} ${styles.business_type}`}>
						<div className={styles.center}>
							<h1 className="center title">What kind of business are you?</h1>
							<h4 className="center sub-title">Select your category, So that you can accurately define your role and access the appropriate features of Passpoint.</h4>
							<form className={styles.form} onSubmit={handleConfirmUserOption}>
								<div className={styles.inner}>
									<ChoiceCard emitSetOption={onSetOption} />
								</div>
								{ctaClicked && !option.heading ? <FeedbackInfo center={true} message="Please select a category" /> : <></> }
								<div className={`${styles.action_ctn} ${styles.end}`}>
									<PrimaryBtn text='Continue' />
								</div>
							</form>
						</div>
					</div>
				</div>
			}
		</AuthLayout>
	)
}

export default Signup
