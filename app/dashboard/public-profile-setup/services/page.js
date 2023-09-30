import ServicesPage from '@/components/PublicProfile/SetupPages/ServicesPage'
import styles from '../public-profile.module.css'

export const metadata = () => {
	return {
		title: 'Services - Setup Public Profile | Passpoint Go',
		description: ''
	}
}

const Services = () => {
	return (
		<ServicesPage styles={styles} />
	)
}

export default Services
