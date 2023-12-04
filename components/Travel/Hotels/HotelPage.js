import HotelTable from "@/components/Tables/HotelTable"
import HotelPageHeader from "./HotelPageHeader"

const HotelPage = ({ styles }) => {
  return (
    <div className={`${styles.inner} flight-services`}>
      <HotelPageHeader styles={styles} />
      <HotelTable modalStyles={styles} title="Hotel" />
    </div>
  )
}

export default HotelPage
