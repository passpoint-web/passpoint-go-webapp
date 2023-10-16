import SearchFlightPage from "@/components/Travel/SearchFlightPage"
import styles from "../../../../../assets/styles/flight.module.css"
// import { publicProfile } from '@/services/restService'
export const metadata = () => {
  return {
    title: "Search Flights | Passpoint Go",
    description: "",
  }
}
const SearchFlightPageWrapper = () => {
  return <SearchFlightPage styles={styles} />
}

export default SearchFlightPageWrapper
