import BusinessPage from '@/components/PublicProfile/SetupPages/BusinessPage'
import styles from '../public-profile.module.css'

export const metadata = () => {
	return {
		title: 'About Business - Setup Public Profile | Passpoint Go',
		description: ''
	}
}
const AboutBusiness = () => {
	return (
		<BusinessPage styles={styles} />
	)
}

export default AboutBusiness
