import styles from '../public-profile.module.css'
import IdentityPage from '@/components/PublicProfile/SetupPages/IdentityPage'
// import { publicProfile } from '@/services/restService'

export const metadata = () => {
	return {
		title: 'Business Identity - Setup Public Profile | Passpoint Go',
		description: ''
	}
}

// const getPublicProfile = async () => {
// 	const response = await publicProfile.getPublicProfile()
// 	return response
// }
const BusinessIdentity = async () => {
	// const result = await getPublicProfile()
	// console.log(result)
	return (
		<IdentityPage styles={styles} />
	)
}

export default BusinessIdentity
