import PayFlightPage from "@/components/Travel/PayFlightPage"
import styles from "../../../../../assets/styles/flight.module.css"
// import { publicProfile } from '@/services/restService'
export const metadata = () => {
	return {
		title: "Pay Flights | Passpoint Go",
		description: "",
	}
}
const SearchFlightPageWrapper = () => {
	return <PayFlightPage styles={styles} />
}

export default SearchFlightPageWrapper
