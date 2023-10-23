"use client"

import { AirplaneIcon, FlightExchangeIcon } from "@/constants/icons"
import Link from "next/link"
import CustomSelect from "@/components/Custom/Select"
import Input from "../Dashboard/Input"
import { useEffect, useState } from "react"
import { travel } from "@/services/restService"
import { getAirportsState, setAirportsState } from "@/services/localService"
import CustomObjectSelect from "../Custom/CustomObjectSelect"

const FlightPageHeader = ({ styles }) => {
  const today = new Date().toLocaleDateString()
  const [fromAirport, setFromAirport] = useState()
  const [toAirport, setToAirport] = useState()
  const [departureDate, setDepartureDate] = useState()
  const [returnDate, setReturnDate] = useState()
  const [tripType, setTripType] = useState()
  const [infants, setInfants] = useState()
  const [children, setChildren] = useState()
  const [adult, setAdult] = useState()
  const [flightClass, setFlightClass] = useState()

  let airports = getAirportsState()
  airports = airports?.filter((airport) => airport.country === "Nigeria")

  const getAirports = async () => {
    if (!airports) {
      const airportsPromise = await travel.getAirports()
      setAirportsState(airportsPromise.data.data.content)
    }
  }

  useEffect(() => {
    getAirports()
  }, [])

  return (
    <div className={styles.travel__dashboard_header}>
      <div className={styles.row_one}>
        <div>
          <h3>Flights</h3>
          <p>
            {" "}
            <Link href="/dashboard/travel">Travel Services</Link> {">>"} Flights{" "}
          </p>
        </div>
        <div className={`${styles.quick__filter} quick__filter`}>
          <CustomSelect
            id="trip-type"
            selectOptions={["Round Trip", "One way"]}
            selectedOption={tripType}
            placeholder="Select Trip Type"
            emitSelect={(e) => setTripType(e)}
          />
          <Input
            id="passengers"
            name="passengers"
            type="number"
            placeholder="Adults"
            onChange={(e) => setAdult(e.target.value)}
          />
          <Input
            id="passengers"
            name="passengers"
            type="number"
            placeholder="Children"
            onChange={(e) => setChildren(e.target.value)}
          />
          <Input
            id="passengers"
            name="passengers"
            type="number"
            placeholder="Infants"
            onChange={(e) => setInfants(e.target.value)}
          />
          <CustomSelect
            id="class"
            selectOptions={["Economy", "Premium Economy", "Business", "First"]}
            selectedOption={flightClass}
            placeholder="Select Class"
            emitSelect={(e) => setFlightClass(e)}
          />
        </div>
      </div>
      <div className={styles.row_two}>
        <div className={styles.to__fro_group}>
          {/* <Input
						label="Leaving From"
						id="leaving-from"
						name="leavingFrom"
						placeholder="Airport or city"
					/> */}
          <CustomObjectSelect
            label="Leaving From"
            id="leaving-from"
            selectOptions={airports}
            selectedOption={fromAirport}
            objKey="iataCode"
            placeholder="From Airport"
            emitSelect={(e) => setFromAirport(e)}
          />
          <span className={styles.svg__wrapper}>
            <FlightExchangeIcon />
          </span>
          <CustomObjectSelect
            label="Going to"
            id="going-to"
            selectOptions={airports}
            selectedOption={toAirport}
            objKey="iataCode"
            placeholder="To Airport"
            emitSelect={(e) => setToAirport(e)}
          />
        </div>
        <div className={styles.to__fro_group}>
          <Input
            label="Departure Date"
            id="departure-date"
            name="departureDate"
            type="date"
            placeholder="Select Date"
            min={today}
            max={returnDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
          <Input
            label="Return Date"
            id="going-to"
            name="returnDate"
            type="date"
            placeholder="Select Date"
            styleProps={tripType !== "Round Trip" ? { display: "none" } : ""}
            min={departureDate || today}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </div>
        <Link
          className="primary_btn"
          href={`/dashboard/travel/flights/search?adults=${adult || ""}&cabin=${
            flightClass || ""
          }&children=${children || ""}&departureDate=${
            departureDate || ""
          }&destination=${toAirport?.iataCode || ""}&infants=${
            infants || ""
          }&origin=${fromAirport?.iataCode || ""}&returnDate=${
            returnDate || ""
          }`}
          disabled={
            !(
              fromAirport &&
              toAirport &&
              departureDate &&
              (tripType === "Round Trip" ? returnDate : true)
            )
          }
        >
          <AirplaneIcon />
          Search Flights
        </Link>
      </div>
    </div>
  )
}

export default FlightPageHeader
