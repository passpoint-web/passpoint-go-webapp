"use client";

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
      airport.iataCode === "LOS" ||
      airport.iataCode === "ABV" ||
      airport.iataCode === "JFK" ||
      airport.iataCode === "YYZ" ||
      airport.iataCode === "NBO"
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
  console.log(queryParams.tripType)

  const today = new Date().toISOString().split("T")[0]

  const [fromAirport, setFromAirport] = useState(queryParams.origin)
  const [toAirport, setToAirport] = useState(queryParams.destination)
  const [departureDate, setDepartureDate] = useState(queryParams.departureDate)
  const [returnDate, setReturnDate] = useState(queryParams.returnDate)
  const [tripType, setTripType] = useState(queryParams.tripType || "One Way")
  const [infants, setInfants] = useState(queryParams.infants)
  const [children, setChildren] = useState(queryParams.children)
  const [adult, setAdult] = useState(queryParams.adults || 1)
  const [flightClass, setFlightClass] = useState(queryParams.cabin || "Economy")

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
<<<<<<< HEAD
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
            placeholder="Select Class"
            emitSelect={(e) => setFlightClass(e)}
=======
        <div className={styles.quick__filter}>
          <CustomSelect
            id="trip-type"
            selectOptions={["Round Trip", "One way", "Multi-city"]}
            selectedOption={"Round Trip"}
            placeholder="Select Trip Type"
          />
          <CustomSelect
            id="trip-type"
            selectOptions={[""]}
            selectedOption={""}
            placeholder="Number of Passengers"
          />
          <CustomSelect
            id="class"
            selectOptions={["Business", "Economy", "Premium Economy", "First"]}
            selectedOption={"Business"}
            placeholder="Select Class"
>>>>>>> 7ff9c7294be916be57c03f4c09b2f14847001e9b
          />
        </div>
      </div>
      <div className={styles.row_two}>
        <div className={styles.to__fro_group}>
<<<<<<< HEAD
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
=======
          <Input
            label="Leaving From"
            id="leaving-from"
            name="leavingFrom"
            placeholder="Airport or city"
          />
          <FlightExchangeIcon />
          <Input
            label="Going To"
            id="going-to"
            name="goingTo"
            placeholder="Airport or city"
>>>>>>> 7ff9c7294be916be57c03f4c09b2f14847001e9b
          />
        </div>
        <div className={styles.to__fro_group}>
          <Input
            label="Departure Date"
            id="departure-date"
            name="departureDate"
            type="date"
            placeholder="Select Date"
<<<<<<< HEAD
            min={today}
            max={returnDate}
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
=======
>>>>>>> 7ff9c7294be916be57c03f4c09b2f14847001e9b
          />
          <Input
            label="Return Date"
            id="going-to"
            name="returnDate"
            type="date"
            placeholder="Select Date"
<<<<<<< HEAD
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
          href={`/dashboard/travel/flights/search?adults=${adult || ""}&cabin=${
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
=======
          />
        </div>
        <Link className="primary_btn" href={"/dashboard/travel/flights/search"}>
>>>>>>> 7ff9c7294be916be57c03f4c09b2f14847001e9b
          <AirplaneIcon />
          Search Flights
        </Link>
      </div>
    </div>
<<<<<<< HEAD
  )
}
=======
  );
};
>>>>>>> 7ff9c7294be916be57c03f4c09b2f14847001e9b

export default FlightPageHeader;
