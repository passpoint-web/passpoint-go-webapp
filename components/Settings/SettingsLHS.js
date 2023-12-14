
'use client'
import styles from './settings.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// eslint-disable-next-line no-unused-vars
import { AccountProfileIcon, AccountSecurityIcon } from '@/constants/icons'
const SettingsLHS = () => {
	const pathname = usePathname()
	return (
		<div className={styles.settings_lhs}>
			<Link href='/settings/activity'
				className={`${styles.nav_sec} ${pathname.includes('activity') ? styles.active : ''}`}>
				<div className={styles.icon}>
					<AccountProfileIcon />
				</div>
				<div className={styles.content}>
					<h4>Account Activity</h4>
					<p>Monitor your account activity</p>
				</div>
			</Link>
			{/* <Link href='/settings/notification'
				className={`${styles.nav_sec} $ pathname.includes('notification') ? styles.active : ''}`}>
				<div className={styles.icon}>
					<NotificationIcon color="#009EC4" />
				</div>

				<div className={styles.content}>
					<h4>Notification Settings</h4>
					<p>Manage your notifications</p>
				</div>
			</Link> */}
			<Link href='/settings/security'
				className={`${styles.nav_sec} ${pathname.includes('security') ? styles.active : ''}`}>
				<div className={styles.icon}>
					<AccountSecurityIcon />
				</div>
				<div className={styles.content}>
					<h4>Security & Privacy</h4>
					<p>Manage and secure your account</p>
				</div>
			</Link>
		</div>
	)
}

export default SettingsLHS
