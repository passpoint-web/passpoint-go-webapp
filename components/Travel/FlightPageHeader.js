"use client"

import { AirplaneIcon, FlightExchangeIcon } from "@/constants/icons"
import Link from "next/link"
import CustomSelect from "@/components/Custom/Select"
import Input from "../Dashboard/Input"
import { useEffect, useState } from "react"
import { travel } from "@/services/restService"
import { getAirportsState, setAirportsState } from "@/services/localService"
import CustomObjectSelect from "../Custom/CustomObjectSelect"
import { useSearchParams } from "next/navigation"

const FlightPageHeader = ({ styles }) => {
  const searchParams = useSearchParams()

  let airports = getAirportsState()
  airports = airports?.filter(
    (airport) =>
      airport.country === "Nigeria" ||
      airport.country === "Ghana" ||
      airport.country === "Canada" ||
      airport.country === "United Arab Emirates" ||
      airport.country === "United States" ||
      airport.country === "United Kingdom" ||
      airport.country === "Kenya" ||
      airport.country === "Tanzania" ||
      airport.country === "Ethiopia"
  )

  const queryParams = {
    adults: searchParams.get("adults"),
    cabin: searchParams.get("cabin"),
    children: searchParams.get("children"),
    departureDate: searchParams.get("departureDate"),
    destination: searchParams.get("destination"),
    infants: searchParams.get("infants"),
    origin: searchParams.get("origin"),
    returnDate: searchParams.get("returnDate"),
    tripType: searchParams.get("tripType"),
  }
  console.log(queryParams?.tripType)

  const today = new Date().toISOString().split("T")[0]

  const [fromAirport, setFromAirport] = useState(queryParams.origin || "")
  const [toAirport, setToAirport] = useState(queryParams.destination || "")
  const [departureDate, setDepartureDate] = useState(
    queryParams.departureDate || ""
  )
  const [returnDate, setReturnDate] = useState(queryParams.returnDate || "")
  const [tripType, setTripType] = useState(queryParams.tripType || "One Way")
  const [infants, setInfants] = useState(queryParams.infants || "")
  const [children, setChildren] = useState(queryParams.children || "")
  const [adult, setAdult] = useState(queryParams.adults || 1)
  const [flightClass, setFlightClass] = useState(
    queryParams?.cabin || "Economy"
  )

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
      <div className={`${styles.row_one} travel__dashboard_header_row_one`}>
        <div>
          <h3>Flights</h3>
          <p>
            {" "}
            <Link href="/travel">Travel Services</Link> {">>"} Flights{" "}
          </p>
        </div>
        <div className={`${styles.quick__filter} quick__filter`}>
          <CustomSelect
            id="trip-type"
            selectOptions={["Round Trip", "One way"]}
            selectedOption={tripType}
            styleProps={{
              dropdown: {
                height: 100,
              },
              option: {
                height: 40,
              },
            }}
            placeholder="Select Trip Type"
            emitSelect={(e) => setTripType(e)}
          />
          <Input
            id="passengers"
            name="passengers"
            type="number"
            placeholder="Adults"
            value={adult}
            onChange={(e) => setAdult(e.target.value)}
          />
          <Input
            id="passengers"
            name="passengers"
            type="number"
            placeholder="Children"
            value={children}
            onChange={(e) => setChildren(e.target.value)}
          />
          <Input
            id="passengers"
            name="passengers"
            type="number"
            placeholder="Infants"
            value={infants}
            onChange={(e) => setInfants(e.target.value)}
          />
          <CustomSelect
            id="class"
            selectOptions={["Economy", "Premium Economy", "Business", "First"]}
            selectedOption={flightClass}
            styleProps={{
              dropdown: {
                height: 150,
              },
              option: {
                height: 40,
              },
            }}
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
          <Input label="Leaving From">
            <CustomObjectSelect
              id="leaving-from"
              selectOptions={airports}
              selectedOption={fromAirport}
              objKey="iataCode"
              placeholder="From Airport"
              emitSelect={(e) => setFromAirport(e)}
            />
          </Input>
          <span className={styles.svg__wrapper}>
            <FlightExchangeIcon />
          </span>
          <Input label="Going to">
            <CustomObjectSelect
              id="going-to"
              selectOptions={airports}
              selectedOption={toAirport}
              objKey="iataCode"
              placeholder="To Airport"
              emitSelect={(e) => setToAirport(e)}
            />
          </Input>
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
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
          <Input
            label="Return Date"
            id="going-to"
            name="returnDate"
            type="date"
            placeholder="Select Date"
            styleProps={
              !tripType?.includes("Round Trip")
                ? { display: "none" }
                : { display: "block" }
            }
            min={departureDate || today}
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </div>
        <Link
          className="primary_btn"
          href={`/travel/flights/search?adults=${adult || ""}&cabin=${
            flightClass || ""
          }&children=${children || ""}&departureDate=${
            departureDate || ""
          }&destination=${toAirport || ""}&infants=${infants || ""}&origin=${
            fromAirport || ""
          }&returnDate=${
            tripType === "Round Trip" ? returnDate || "" : ""
          }&tripType=${tripType || ""}`}
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
