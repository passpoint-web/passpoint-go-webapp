"use client"

import { getSelectedFlight, getCredentials } from "@/services/localService"
import { travel } from "@/services/restService"
import { useEffect, useState } from "react"
// import FlightPageHeader from "./FlightPageHeader"
import FlightPassengers from "./FlightPassengers"
import FlightPaymentOptions from "./FlightPaymentOptions"
import SelectedFlight from "./SelectedFlight"

const PayFlightPage = ({ styles }) => {
  const selectedFlight = getSelectedFlight()
  const [passengers, setPassengers] = useState([])

  const sortPassengersData = () => {
    const credentials = getCredentials()
    const tempPassengers = []
    passengers.forEach((passenger) => {
      const tempPassenger = { ...passenger }
      tempPassenger.title = passenger.gender === "male" ? "mr" : "miss"
      tempPassenger.phone_number = credentials.phoneNumber
      tempPassenger.documents = {
        number: passenger.passport_no,
        issuing_date: passenger.passport_issue,
        expiry_date: passenger.passport_expiry,
        issuing_country: "NG",
        nationality_country: "NG",
        document_type: "passport",
        holder: true,
      }
      tempPassengers.push(tempPassenger)
    })
    console.log(tempPassengers)
    makeFlightBooking(tempPassengers)
  }

  const makeFlightBooking = async (tempPassengers) => {
    await travel.createFlightBooking({
      flightId: selectedFlight?.id,
      passengers: tempPassengers,
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
        sortPassengersData={sortPassengersData}
      />
      <FlightPaymentOptions />
    </div>
  )
}

export default PayFlightPage
