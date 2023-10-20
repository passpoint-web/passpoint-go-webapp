"use client"

import FlightPageHeader from "./FlightPageHeader"
import FlightPassengers from "./FlightPassengers"
import FlightPaymentOptions from "./FlightPaymentOptions"
import SelectedFlight from "./SelectedFlight"

const PayFlightPage = ({ styles }) => {
	return (
		<div className={`${styles.inner} flight-services`}>
			<SelectedFlight />
			<FlightPassengers />
			<FlightPaymentOptions />
		</div>
	)
}

export default PayFlightPage
