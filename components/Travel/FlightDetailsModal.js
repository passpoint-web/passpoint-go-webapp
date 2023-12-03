"use client"
import { useEffect, useState } from "react"
import ModalWrapper from "../Modal/ModalWrapper"
import { travel } from "@/services/restService"
import functions from "@/utils/functions"
import Loader from "../Btn/Loader"
// import PaymentSuccessful from "./PaymentSuccessful"
import InfoComp from "./InfoComp"
import Tab from "../Tab"

const FlightDetailsModal = ({ styles, closeModal, flightDetails }) => {
	const { formatMoney } = functions
	// const path = usePathname()
	// const [isLoading, setIsLoading] = useState(true)
	// const router = useRouter()
	const tabs = ["General", "Itinerary", "Cost & Payment", "Traveler's Info"]
	const [activeTab, setActiveTab] = useState(tabs[0])
	// eslint-disable-next-line no-unused-vars
	const [data, setData] = useState({})
	const [baseFare, setBaseFare] = useState(0)
	const [fees, setFees] = useState(0)
	// const [isLoading, setIsLoading] = useState(false)
	const [isUploading, setIsUploading] = useState(false)

	const handleCloseModal = () => {
		closeModal
	}

	useEffect(() => {
		setData(flightDetails)
	}, [])

	// const getFlightBooking = async () => {
	//   try {
	//     setIsLoading(true)
	//     const response = await travel.getFlightBooking(flightDetails.reference)
	//     setData({ ...response.data.data, ...flightDetails })
	//     calculateBaseFare(response.data.data)
	//   } catch (_err) {
	//     // console.log(_err.response.data.description)
	//     const { message, description } = _err.response?.data || _err
	//     notify("error", message || description)
	//   } finally {
	//     setIsLoading(false)
	//   }
	// }

	const calculateBaseFare = (dataParam) => {
		let total = dataParam?.totalAmount
		// dataParam.travelers_price.forEach((traveler) => {
		//   const amountValues = Object.values(traveler)
		//   total += Number(amountValues[0])
		// })
		setBaseFare(total)
		setFees(Number(dataParam.totalAmount) - total)
		return total
	}

	const cancelBooking = async () => {
		setIsUploading(true)
		const promise = await travel.cancelBooking({
			bookingReference: flightDetails.reference,
		})
		setIsUploading(false)
		if (promise.data.code === "200") closeModal()
	}

	useEffect(() => {
		calculateBaseFare(data)
		// getFlightBooking()
	}, [data])

	return (
		<ModalWrapper
			loading={false}
			onClose={() => handleCloseModal()}
			ctaBtnType="none"
			topClose={false}
			heading={"Flight Details"}
			subHeading={"See all your booking details here"}
			ctaBtnText="Modify"
			bottomCancelNeeded={false}
			containsTabLayout
			hasBottomActions={false}
		>
			{/* {isLoading && <FWLoader />} */}
			<Tab tabs={tabs}
				setActiveTab={(val)=>setActiveTab(val)}
				activeTab={activeTab} />
			{/* MAIN FLIGHT DETAILS CONTENT - GENERAL */}
			{activeTab === tabs[0] && (
				<div className={styles.modal__flight_details}>
					<div className={styles.modal__flight_details_section}>
						{/* <div className={styles.row}>
						<div className={styles.label}>
            Booking ID
						</div>
						<div className={styles.value}>
							<span className="text-blue uppercase">{id}</span>
						</div>
					</div> */}
						<div className={styles.row}>
							<div className={styles.label}>Booking Reference</div>
							<div className={styles.value}>
								<span className="text-blue text-bold uppercase">
									{flightDetails.bookingReference}
								</span>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.label}>Booking Date & Time</div>
							<div className={styles.value}>
								<span>
									{functions.formatTimestamp(data?.dateCreated).substring(4)},{" "}
									<span>{functions.formatCustomTime(data?.dateCreated)}</span>
								</span>
							</div>
						</div>
						{/* <div className={styles.row}>
              <div className={styles.label}>Booking Expiration Date</div>
              <div className={styles.value}>
                <span>
                  {new Date(data?.expires_at)?.toDateString()},{" "}
                  <span>{functions.formatCustomTime(data?.expires_at)}</span>
                </span>
              </div>
            </div> */}
						<div className={styles.row}>
							<div className={styles.label}>Total Cost</div>
							<div className={`${styles.value}`}>
								<span className="text-bold">
									{formatMoney(data?.totalAmount, data?.currency)}
								</span>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.label}>Booking Status</div>
							<div className={styles.value}>
								<div
									className={`${
										data?.pnrStatus?.toLowerCase() || "pending"
									}-tag`}
								>
									{data?.pnrStatus?.toLowerCase() || "Pending"}
								</div>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.label}>Return Ticket</div>
							<div className={styles.value}>
								<span>{data?.inbound ? "Yes" : "No"}</span>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* MAIN FLIGHT DETAILS CONTENT - ITINERARY */}
			{activeTab === tabs[1] &&
        (!data?.inbound?.airlineName ? (
        	<InfoComp />
        ) : (
        	<div className={styles.modal__flight_details}>
        		{/* OUTBOUND FLIGHTS */}
        		<div className={styles.modal__flight_details_section}>
        			<h5>Outbound Flight</h5>
        			<div className={styles.row}>
        				<div className={styles.label}>Airline</div>
        				<div className={styles.value}>
        					<span>{data?.outbound?.airlineName}</span>
        				</div>
        			</div>
        			<div className={styles.row}>
        				<div className={styles.label}>Flight Number</div>
        				<div className={styles.value}>
        					<span>{data?.outbound?.flightNumber}</span>
        				</div>
        			</div>
        			<div className={styles.row}>
        				<div className={styles.label}>Departure</div>
        				<div className={styles.value}>
        					<span>
        						{functions.getFormattedAirportByIata(
        							data?.outbound?.departureCode
        						)}
        						<br />
        						{new Date(
        							data?.outbound?.departureTime
        						)?.toDateString()},{" "}
        						<span>
        							{functions.formatCustomTime(
        								data?.outbound?.departureTime
        							)}
        						</span>
        					</span>
        				</div>
        			</div>
        			<div className={styles.row}>
        				<div className={styles.label}>Arrival</div>
        				<div className={styles.value}>
        					<span>
        						{functions.getFormattedAirportByIata(
        							data?.outbound?.arrivalCode
        						)}
        						<br />
        						{new Date(
        							data?.outbound?.arrivalTime
        						)?.toDateString()},{" "}
        						<span>
        							{functions.formatCustomTime(data?.outbound?.arrivalTime)}
        						</span>
        					</span>
        				</div>
        			</div>
        			<div className={styles.row}>
        				<div className={styles.label}>Flight Duration</div>
        				<div className={styles.value}>
        					<span>
        						{functions.convertMinutesToHHMM(data?.outbound?.duration)}
        					</span>
        				</div>
        			</div>
        			<div className={styles.row}>
        				<div className={styles.label}>Cabin Type</div>
        				<div className={styles.value}>
        					<span>{data?.outbound?.cabinType}</span>
        				</div>
        			</div>
        			<div className={styles.row}>
        				<div className={styles.label}>Baggage Allowance</div>
        				<div className={styles.value}>
        					<span>{data?.outbound?.baggage}</span>
        				</div>
        			</div>
        		</div>

        		{/* INBOUND FLIGHTS */}
        		<div className={styles.modal__flight_details_section}>
        			<h5>Inbound Flight</h5>
        			<div className={styles.row}>
        				<div className={styles.label}>Airline</div>
        				<div className={styles.value}>
        					<span>{data?.inbound?.airlineName || "Pending Booking"}</span>
        				</div>
        			</div>
        			<div className={styles.row}>
        				<div className={styles.label}>Flight Number</div>
        				<div className={styles.value}>
        					<span>
        						{data?.inbound?.flightNumber || "Pending Booking"}
        					</span>
        				</div>
        			</div>
        			<div className={styles.row}>
        				<div className={styles.label}>Departure</div>
        				<div className={styles.value}>
        					<span>
        						{functions.getFormattedAirportByIata(
        							data?.inbound?.departureCode
        						)}
        						<br />
        						{new Date(
        							data?.inbound?.departureTime
        						)?.toDateString()},{" "}
        						<span>
        							{functions.formatCustomTime(data?.inbound?.departureTime)}
        						</span>
        					</span>
        				</div>
        			</div>
        			<div className={styles.row}>
        				<div className={styles.label}>Arrival</div>
        				<div className={styles.value}>
        					<span>
        						{functions.getFormattedAirportByIata(
        							data?.inbound?.arrivalCode
        						)}
        						<br />
        						{new Date(data?.inbound?.arrivalTime)?.toDateString()},{" "}
        						<span>
        							{functions.formatCustomTime(data?.inbound?.arrivalTime)}
        						</span>
        					</span>
        				</div>
        			</div>
        			<div className={styles.row}>
        				<div className={styles.label}>Flight Duration</div>
        				<div className={styles.value}>
        					<span>
        						{functions.convertMinutesToHHMM(data?.inbound?.duration)}
        					</span>
        				</div>
        			</div>
        			<div className={styles.row}>
        				<div className={styles.label}>Cabin Type</div>
        				<div className={styles.value}>
        					<span>{data?.inbound?.cabinType}</span>
        				</div>
        			</div>
        			<div className={styles.row}>
        				<div className={styles.label}>Baggage Allowance</div>
        				<div className={styles.value}>
        					<span>{data?.inbound?.baggage}</span>
        				</div>
        			</div>
        		</div>
        	</div>
        ))}

			{/* MAIN FLIGHT DETAILS CONTENT - COST & PAYMENT */}
			{activeTab === tabs[2] && (
				<div className={styles.modal__flight_details}>
					<div className={styles.modal__flight_details_section}>
						<h5>Cost</h5>
						<div className={styles.row}>
							<div className={styles.label}>Base Fare</div>
							<div className={styles.value}>
								<span>{functions.formatMoney(baseFare, data.currency)}</span>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.label}>Taxes (VAT) & Fees</div>
							<div className={styles.value}>
								<span>{functions.formatMoney(fees, data.currency)}</span>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.label}>Total Costs</div>
							<div className={styles.value}>
								<span className="text-bold">
									{functions.formatMoney(data.totalAmount, data.currency)}
								</span>
							</div>
						</div>
					</div>
					<div className={styles.modal__flight_details_section}>
						<h5>Payment Information</h5>
						<div className={styles.row}>
							<div className={styles.label}>Payment Method</div>
							<div className={styles.value}>
								<span>Passpoint Wallet</span>
							</div>
						</div>
						{/* <div className={styles.row}>
              <div className={styles.label}>Card Information</div>
              <div className={styles.value}>
                <span>**** 5678</span>
              </div>
            </div> */}
						<div className={styles.row}>
							<div className={styles.label}>Payment Status</div>
							<div className={styles.value}>
								<span className="tag text-bold text-blue text-black-50">
									{data?.transactionStatus}
								</span>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* MAIN FLIGHT DETAILS CONTENT - TRAVELER INFO */}
			{activeTab === tabs[3] && (
				<div className={styles.modal__flight_details}>
					{!data?.passengers && <h4>No passengers Data</h4>}
					{data?.passengers?.map((passenger, index) => (
						<div
							key={passenger?.documents?.number}
							className={styles.modal__flight_details_section}
						>
							<h5>Traveler {index + 1}</h5>
							<div className={styles.row}>
								<div className={styles.label}>Name</div>
								<div className={styles.value}>
									<span className="capitalize">
										{passenger?.title} {passenger?.firstName}{" "}
										{passenger?.lastName}
									</span>
								</div>
							</div>
							<div className={styles.row}>
								<div className={styles.label}>Contact Email</div>
								<div className={styles.value}>
									<span>{passenger?.email}</span>
								</div>
							</div>
							<div className={styles.row}>
								<div className={styles.label}>Contact Number</div>
								<div className={styles.value}>
									<span>{passenger?.phoneNumber}</span>
								</div>
							</div>
							<div className={styles.row}>
								<div className={styles.label}>Date of Birth</div>
								<div className={styles.value}>
									<span>
										{functions
											.formatTimestamp(passenger?.dateOfBirth)
											?.substring(4)}
									</span>
								</div>
							</div>
							<div className={styles.row}>
								<div className={styles.label}>Gender</div>
								<div className={styles.value}>
									<span className="capitalize">{passenger?.gender}</span>
								</div>
							</div>
							<div className={styles.row}>
								<div className={styles.label}>Ticket Number</div>
								<div className={styles.value}>
									<span className="text-blue">{passenger?.ticketNumber}</span>
								</div>
							</div>
							<div className={styles.row}>
								<div className={styles.label}>Passenger Type</div>
								<div className={styles.value}>
									<span className="capitalize">{passenger?.passengerType}</span>
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			<div className={styles.modal__bottom_actions}>
				<button className="primary_btn"
					onClick={() => closeModal()}>
          Close
				</button>
				<button className="primary_btn"
					onClick={() => cancelBooking()}>
					{isUploading ? <Loader /> : "Cancel Bookings"}
				</button>
			</div>
		</ModalWrapper>
	)
}

export default FlightDetailsModal
