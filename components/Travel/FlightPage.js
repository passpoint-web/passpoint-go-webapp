"use client"

import CustomTable from "../Custom/Table"
import FlightPageHeader from "./FlightPageHeader"

const FlightPage = ({ styles }) => {
  return (
    <div className={`${styles.inner} flight-services`}>
      <FlightPageHeader styles={styles} />
      <CustomTable title="flight" action="/dashboard/travel/AH12345678" />
    </div>
  )
}

export default FlightPage
