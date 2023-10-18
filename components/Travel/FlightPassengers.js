"use client"

import styles from "../../assets/styles/flight.module.css"
import { FaChevronDown } from "react-icons/fa"
import FlightCard from "./FlightCard"
import Link from "next/link"
import { GreenCheckIcon, ProfileEditIcon } from "@/constants/icons"

const FlightPassengers = () => {
	return (
		<div className={`select-flight-wrapper ${styles.row__wrapper}`}>
			<button className={styles.row__header}>
				<div className="texts">
					<h3 className="text-capitalize"> Passengers Information <GreenCheckIcon /></h3>
					{/* <p>Manage your bookings here</p> */}
				</div>
				<FaChevronDown />
			</button>
			<div className={styles.passengers__row}>
				<div className={styles.lhs}>
				</div>
				<div className={styles.rhs}>
				</div>
			</div>
		</div>
	)
}

export default FlightPassengers
