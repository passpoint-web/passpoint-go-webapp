"use client"
import styles from "../../assets/styles/flight.module.css"
import { FaChevronDown } from "react-icons/fa"
import FlightCard from "./FlightCard"
import Link from "next/link"
// eslint-disable-next-line no-unused-vars
import { GreenCheckIcon, ProfileEditIcon } from "@/constants/icons"
import { getMostRecentFlightSearchURL } from "@/services/localService"
import { useEffect, useState } from "react"

const SelectedFlight = ({ data }) => {
	const mostRecentFlightSearchURL = getMostRecentFlightSearchURL()
	const [searchURL, setSearchURL] = useState('')
	useEffect(()=>{
		setSearchURL(mostRecentFlightSearchURL)
	},[])
	return (
		<div className={`select-flight-wrapper ${styles.row__wrapper}`}>
			<button className={styles.row__header}>
				<div className="texts">
					<h3 className="capitalize">
						{" "}
            Selected Flights <GreenCheckIcon />
					</h3>
					{/* <p>Manage your bookings here</p> */}
				</div>
				<FaChevronDown />
			</button>
			<div className={styles.selected__row}>
				<div className={styles.lhs}>
					<FlightCard selected
						data={data} />
				</div>
				<div className={styles.rhs}>
					<Link href={searchURL}
						className="primary_btn">
						<ProfileEditIcon />
            Change Flight
					</Link>
				</div>
			</div>
		</div>
	)
}

export default SelectedFlight
