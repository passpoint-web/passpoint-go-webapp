// eslint-disable-next-line no-unused-vars
import { PlusIcon, ProfileAvatar } from '@/constants/icons'
import styles from '@/assets/styles/dashboard-layout.module.css'
import ProfileImage from '@/assets/images/dashboard/avatar.svg'
import Link from 'next/link'
import Image from 'next/image'
import { getCredentials } from '@/services/localService'
import { useEffect, useState } from 'react'

const DashboardHeader = () => {
	const [savedCredentials, setSavedCredentials] = useState()
	useEffect(()=>{
		setSavedCredentials(getCredentials())
	},[])
	return (
		<div className={styles.dashHeader_main}>
			<button>
				<PlusIcon />
        Generate Storefront
			</button>
			<section className={styles.dashHeader_profile}>
				<Image src={ProfileImage}
					alt="avatar" />
				<div>
					<h3>{savedCredentials?.businessName}</h3>
					<Link href="/dashboard/settings/profile">View Profile</Link>
				</div>
			</section>
		</div>
	)
}

export default DashboardHeader
