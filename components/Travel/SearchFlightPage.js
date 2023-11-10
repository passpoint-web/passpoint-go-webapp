"use client"

import FlightPageHeader from "./FlightPageHeader"
import SelectFlight from "./SelectFlight"

const SearchFlightPage = ({ styles }) => {
  return (
    <div className={`${styles.inner} flight-services`}>
      <FlightPageHeader styles={styles} />
      <SelectFlight />
    </div>
  )
}

export default SearchFlightPage
