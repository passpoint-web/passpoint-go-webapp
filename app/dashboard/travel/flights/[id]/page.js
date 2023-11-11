import TravelServicesPage from "@/components/Travel/TravelServicesPage"
import styles from "@/assets/styles/travel.module.css"

export const metadata = () => {
	return {
		title: "Travel Services | Passpoint Go",
		description: "",
	}
}
const TravelServices = () => {
	return <TravelServicesPage styles={styles} />
}

export default TravelServices
