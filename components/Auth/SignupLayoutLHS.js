import styles from '@/assets/styles/kyc-screens.module.css'
import SignupLevel from './SignupLevel'
import { useRouter } from 'next/router'

const SignupLayoutLHS = () => {

	const {route} = useRouter()
	const levels = [
		{
			title: 'Business Information',
			sub_title: 'We want to know how you want to operate on Passpoint',
			active: route === '/auth/signup/business',
			completed: false
		},
		{
			title: 'Business Address',
			sub_title: 'Kindly fill in your correct address details',
			active: route === '/auth/signup/business/address',
			completed: false
		},
		{
			title: 'Personal Information',
			sub_title: 'Kindly provide personal information',
			active: route === '/auth/signup/business/personal',
			completed: false
		},
		{
			title: 'Verify Email Address',
			sub_title: 'Verify your registered email address',
			active: route === '/auth/signup/business/verify',
			completed: false
		},
	]
	return ( 
		<div className={styles.kyc_content_lhs}>
			<div className={styles.inner}>
				{levels.map((e, index)=>(
					<SignupLevel key={index} kyc={{...e, level: index+1}} />
				))}
			</div>
		</div>
	)
}

export default SignupLayoutLHS
