"use client"

import { AirplaneIcon, FlightExchangeIcon } from "@/constants/icons"
import Link from "next/link"
import CustomSelect from "@/components/Custom/Select"
import { useEffect, useState } from "react"
import { travel } from "@/services/restService"
import { getAirportsState, setAirportsState } from "@/services/localService"
import { useSearchParams } from "next/navigation"
import Input from "@/components/Dashboard/Input"
import CustomObjectSelect from "@/components/Custom/CustomObjectSelect"

const HotelPageHeader = ({ styles }) => {
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
    adults: searchParams?.get("adults"),
    cabin: searchParams?.get("cabin"),
    children: searchParams?.get("children"),
    departureDate: searchParams?.get("departureDate"),
    destination: searchParams?.get("destination"),
    infants: searchParams?.get("infants"),
    origin: searchParams?.get("origin"),
    returnDate: searchParams?.get("returnDate"),
    tripType: searchParams?.get("tripType"),
  }
  // console.log(queryParams?.tripType)

  const today = new Date().toISOString().split("T")[0]

  const [fromAirport, setFromAirport] = useState(queryParams?.origin || "")
  const [toAirport, setToAirport] = useState(queryParams?.destination || "")
  const [departureDate, setDepartureDate] = useState(
    queryParams?.departureDate || ""
  )
  const [returnDate, setReturnDate] = useState(queryParams?.returnDate || "")
  const [tripType, setTripType] = useState(queryParams?.tripType || "One Way")
  const [infants, setInfants] = useState(queryParams?.infants || "")
  const [children, setChildren] = useState(queryParams?.children || "")
  const [adult, setAdult] = useState(queryParams?.adults || 1)
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
          <h3>Hotels</h3>
          <p>
            {" "}
            <Link href="/travel">Travel Services</Link> {">>"} Hotels{" "}
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
            id="departure-date"
            name="departureDate"
            placeholder="Enter City Here"
            min={today}
            max={returnDate}
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
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
        <Input
          label="Location"
          id="departure-date"
          name="departureDate"
          placeholder="Enter City Here"
          min={today}
          max={returnDate}
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />
        <div className={styles.to__fro_group}>
          <Input
            label="Check-in Date"
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
            label="Check-out Date"
            id="departure-date"
            name="departureDate"
            type="date"
            placeholder="Select Date"
            min={today}
            max={returnDate}
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>
        <Link
          className="primary_btn"
          href={`/travel/Hotels/search?adults=${adult || ""}&cabin=${
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
          Search Hotels
        </Link>
      </div>
    </div>
  )
}

export default HotelPageHeader
