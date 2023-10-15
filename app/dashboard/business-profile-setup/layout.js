// 'use client'
import PublicProfileSetupLHS from '@/components/BusinessProfile/SetupLHS'
import styles from './business-profile.module.css'
export const metadata = () => {
	return {
		title: 'Setup Business Profile | Passpoint Go',
		description: ''
	}
}
const PublicProfileSetupLayout = ({children}) => {
	return (
		<div className={styles.layout_ctn}>
			<div className={styles.lhs}>
				<PublicProfileSetupLHS />
			</div>
			<div className={styles.pages}>
				{children}
			</div>
		</div>
	)
}

export default PublicProfileSetupLayout
