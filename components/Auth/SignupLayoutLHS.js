'use client'
import styles from '@/assets/styles/auth-screens.module.css'
import SignupLevel from './SignupLevel'
import { getCredentials } from '@/services/localService'

import {
	// useRouter,
	usePathname,
	// useSearchParams
}
	from 'next/navigation'
import { useEffect, useState } from 'react'

const savedCredentials = getCredentials()

const SignupLayoutLHS = () => {
	const pathname = usePathname()
	// const router = useRouter()
	// const searchParams = useSearchParams()

	const individualLevel = [
		{
			title: 'Personal Information',
			sub_title: 'Kindly provide personal information',
			active: pathname === '/auth/signup/individual',
			completed: savedCredentials?.regStage > 0,
		},
		{
			title: 'Business Registration',
			sub_title: 'We want to know how you want to operate on passpoint',
			active: pathname === '/auth/signup/individual/business',
			completed: savedCredentials?.regStage > 1,
		},
		{
			title: 'Address Details',
			sub_title: 'Kindly fill in your correct address details',
			active: pathname === '/auth/signup/individual/address',
			completed: savedCredentials?.regStage > 2,
		},
		{
			title: 'Verify Email Address',
			sub_title: 'Verify your registered email address',
			active: pathname === '/auth/signup/individual/verify',
			completed: false,
		},
	]

	const businessLevel = [
		{
			title: 'Business Information',
			sub_title: 'We want to know how you want to operate on Passpoint',
			active: pathname === '/auth/signup/business',
			completed: savedCredentials?.regStage > 0,
		},
		{
			title: 'Business Address',
			sub_title: 'Kindly fill in your correct address details',
			active: pathname === '/auth/signup/business/address',
			completed: savedCredentials?.regStage > 1,
		},
		{
			title: 'Personal Information',
			sub_title: 'Kindly provide personal information',
			active: pathname === '/auth/signup/business/personal',
			completed: savedCredentials?.regStage > 2,
		},
		{
			title: 'Verify Email Address',
			sub_title: 'Verify your registered email address',
			active: pathname === '/auth/signup/business/verify',
			completed: false,
		},
	]

	const [levelsToDisplay, setLevelsToDisplay] = useState([])
	useEffect(()=>{
		if (pathname.includes('/signup/business')) {
			setLevelsToDisplay(businessLevel)
		} else {
			setLevelsToDisplay(individualLevel)
		}
	},[pathname])

	return (
		<div className={styles.auth_content_lhs}>
			<div className={styles.inner}>
				{levelsToDisplay.map((e, index) => (
					<SignupLevel key={index}
						auth={{ ...e, level: index + 1 }} />
				))}
			</div>
		</div>
	)
}

export default SignupLayoutLHS
