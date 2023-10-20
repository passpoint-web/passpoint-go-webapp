"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import ModalWrapper from "../Modal/ModalWrapper"

const FlightDetailsModal = ({ setFlightDetailVisible, styles }) => {
	const path = usePathname()
	const router = useRouter()
	const tabs = [
		'General', 'Itinerary', 'Cost & Payment', 'Traveler\'s Info'
	]
	const [activeTab, setActiveTab] = useState(tabs[0])

	const closeModal = () => {
		setFlightDetailVisible(null)
		router.push(path.substring(path.indexOf('?')))
	}
	return (
		<ModalWrapper
			loading={false}
			onClose={()=> closeModal()}
			ctaBtnType='none'
			heading={'Flight Details'}
			subHeading={'See all your booking details here'}
			ctaBtnText='Modify'
			bottomCancelNeeded={false}
			containsTabLayout
			hasBottomActions={false}
		>
			<div className={styles.modal__tab_group}>
				{tabs.map(tab =>
					<button key={tab}
						onClick={() => setActiveTab(tab)}
						className={tab === activeTab ? styles.active : ''}>
						{tab}
					</button>)}
			</div>

			{/* MAIN FLIGHT DETAILS CONTENT - GENERAL */}
			{activeTab === tabs[0] && (<div className={styles.modal__flight_details}>
				<div className={styles.modal__flight_details_section}>
					<div className={styles.row}>
						<div className={styles.label}>
            Booking ID
						</div>
						<div className={styles.value}>
							<span className="text-blue">AH12345678</span>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>
            Booking Date & Time
						</div>
						<div className={styles.value}>
							<span>Oct 15, 2023, <span>8:45 PM</span></span>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>
            Booking Reference
						</div>
						<div className={styles.value}>
							<span>XYZFlight20231101</span>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>
            Flight Number
						</div>
						<div className={styles.value}>
							<span>XYZ123</span>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>
            Departure Location
						</div>
						<div className={styles.value}>
							<span>JFK International Airport, New York</span>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>
            Arrival Location
						</div>
						<div className={styles.value}>
							<span>Heathrow Airport, London</span>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>
            Departure Date & Time
						</div>
						<div className={styles.value}>
							<span>November 1, 2023, 10:00 AM</span>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>
            Arrival Date & Time
						</div>
						<div className={styles.value}>
							<span>November 1, 2023, 10:00 AM</span>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>
            Airline
						</div>
						<div className={styles.value}>
							<span>Air Travel Express</span>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>
            Booking Status
						</div>
						<div className={styles.value}>
							<div className="success-tag">Confirmed</div>
							<div className="pending-tag">Pending</div>
							<div className="failed-tag">Failed</div>
						</div>
					</div>
				</div>
			</div>)}

			{/* MAIN FLIGHT DETAILS CONTENT - ITINERARY */}
			{activeTab === tabs[1] && (<div className={styles.modal__flight_details}>
				<div className={styles.modal__flight_details_section}>

					<h5>Flight 1</h5>
					<div className={styles.row}>
						<div className={styles.label}>
            Booking ID
						</div>
						<div className={styles.value}>
							<span className="text-blue">AH12345678</span>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>
            Booking Date & Time
						</div>
						<div className={styles.value}>
							<span>Oct 15, 2023, <span>8:45 PM</span></span>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>
            Booking Reference
						</div>
						<div className={styles.value}>
							<span>XYZFlight20231101</span>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>
            Flight Number
						</div>
						<div className={styles.value}>
							<span>XYZ123</span>
						</div>
					</div>
				</div>
			</div>)}

			{/* MAIN FLIGHT DETAILS CONTENT - COST & PAYMENT */}
			{activeTab === tabs[2] && (<div className={styles.modal__flight_details}>
				<div className={styles.modal__flight_details_section}>
					<h5>Cost</h5>
					<div className={styles.row}>
						<div className={styles.label}>
            Base Fare
						</div>
						<div className={styles.value}>
							<span>₦180,000</span>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>
            Taxes (VAT) & Fees
						</div>
						<div className={styles.value}>
							<span>₦20,000</span>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>
            Total Costs
						</div>
						<div className={styles.value}>
							<span className="text-bold">₦200,000</span>
						</div>
					</div>
				</div>
				<div className={styles.modal__flight_details_section}>
					<h5>Payment Information</h5>
					<div className={styles.row}>
						<div className={styles.label}>
            Payment Method
						</div>
						<div className={styles.value}>
							<span>Debit Card</span>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>
            Card Information
						</div>
						<div className={styles.value}>
							<span>**** 5678</span>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>
            Payment Status
						</div>
						<div className={styles.value}>
							<span className="success-tag">Paid</span>
						</div>
					</div>
				</div>
			</div>)}

			{/* MAIN FLIGHT DETAILS CONTENT - TRAVELER INFO */}
			{activeTab === tabs[3] && (<div className={styles.modal__flight_details}>
				<div className={styles.modal__flight_details_section}>
					<h5>Traveler 1</h5>
					<div className={styles.row}>
						<div className={styles.label}>
            Name
						</div>
						<div className={styles.value}>
							<span>John Smith</span>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>
            Contact
						</div>
						<div className={styles.value}>
							<span>john.smith@email.com</span>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>
            Passport Number
						</div>
						<div className={styles.value}>
							<span>ABC12345</span>
						</div>
					</div>
				</div>
				<div className={styles.modal__flight_details_section}>
					<h5>Traveler 2</h5>
					<div className={styles.row}>
						<div className={styles.label}>
            Name
						</div>
						<div className={styles.value}>
							<span>Jane Doe</span>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>
            Contact
						</div>
						<div className={styles.value}>
							<span>jane.doe@email.com</span>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>
            Passport Number
						</div>
						<div className={styles.value}>
							<span>DEF67890</span>
						</div>
					</div>
				</div>
			</div>)}

			<div className={styles.modal__bottom_actions}>
				<button className="primary_btn">
          Modify
				</button>
				<button className="primary_btn">
          Cancel Bookings
				</button>
			</div>
		</ModalWrapper>
	)
}

export default FlightDetailsModal
