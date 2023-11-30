"use client"

import styles from "../../assets/styles/flight.module.css"
import { FaInfoCircle } from "react-icons/fa"

const InfoComp = ({ message }) => {
  return (
    <div className={styles.payment__successful}>
      <div className="mb-12"></div>
      <FaInfoCircle size={48} color="#009ec4" />
      <div className="mb-12"></div>
      <h3>Flight Booking Pending</h3>
      <p>{message || "Check back in 5 mins to see booking information"}</p>
    </div>
  )
}

export default InfoComp
