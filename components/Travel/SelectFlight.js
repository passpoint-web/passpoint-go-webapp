"use client"

import styles from "../../assets/styles/flight.module.css"
import { FaChevronDown } from "react-icons/fa"

const SelectFlight = () => {
  return (
    <div className={`select-flight-wrapper ${styles.row__wrapper}`}>
      <div className={styles.row__header}>
        <div className="texts">
          <h3 className="text-capitalize"> Select Flights (100)</h3>
          {/* <p>Manage your bookings here</p> */}
        </div>
        <FaChevronDown />
      </div>
    </div>
  )
}

export default SelectFlight
