"use client"

import styles from "../../assets/styles/flight.module.css"
import { FaChevronDown } from "react-icons/fa"
// import FlightCard from "./FlightCard"
// import Link from "next/link"
// eslint-disable-next-line no-unused-vars
import { GreenCheckIcon, PlusIcon, ProfileEditIcon } from "@/constants/icons"
import { useState } from "react"
import Input from "../Dashboard/Input"
// import Textarea from "../Dashboard/Textarea"
import PrimaryBtn from "../Btn/Primary"

const FlightPassengers = () => {

	const [activePassenger, setActivePassenger] = useState(1)
	const [passengers, setPassengers] = useState([
		{ id: 1, firstName: '', lastName: '', email: '', dob: '', passportNumber: '' },
		{ id: 2, firstName: '', lastName: '', email: '', dob: '', passportNumber: '' }
	])

	const addAnotherPassenger = () => {
		const tempPassengers = [...passengers]
		const newPassenger = {
			id: tempPassengers.length+1, firstName: '', lastName: '', email: '', dob: '', passportNumber: ''
		}
		tempPassengers.push(newPassenger)
		setPassengers(tempPassengers)
	}
	return (
		<div className={`select-flight-wrapper ${styles.row__wrapper}`}>
			<button className={styles.row__header}>
				<div className="texts">
					<h3 className="capitalize"> Passengers Information</h3>
					{/* <p>Manage your bookings here</p> */}
				</div>
				<FaChevronDown />
			</button>
			<div className={styles.payments__row}>
				<div className={styles.lhs}>
					{passengers.map((passenger, pIndex) =>
						<button key={passenger.id}
							className={`${styles.payment__option_btn} ${activePassenger === passenger.id ? styles.active : ''}`}
							onClick={() => setActivePassenger(passenger.id)}>
							<div className="check"></div>
							Passenger {pIndex + 1}
						</button>)}
					<button className={`${styles.payment__option_btn} ${styles.active}`}  onClick={() => addAnotherPassenger()}>
						<PlusIcon />
						Add Another Passenger
					</button>
				</div>
				<div className={styles.rhs}>
					{/* PASSENGER FORM */}
					<form>
						<div className="form-row">
							<Input
								label="First Name"
								placeholder="John"
								name="name"
							/>
							<Input
								label="Last Name"
								placeholder="Smith"
								name="name"
							/>
						</div>
						<Input
							label="Email Address"
							placeholder="kelechi@travels.com"
							name="email"
						/>
						<Input
							label="Date of Birth"
							placeholder="Leave a Message"
							type="date"
							name="message"
						/>
						<Input
							label="Passport Number"
							placeholder="kelechi@travels.com"
							name="email"
						/>
						<PrimaryBtn text="Save and Continue" />
					</form>
				</div>
			</div>
		</div>
	)
}

export default FlightPassengers
