'use client'
import PublicProfileSetupLHS from '@/components/PublicProfile/SetupLHS'
import { usePathname } from 'next/navigation'
import styles from './public-profile.module.css'
// export const metadata = () => {
// 	return {
// 		title: 'Setup Public Profile | Passpoint Go',
// 		description: ''
// 	}
// }
const PublicProfileSetupLayout = ({children}) => {
	const pathname = usePathname()
	console.log(pathname)
	return (
		!pathname.includes('/public-profile-setup/preview') ? (<div className={styles.layout_ctn}>
			<div className={styles.lhs}>
				<PublicProfileSetupLHS />
			</div>
			<div className={styles.pages}>
				{children}
			</div>
		</div>) :
		<div>
				{children}
		</div>
	)
}

export default PublicProfileSetupLayout
