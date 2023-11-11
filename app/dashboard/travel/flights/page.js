import FlightPage from '@/components/Travel/FlightPage'
import styles from '@/assets/styles/flight.module.css'
export const metadata = () => {
	return {
		title: 'Flight Services | Passpoint Go',
		description: ''
	}
}

const TravelServices = () => {
	return <FlightPage styles={styles} />
}

export default TravelServices
