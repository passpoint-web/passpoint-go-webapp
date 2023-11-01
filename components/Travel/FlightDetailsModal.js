"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import ModalWrapper from "../Modal/ModalWrapper"
import { travel } from "@/services/restService"
import { useNotify } from "@/utils/hooks"
import functions from "@/utils/functions"

const FlightDetailsModal = ({ setFlightDetailVisible, styles }) => {
  const { formatMoney } = functions
  const notify = useNotify()
  const searchParams = useSearchParams()
  const id = searchParams.get("id")
  const path = usePathname()
  // const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const tabs = ["General", "Itinerary", "Cost & Payment", "Traveler's Info"]
  const [activeTab, setActiveTab] = useState(tabs[0])
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState({})
  const [baseFare, setBaseFare] = useState(0)
  const [fees, setFees] = useState(0)

  const closeModal = () => {
    setFlightDetailVisible(null)
    router.push(path.substring(path.indexOf("?")))
  }

  const getFlightBooking = async () => {
    try {
      const response = await travel.getFlightBooking(id)
      setData(response.data.data)
      calculateBaseFare(response.data.data)
    } catch (_err) {
      // console.log(_err.response.data.description)
      const { message, description } = _err.response?.data || _err
      notify("error", message || description)
    } finally {
      // setIsLoading(false)
    }
  }

  const calculateBaseFare = (dataParam) => {
    let total = 0
    dataParam.travelers_price.forEach((traveler) => {
      const amountValues = Object.values(traveler)
      total += Number(amountValues[0])
    })
    setBaseFare(total)
    setFees(Number(dataParam.amount) - total)
    return total
  }

  useEffect(() => {
    getFlightBooking()
  }, [])

  return (
    <ModalWrapper
      loading={false}
      onClose={() => closeModal()}
      ctaBtnType="none"
      heading={"Flight Details"}
      subHeading={"See all your booking details here"}
      ctaBtnText="Modify"
      bottomCancelNeeded={false}
      containsTabLayout
      hasBottomActions={false}
    >
      <div className={styles.modal__tab_group}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={tab === activeTab ? styles.active : ""}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* MAIN FLIGHT DETAILS CONTENT - GENERAL */}
      {activeTab === tabs[0] && (
        <div className={styles.modal__flight_details}>
          <div className={styles.modal__flight_details_section}>
<<<<<<< HEAD
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
                <span className="text-blue text-bold uppercase">{id}</span>
=======
            <div className={styles.row}>
              <div className={styles.label}>Booking ID</div>
              <div className={styles.value}>
                <span className="text-blue uppercase">{id}</span>
>>>>>>> 7ff9c7294be916be57c03f4c09b2f14847001e9b
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Booking Date & Time</div>
              <div className={styles.value}>
                <span>
<<<<<<< HEAD
                  {new Date(data?.created_at)?.toDateString()},{" "}
                  <span>{functions.formatCustomTime(data?.created_at)}</span>
=======
                  Oct 15, 2023, <span>8:45 PM</span>
>>>>>>> 7ff9c7294be916be57c03f4c09b2f14847001e9b
                </span>
              </div>
            </div>
            <div className={styles.row}>
<<<<<<< HEAD
              <div className={styles.label}>Booking Expiration Date</div>
              <div className={styles.value}>
                <span>
                  {new Date(data?.expires_at)?.toDateString()},{" "}
                  <span>{functions.formatCustomTime(data?.expires_at)}</span>
                </span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Total Cost</div>
              <div className={`${styles.value}`}>
                <span className="text-bold">
                  {formatMoney(data?.amount, data?.currency)}
                </span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Booking Status</div>
              <div className={styles.value}>
                {/* <div className="success-tag">Confirmed</div>
							<div className="pending-tag">Pending</div>
							<div className="failed-tag">Failed</div> */}
                - - -
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Return Ticket</div>
              <div className={styles.value}>
                <span>{data?.inbound?.length > 0 ? "Yes" : "No"}</span>
=======
              <div className={styles.label}>Booking Reference</div>
              <div className={styles.value}>
                <span>XYZFlight20231101</span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Flight Number</div>
              <div className={styles.value}>
                <span>XYZ123</span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Departure Location</div>
              <div className={styles.value}>
                <span>JFK International Airport, New York</span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Arrival Location</div>
              <div className={styles.value}>
                <span>Heathrow Airport, London</span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Departure Date & Time</div>
              <div className={styles.value}>
                <span>November 1, 2023, 10:00 AM</span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Arrival Date & Time</div>
              <div className={styles.value}>
                <span>November 1, 2023, 10:00 AM</span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Airline</div>
              <div className={styles.value}>
                <span>Air Travel Express</span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Booking Status</div>
              <div className={styles.value}>
                <div className="success-tag">Confirmed</div>
                <div className="pending-tag">Pending</div>
                <div className="failed-tag">Failed</div>
>>>>>>> 7ff9c7294be916be57c03f4c09b2f14847001e9b
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN FLIGHT DETAILS CONTENT - ITINERARY */}
      {activeTab === tabs[1] && (
        <div className={styles.modal__flight_details}>
<<<<<<< HEAD
          {/* OUTBOUND FLIGHTS */}
          <div className={styles.modal__flight_details_section}>
            <h5>Outbound Flight</h5>
            <div className={styles.row}>
              <div className={styles.label}>Airline</div>
              <div className={styles.value}>
                <span>{data?.outbound?.at(0)?.airline_details?.name}</span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Flight Number</div>
              <div className={styles.value}>
                <span>{data?.outbound?.at(0)?.flight_number}</span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Departure</div>
              <div className={styles.value}>
                <span>
                  {functions.getFormattedAirportByIata(
                    data?.outbound?.at(0)?.airport_from
                  )}
                  <br />
                  {new Date(
                    data?.outbound?.at(0)?.departure_time
                  )?.toDateString()}
                  ,{" "}
                  <span>
                    {functions.formatCustomTime(
                      data?.outbound?.at(0)?.departure_time
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
                    data?.outbound?.at(0)?.airport_to
                  )}
                  <br />
                  {new Date(
                    data?.outbound?.at(0)?.arrival_time
                  )?.toDateString()}
                  ,{" "}
                  <span>
                    {functions.formatCustomTime(
                      data?.outbound?.at(0)?.arrival_time
                    )}
                  </span>
=======
          <div className={styles.modal__flight_details_section}>
            <h5>Flight 1</h5>
            <div className={styles.row}>
              <div className={styles.label}>Booking ID</div>
              <div className={styles.value}>
                <span className="text-blue">AH12345678</span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Booking Date & Time</div>
              <div className={styles.value}>
                <span>
                  Oct 15, 2023, <span>8:45 PM</span>
>>>>>>> 7ff9c7294be916be57c03f4c09b2f14847001e9b
                </span>
              </div>
            </div>
            <div className={styles.row}>
<<<<<<< HEAD
              <div className={styles.label}>Flight Duration</div>
              <div className={styles.value}>
                <span>
                  {functions.convertMinutesToHHMM(
                    data?.outbound?.at(0)?.duration
                  )}
                </span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Cabin Type</div>
              <div className={styles.value}>
                <span>{data?.outbound?.at(0)?.cabin_type}</span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Baggage Allowance</div>
              <div className={styles.value}>
                <span>{data?.outbound?.at(0)?.baggage}</span>
              </div>
            </div>
          </div>

          {/* INBOUND FLIGHTS */}
          {data?.inbound?.length > 0 && (
            <div className={styles.modal__flight_details_section}>
              <h5>Inbound (Return) Flight</h5>
              <div className={styles.row}>
                <div className={styles.label}>Airline</div>
                <div className={styles.value}>
                  <span>{data?.inbound?.at(0)?.airline_details?.name}</span>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Flight Number</div>
                <div className={styles.value}>
                  <span>{data?.inbound?.at(0)?.flight_number}</span>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Departure</div>
                <div className={styles.value}>
                  <span>
                    {functions.getFormattedAirportByIata(
                      data?.inbound?.at(0)?.airport_from
                    )}
                    <br />
                    {new Date(
                      data?.inbound?.at(0)?.departure_time
                    )?.toDateString()}
                    ,{" "}
                    <span>
                      {functions.formatCustomTime(
                        data?.inbound?.at(0)?.departure_time
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
                      data?.inbound?.at(0)?.airport_to
                    )}
                    <br />
                    {new Date(
                      data?.inbound?.at(0)?.arrival_time
                    )?.toDateString()}
                    ,{" "}
                    <span>
                      {functions.formatCustomTime(
                        data?.inbound?.at(0)?.arrival_time
                      )}
                    </span>
                  </span>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Flight Duration</div>
                <div className={styles.value}>
                  <span>
                    {functions.convertMinutesToHHMM(
                      data?.inbound?.at(0)?.duration
                    )}
                  </span>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Cabin Type</div>
                <div className={styles.value}>
                  <span>{data?.inbound?.at(0)?.cabin_type}</span>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Baggage Allowance</div>
                <div className={styles.value}>
                  <span>{data?.inbound?.at(0)?.baggage}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

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
                  {functions.formatMoney(data.amount, data.currency)}
                </span>
=======
              <div className={styles.label}>Booking Reference</div>
              <div className={styles.value}>
                <span>XYZFlight20231101</span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Flight Number</div>
              <div className={styles.value}>
                <span>XYZ123</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN FLIGHT DETAILS CONTENT - COST & PAYMENT */}
      {activeTab === tabs[2] && (
        <div className={styles.modal__flight_details}>
          <div className={styles.modal__flight_details_section}>
            <h5>Cost</h5>
            <div className={styles.row}>
              <div className={styles.label}>Base Fare</div>
              <div className={styles.value}>
                <span>₦180,000</span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Taxes (VAT) & Fees</div>
              <div className={styles.value}>
                <span>₦20,000</span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Total Costs</div>
              <div className={styles.value}>
                <span className="text-bold">₦200,000</span>
              </div>
            </div>
          </div>
          <div className={styles.modal__flight_details_section}>
            <h5>Payment Information</h5>
            <div className={styles.row}>
              <div className={styles.label}>Payment Method</div>
              <div className={styles.value}>
                <span>Debit Card</span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Card Information</div>
              <div className={styles.value}>
                <span>**** 5678</span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Payment Status</div>
              <div className={styles.value}>
                <span className="success-tag">Paid</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN FLIGHT DETAILS CONTENT - TRAVELER INFO */}
      {activeTab === tabs[3] && (
        <div className={styles.modal__flight_details}>
          <div className={styles.modal__flight_details_section}>
            <h5>Traveler 1</h5>
            <div className={styles.row}>
              <div className={styles.label}>Name</div>
              <div className={styles.value}>
                <span>John Smith</span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Contact</div>
              <div className={styles.value}>
                <span>john.smith@email.com</span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Passport Number</div>
              <div className={styles.value}>
                <span>ABC12345</span>
>>>>>>> 7ff9c7294be916be57c03f4c09b2f14847001e9b
              </div>
            </div>
          </div>
          <div className={styles.modal__flight_details_section}>
<<<<<<< HEAD
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
                <span className="success-tag">Paid</span>
=======
            <h5>Traveler 2</h5>
            <div className={styles.row}>
              <div className={styles.label}>Name</div>
              <div className={styles.value}>
                <span>Jane Doe</span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Contact</div>
              <div className={styles.value}>
                <span>jane.doe@email.com</span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Passport Number</div>
              <div className={styles.value}>
                <span>DEF67890</span>
>>>>>>> 7ff9c7294be916be57c03f4c09b2f14847001e9b
              </div>
            </div>
          </div>
        </div>
      )}

<<<<<<< HEAD
      {/* MAIN FLIGHT DETAILS CONTENT - TRAVELER INFO */}
      {activeTab === tabs[3] && (
        <div className={styles.modal__flight_details}>
          {!data?.passengers && <h4>No passengers Data</h4>}
          {data?.passengers?.map((passenger) => (
            <div
              key={passenger?.documents?.number}
              className={styles.modal__flight_details_section}
            >
              <h5>Traveler 1</h5>
              <div className={styles.row}>
                <div className={styles.label}>Name</div>
                <div className={styles.value}>
                  <span>
                    {passenger?.first_name} ${passenger?.last_name}
                  </span>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Contact</div>
                <div className={styles.value}>
                  <span>{passenger?.email}</span>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Passport Number</div>
                <div className={styles.value}>
                  <span>{passenger?.documents?.number}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.modal__bottom_actions}>
        <button className="primary_btn">Modify</button>
        <button className="primary_btn">Cancel Bookings</button>
      </div>
    </ModalWrapper>
  )
}

export default FlightDetailsModal
=======
      <div className={styles.modal__bottom_actions}>
        <button className="primary_btn">Modify</button>
        <button className="primary_btn">Cancel Bookings</button>
      </div>
    </ModalWrapper>
  );
};

export default FlightDetailsModal;
>>>>>>> 7ff9c7294be916be57c03f4c09b2f14847001e9b
