import styles from '../business-profile.module.css'
import IdentityPage from '@/components/BusinessProfile/SetupPages/IdentityPage'
// import { publicProfile } from '@/services/restService'
export const metadata = () => {
	return {
		title: 'Business Identity - Setup Business Profile | Passpoint Go',
		description: ''
	}
}

const BusinessIdentity = async () => {
	return (
		<IdentityPage styles={styles} />
	)
}

export default BusinessIdentity
