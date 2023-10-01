


'use client'
import {usePathname, useRouter} from 'next/navigation'
import FormLevel from '../../FormLevel'
import { useEffect, useState } from 'react'
import BackBtn from '@/components/Btn/Back'
import styles from '@/app/dashboard/public-profile-setup/public-profile.module.css'
const PublicProfileSetupLHS = () => {

	const pathname = usePathname()
	const {push} = useRouter()

	const [levelsToDisplay, setLevelsToDisplay] = useState([])

	const levels = [
		{
			title: 'Logo',
			sub_title: 'Provide your official logo',
			active: pathname === '/dashboard/public-profile-setup/identity',
			completed: false,
		},
		{
			title: 'About Business',
			sub_title: 'Briefly tell us about your business and why they should choose you',
			active: pathname === '/dashboard/public-profile-setup/business',
			completed: false,
		},
		{
			title: 'Services',
			sub_title: 'Kindly list all the services you offer including featured services',
			active: pathname === '/dashboard/public-profile-setup/services',
			completed: false,
		},
		{
			title: 'Contact Us',
			sub_title: 'Kindly provide us with your contact information',
			active: pathname === '/dashboard/public-profile-setup/contact',
			completed: false,
		},
	]

	useEffect(()=>{
		setLevelsToDisplay(levels)
	},[])
	return (
		<>
			<BackBtn text="Dashboard"
				onClick={()=>push('/dashboard')} />
			<div className={styles.lhs_levels_ctn}>
				{levelsToDisplay.map((e, index) => (
					<FormLevel mobileWidth='1000' key={index}
						auth={{ ...e, level: index + 1 }} />
				))}
			</div>
		</>
	)
}

export default PublicProfileSetupLHS
