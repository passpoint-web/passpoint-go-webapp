import BusinessPage from '@/components/BusinessProfile/SetupPages/BusinessPage'
import styles from '../business-profile.module.css'

export const metadata = () => {
	return {
		title: 'About Business - Setup Business Profile | Passpoint Go',
		description: ''
	}
}
const AboutBusiness = () => {
	return (
		<BusinessPage styles={styles} />
	)
}

export default AboutBusiness
