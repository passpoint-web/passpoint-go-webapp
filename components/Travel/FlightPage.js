"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import FlightDetailsModal from "./FlightDetailsModal"
import FlightPageHeader from "./FlightPageHeader"
import FlightTable from "../Tables/FlightTable"

const FlightPage = ({ styles }) => {
	const searchParams = useSearchParams()
	const [flightDetailVisible, setFlightDetailVisible] = useState(null)

	useEffect(() => {
		if (searchParams.get('id')) {
			setFlightDetailVisible(searchParams.get('id'))
		}
	}, [searchParams])

	return (
		<div className={`${styles.inner} flight-services`}>
			<FlightPageHeader styles={styles} />
			<FlightTable title="flight" action="/dashboard/travel/flights?id=AH12345678" />
			{flightDetailVisible && <FlightDetailsModal styles={styles} setFlightDetailVisible={setFlightDetailVisible} />}
		</div>
	)
}

export default FlightPage
