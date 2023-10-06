


'use client'
import {usePathname, useRouter} from 'next/navigation'
import FormLevel from '../../FormLevel'
import { useEffect, useState } from 'react'
import BackBtn from '@/components/Btn/Back'
import { getPublicProfile, savePublicProfile } from '@/services/localService'
import styles from '@/app/dashboard/public-profile-setup/public-profile.module.css'
const PublicProfileSetupLHS = () => {

	const savedPublicProfile = getPublicProfile()
	const pathname = usePathname()
	const {push} = useRouter()

	const [levelsToDisplay, setLevelsToDisplay] = useState([])

	const levels = [
		{
			title: 'Logo',
			sub_title: 'Provide your official logo',
			active: pathname === '/dashboard/public-profile-setup/identity',
			completed: savedPublicProfile?.profileStage>1,
		},
		{
			title: 'About Business',
			sub_title: 'Briefly tell us about your business and why they should choose you',
			active: pathname === '/dashboard/public-profile-setup/business',
			completed: savedPublicProfile?.profileStage>2,
		},
		{
			title: 'Services',
			sub_title: 'Kindly list all the services you offer including featured services',
			active: pathname === '/dashboard/public-profile-setup/services',
			completed: savedPublicProfile?.profileStage>3,
		},
		{
			title: 'Contact Us',
			sub_title: 'Kindly provide us with your contact information',
			active: pathname === '/dashboard/public-profile-setup/contact',
			completed: savedPublicProfile?.isCompleted,
		},
	]

	useEffect(()=>{
		setLevelsToDisplay(levels)
	},[pathname])
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
