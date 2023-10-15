
'use client'
import styles from '@/components/Settings/settings.module.css'
import Switch from '@/components/Custom/Switch'

const Notification = () => {
	return (
		<div className={styles.notification_page}>
			<h1>Notification Settings</h1>
			<div className={styles.border_box}>
				<div className={`${styles.inner} ${styles.flex}`}>
					<h4>Allow All Notifications</h4>
					<Switch value={true}
						checked={true} />
				</div>
			</div>
			<div className={styles.border_box}>
				<h3>In App Alerts</h3>
				<div className={`${styles.inner} ${styles.flex}`}>
					<h4>Bookings updates</h4>
					<Switch />
				</div>
				<div className={`${styles.inner} ${styles.flex}`}>
					<h4>Security Update</h4>
					<Switch />
				</div>
				<div className={`${styles.inner} ${styles.flex}`}>
					<h4>Credit and Debits</h4>
					<Switch value={true}
						checked={true} />
				</div>
			</div>
			<div className={styles.border_box}>
				<h3>Email Alerts</h3>
				<div className={`${styles.inner} ${styles.flex}`}>
					<h4>Bookings updates</h4>
					<Switch value={false}
						checked={false} />
				</div>
				<div className={`${styles.inner} ${styles.flex}`}>
					<h4>Security Update</h4>
					<Switch value={true}
						checked={true} />
				</div>
				<div className={`${styles.inner} ${styles.flex}`}>
					<h4>Credit and Debits</h4>
					<Switch value={true}
						checked={true} />
				</div>
			</div>
		</div>
	)
}

export default Notification
