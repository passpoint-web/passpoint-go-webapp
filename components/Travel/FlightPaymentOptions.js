"use client"

import styles from "../../assets/styles/flight.module.css"
import { FaChevronDown } from "react-icons/fa"
import { useState } from "react"
import PaymentSuccessful from "./PaymentSuccessful"
import Input from "../Dashboard/Input"
import PrimaryBtn from "../Btn/Primary"

const FlightPaymentOptions = () => {
	const paymentOptions = [
		'Credit or Debit Card',
		'My Passpoint Wallet'
	]
	const [paymentOption, setPaymentOption] = useState(paymentOptions[0])
	return (
		<div className={`select-flight-wrapper ${styles.row__wrapper}`}>
			<button className={styles.row__header}>
				<div className="texts">
					<h3 className="text-capitalize"> Payment Options</h3>
					{/* <p>Manage your bookings here</p> */}
				</div>
				<FaChevronDown />
			</button>
			<div className={styles.payments__row}>
				<div className={styles.lhs}>
					{paymentOptions.map(option =>
						<button key={option}
							className={`${styles.payment__option_btn} ${paymentOption === option ? styles.active : ''}`}
							onClick={() => setPaymentOption(option)}>
							<div className="check"></div>
							{option}
						</button>)}
				</div>
				<div className={styles.rhs}>
					{/* PAYMENT OPTIONS */}
					{paymentOption === paymentOptions[0] && <form>
						<Input
							label="Cardholder Name"
							placeholder="John"
							name="name"
						/>
						<Input
							label="Card Number"
							placeholder="**** **** **** ****"
							name="name"
						/>
						<div className="form-triple-row">
							<Input
								label="Card Expiry Month"
								placeholder="John"
								name="name"
							/>
							<Input
								label="Card Expiry Year"
								placeholder="2025"
								name="name"
							/>
							<Input
								label="CVV"
								placeholder="123"
								name="name"
							/>
						</div>
						<PrimaryBtn text="Pay ₦890,000" />
					</form>}
					{/* PAYMENT SUCCESSFUL */}
					{/* {paymentOption === paymentOptions[0] && <PaymentSuccessful />} */}
				</div>
			</div>
		</div>
	)
}

export default FlightPaymentOptions
