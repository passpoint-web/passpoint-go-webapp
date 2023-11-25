'use client'
import styles from './help.module.css'
import { getCredentials } from '@/services/localService'
const Help = () => {
	return <div className={styles.main_page}>
		<h1>Help & Support</h1>
		<h3>
			Hi 👋🏾 {getCredentials().firstName}
		</h3>
		<div className={styles.sub_heading}>
			Kindly click on the Icon at the botttom right corner of your screen, for issues & complaints.
		</div>
	</div>
}

export default Help
