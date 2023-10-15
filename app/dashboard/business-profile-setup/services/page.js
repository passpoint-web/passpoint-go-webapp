import ServicesPage from '@/components/BusinessProfile/SetupPages/ServicesPage'
import styles from '../business-profile.module.css'

export const metadata = () => {
	return {
		title: 'Services - Setup Business Profile | Passpoint Go',
		description: ''
	}
}

const Services = () => {
	return (
		<ServicesPage styles={styles} />
	)
}

export default Services
