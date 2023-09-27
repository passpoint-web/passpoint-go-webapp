


import {usePathname} from 'next/navigation'
import styles from './Auth/SignupLayoutLHS/signup-layout-lhs.module.css'
import FormLevel from './FormLevel'
import { useEffect, useState } from 'react'

const PublicProfileLHS = () => {

	const pathname = usePathname()

	const [levelsToDisplay, setLevelsToDisplay] = useState([])

  const levels = [
		{
			title: 'Logo',
			sub_title: 'Provide your official logo',
			active: pathname === '/dashboard/public-profile-setup',
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
    <div className={styles.auth_content_lhs}>
			<div className={styles.inner}>
				{levelsToDisplay.map((e, index) => (
					<FormLevel key={index}
						auth={{ ...e, level: index + 1 }} />
				))}
			</div>
		</div>
  )
}

export default PublicProfileLHS
