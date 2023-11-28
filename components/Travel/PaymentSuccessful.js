"use client"

import styles from "../../assets/styles/flight.module.css"
import { BigGreenCheckIconWithShadow } from "@/constants/icons"
import Link from "next/link"

const PaymentSuccessful = ({message}) => {
	return (
		<div className={styles.payment__successful}>
			<BigGreenCheckIconWithShadow />
			<h3>Payment Successful</h3>
			<p>{message || 'Your flight has been successfully booked, you can now manage your bookings.'}</p>
			<Link href="/travel/flights" className="primary_btn">
        Manage Bookings
			</Link>
		</div>
	)
}

export default PaymentSuccessful
