
'use client'
import styles from '@/components/Settings/settings.module.css'
// import formStyles from '@/assets/styles/auth-screens.module.css'
// import { useState } from 'react'
// import Input from '@/components/Dashboard/Input'
// import PasswordField from '@/components/Auth/PasswordField'
// import Button from '@/components/Btn/Button'
// import ModalWrapper from '@/components/Modal/ModalWrapper'
// import { getCredentials } from '@/services/localService'
// import { useNotify } from '@/utils/hooks'
// import { useRouter, useSearchParams } from 'next/navigation'
// import { forgotPassword } from '@/services/restService'
// import functions from '@/utils/functions'
// import ForgotPasswordFlow from '@/components/AccountProfile/ForgotPasswordFlow'
import Switch from '@/components/Custom/Switch'
// import Link from 'next/link'
const Notification = () => {
	// const {createUrl} = functions
	// const {push} = useRouter()
	// const searchParams = useSearchParams()
	// const notify = useNotify()
	// const [ctaClicked, setCtaClicked] = useState(false)
	// const [isLoading, setIsLoading] = useState(false)
	// const [forgotPasswordModal, setForgotPasswordModal] = useState(false)
	// const [payload, setPayload] = useState({
	// 	password: '',
	// 	confirm: '',
	// })

	return (
		<div className={styles.notification_page}>
			<h1>Notification Settings</h1>
			<div className={styles.notification_box}>
				<div className={styles.inner}>
					<h4>Allow All Notifications</h4>
					<Switch value={true}
				checked={true} />
				</div>
			</div>
			<div className={styles.notification_box}>
				<h3>In App Alerts</h3>
				<div className={styles.inner}>
					<h4>Bookings updates</h4>
					<Switch />
				</div>
				<div className={styles.inner}>
					<h4>Security Update</h4>
					<Switch />
				</div>
				<div className={styles.inner}>
					<h4>Credit and Debits</h4>
					<Switch value={true}
				checked={true} />
				</div>
			</div>
			<div className={styles.notification_box}>
				<h3>Email Alerts</h3>
				<div className={styles.inner}>
					<h4>Bookings updates</h4>
					<Switch value={false}
				checked={false} />
				</div>
				<div className={styles.inner}>
					<h4>Security Update</h4>
					<Switch value={true}
				checked={true} />
				</div>
				<div className={styles.inner}>
					<h4>Credit and Debits</h4>
					<Switch value={true}
				checked={true} />
				</div>
			</div>
		</div>
	)
}

export default Notification
