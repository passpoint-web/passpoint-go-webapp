// 'use client'
import PublicProfileSetupLHS from '@/components/PublicProfile/SetupLHS'
import styles from './public-profile.module.css'
export const metadata = () => {
	return {
		title: 'Setup Public Profile | Passpoint Go',
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
