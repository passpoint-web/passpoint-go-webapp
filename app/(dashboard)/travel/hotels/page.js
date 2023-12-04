import styles from "@/assets/styles/flight.module.css"
import HotelPage from "@/components/Travel/Hotels/HotelPage"
export const metadata = () => {
  return {
    title: "Flight Services | Passpoint Go",
    description: "",
  }
}

const TravelHotelPage = () => {
  return <HotelPage styles={styles} />
}

export default TravelHotelPage
