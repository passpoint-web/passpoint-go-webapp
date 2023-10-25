"use client"

import { getSelectedFlight } from "@/services/localService"
import { travel } from "@/services/restService"
import { useEffect, useState } from "react"
// import FlightPageHeader from "./FlightPageHeader"
import FlightPassengers from "./FlightPassengers"
import FlightPaymentOptions from "./FlightPaymentOptions"
import SelectedFlight from "./SelectedFlight"

const PayFlightPage = ({ styles }) => {
  const selectedFlight = getSelectedFlight()
  const [passengers, setPassengers] = useState([])

  const makeFlightBooking = async () => {
    await travel.createFlightBooking({
      flightId: selectedFlight?.id,
      passengers: passengers,
    })
  }

  useEffect(() => {
    // makeFlightBooking()

    // populate [passengers] array with flight booking info
    const tempPassengers = []
    selectedFlight?.travelers_price?.forEach((traveler) => {
      const isChild = !!traveler.child
      const isAdult = !!traveler.adult

      if (isAdult) {
        tempPassengers.push({
          id: tempPassengers.length + 1,
          passenger_type: "adult",
        })
      } else if (isChild) {
        tempPassengers.push({
          id: tempPassengers.length + 1,
          passenger_type: "child",
        })
      } else {
        tempPassengers.push({
          id: tempPassengers.length + 1,
          passenger_type: "infant",
        })
      }
    })
    setPassengers(tempPassengers)
  }, [])

  return (
    <div className={`${styles.inner} flight-services`}>
      <SelectedFlight data={selectedFlight} />
      <FlightPassengers
        passengersParent={passengers}
        setPassengersParent={setPassengers}
      />
      <FlightPaymentOptions />
    </div>
  )
}

export default PayFlightPage
