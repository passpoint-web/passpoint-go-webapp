


'use client'
import {usePathname, useRouter} from 'next/navigation'
import FormLevel from '../../FormLevel'
import { useEffect, useState } from 'react'
import BackBtn from '@/components/Btn/Back'
import { getPublicProfile } from '@/services/localService'
import styles from '@/app/dashboard/business-profile-setup/business-profile.module.css'
const PublicProfileSetupLHS = () => {

	// const savedPublicProfile = getPublicProfile()
	// console.log(savedPublicProfile)
	const pathname = usePathname()
	const {push} = useRouter()

	const [levelsToDisplay, setLevelsToDisplay] = useState([])
	const [publicProfileState, setPublicProfileState] = useState({})

	const levels = [
		{
			title: 'Logo',
			sub_title: 'Provide your official logo',
			active: pathname === '/dashboard/business-profile-setup/identity',
			completed: publicProfileState?.productStage > 0,
		},
		{
			title: 'About Business',
			sub_title: 'Briefly tell us about your business and why they should choose you',
			active: pathname === '/dashboard/business-profile-setup/business',
			completed: publicProfileState?.productStage > 1,
		},
		{
			title: 'Services',
			sub_title: 'Kindly list all the services you offer including featured services',
			active: pathname === '/dashboard/business-profile-setup/services',
			completed: publicProfileState?.productStage > 2,
		},
		{
			title: 'Contact Us',
			sub_title: 'Kindly provide us with your contact information',
			active: pathname === '/dashboard/business-profile-setup/contact',
			completed: publicProfileState?.isCompleted,
		},
	]

	useEffect(()=>{
		setPublicProfileState(getPublicProfile())
		setLevelsToDisplay(levels)
	},[pathname])

	useEffect(()=>{
		setPublicProfileState(getPublicProfile())
	},[])

	useEffect(()=>{
		setLevelsToDisplay(levels)
	},[publicProfileState])
	return (
		<>
			<BackBtn text="Dashboard"
				onClick={()=>push('/dashboard')} />
			<div className={styles.lhs_levels_ctn}>
				{levelsToDisplay.map((e, index) => (
					<FormLevel key={index}
						auth={{ ...e, level: index + 1 }} />
				))}
			</div>
		</>
	)
}

export default PublicProfileSetupLHS
