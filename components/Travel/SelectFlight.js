"use client"

import styles from "../../assets/styles/flight.module.css"
import { FaChevronDown } from "react-icons/fa"
import FlightCard from "./FlightCard"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { travel } from "@/services/restService"
import functions from "@/utils/functions"
// import Link from "next/link"
// import { ProfileEditIcon } from "@/constants/icons"

const SelectFlight = () => {
	const [flights, setFlights] = useState([])
	const [sortedFlights, setSortedFlights] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const searchParams = useSearchParams()
	const queryParams = {
		adults: searchParams.get("adults"),
		cabin: searchParams.get("cabin"),
		children: searchParams.get("children"),
		departureDate: searchParams.get("departureDate"),
		destination: searchParams.get("destination"),
		infants: searchParams.get("infants"),
		origin: searchParams.get("origin"),
		returnDate: searchParams.get("returnDate"),
	}

	// FILTER PRICE
	const [sortCategory, setSortCategory] = useState("cheapest")

	const [filterPrice, setFilterPrice] = useState(0)
	const [lowestPrice, setLowestPrice] = useState(0)
	const [highestPrice, setHighestPrice] = useState(0)

	const [cheapestFlight, setCheapestFlight] = useState("")
	const [quickestFlight, setQuickestFlight] = useState("")

	const [filterAirlines, setFilterAirlines] = useState("")
	const [flightAirlines, setFlightAirlines] = useState([])

	const [outboundTakeOffTime, setOutboundTakeOffTime] = useState(-1)
	const [inboundTakeOffTime, setInboundTakeOffTime] = useState(-1)

	const getFlights = async () => {
		setIsLoading(true)
		const flightsPromise = await travel.searchFlights(queryParams)
		const tempFlights = flightsPromise.data.data
		const tempAirlines = new Set()

		// Get price filter
		setLowestPrice(tempFlights?.at(0)?.amount)
		setHighestPrice(tempFlights?.at(-1)?.amount)
		setFilterPrice(tempFlights?.at(-1)?.amount)

		// Get cheapest and quickest flights
		const priceSortedFlights = sortFlights(tempFlights)
		setCheapestFlight(priceSortedFlights?.at(0)?.id)

		const durationSortedFlights = sortFlights(tempFlights, "quickest")
		setQuickestFlight(durationSortedFlights?.at(0)?.id)

		tempFlights.forEach((flight) => {
			flight?.outbound?.forEach((flightStop) => {
				tempAirlines.add(flightStop?.airline_details?.name)
			})
			flight?.inbound?.forEach((flightStop) => {
				tempAirlines.add(flightStop?.airline_details?.name)
			})
		})
		setFlightAirlines(Array.from(tempAirlines))

		setFlights(tempFlights)
		setSortedFlights(tempFlights)
		setIsLoading(false)
	}

	const sortFlights = (flightsArr, category = "cheapest") => {
		switch (category) {
		case "cheapest":
			return [...flightsArr]?.sort(
				(flightA, flightB) => Number(flightA.amount) - Number(flightB.amount)
			)

		case "quickest":
			return [...flightsArr]?.sort(
				(flightA, flightB) =>
					Number(flightA.total_duration) - Number(flightB.total_duration)
			)
		}
	}

	// eslint-disable-next-line no-unused-vars
	const isStopoverGreaterThan = (number = 0) => {
		return flights?.find(
			(flight) =>
				Number(flight?.inbound_stops) + Number(flight?.outbound_stops) > number
		)
	}

	const addAirportAirlineFilter = (airline) => {
		let tempAirlines = [...filterAirlines]
		if (tempAirlines.includes(airline)) {
			tempAirlines = tempAirlines?.filter((a) => a !== airline)
		} else {
			tempAirlines.push(airline)
		}
		setFilterAirlines(tempAirlines)
	}

	// TRIGGER UPDATE WHEN FLIGHTS LIST IS SORTED / FILTERED
	useEffect(() => {
		let tempFlights = [...sortedFlights]
		tempFlights = sortFlights(tempFlights, sortCategory)

		setSortedFlights(tempFlights)
	}, [sortCategory])
	useEffect(() => {
		let tempFlights = [...flights]

		// FILTER BY PRICE
		tempFlights = tempFlights?.filter(
			(flight) => Number(flight.amount) < filterPrice
		)

		// FILTER BY AIRLINES
		if (filterAirlines.length > 0) {
			tempFlights = tempFlights?.filter((flight) => {
				const outboundAirlineAvailable = flight?.outbound?.find((flightStop) =>
					filterAirlines.includes(flightStop.airline_details.name)
				)
				const inboundAirlineAvailable = flight?.inbound?.find((flightStop) =>
					filterAirlines.includes(flightStop.airline_details.name)
				)
				return outboundAirlineAvailable || inboundAirlineAvailable
			})
		}

		// FILTER BY OUTBOUND TIME
		if (outboundTakeOffTime >= 0) {
			tempFlights = tempFlights?.filter((flight) => {
				const hour = new Date(
					flight?.outbound?.at(0)?.departure_time
				).getHours()
				return outboundTakeOffTime > hour
			})
		}

		// FILTER BY INBOUND TIME
		if (inboundTakeOffTime >= 0) {
			tempFlights = tempFlights?.filter((flight) => {
				const hour = new Date(flight?.inbound?.at(0)?.departure_time).getHours()
				console.log(hour)
				return inboundTakeOffTime > hour
			})
		}

		setSortedFlights(tempFlights)
	}, [filterAirlines, filterPrice, outboundTakeOffTime, inboundTakeOffTime])

	useEffect(() => {
		getFlights()
	}, [searchParams])

	return (
		<div className={`select-flight-wrapper ${styles.row__wrapper}`}>
			<button className={styles.row__header}>
				<div className="texts">
					<h3 className="capitalize">
            Select Flights ({sortedFlights?.length})
					</h3>
					{/* <p>Manage your bookings here</p> */}
				</div>
				<FaChevronDown />
			</button>
			<div className={styles.fs__row}>
				<div className={styles.lhs}>
					{/* CATEGORY FILTER */}
					<div className={styles.filter__box}>
						<button className={styles.header}>
							<h5 className="capitalize">Sort by Category</h5>
							<FaChevronDown />
						</button>
						<div className={styles.content}>
							{/* <label className={styles.filter__input}>
                <input type="checkbox" name="category" />
                Best
              </label> */}
							<label className={styles.filter__input}>
								<input
									type="radio"
									name="category"
									value="cheapest"
									checked={sortCategory === "cheapest"}
									onChange={(e) => setSortCategory(e.target.value)}
								/>
                Cheapest
							</label>
							<label className={styles.filter__input}>
								<input
									type="radio"
									name="category"
									value="quickest"
									checked={sortCategory === "quickest"}
									onChange={(e) => setSortCategory(e.target.value)}
								/>
                Quickest
							</label>
						</div>
					</div>
					{/* PRICE FILTER */}
					<div className={styles.filter__box}>
						<button className={styles.header}>
							<h5 className="capitalize">
                Max Price ({functions.formatMoney(filterPrice, "NGN", 0)})
							</h5>
							<FaChevronDown />
						</button>
						<div className={styles.content}>
							<label
								className={`${styles.filter__input} ${styles.range__input}`}
							>
								<div className={styles.range__ctn}>
									<input
										type="range"
										name="filterPrice"
										min={Number(lowestPrice)}
										max={Number(highestPrice)}
										value={filterPrice}
										onChange={(e) => setFilterPrice(e.target.value)}
									/>
								</div>
								<div className={styles.filter__input_col_two}>
									<div>{functions.formatMoney(lowestPrice, "NGN", 0)}</div>
									<div>{functions.formatMoney(highestPrice, "NGN", 0)}</div>
								</div>
							</label>
						</div>
					</div>
					{/* STOPS FILTER */}
					{/* {isStopoverGreaterThan() && (
            <div className={styles.filter__box}>
              <button className={styles.header}>
                <h5 className="capitalize">Stops</h5>
                <FaChevronDown />
              </button>
              <div className={styles.content}>
                <label className={styles.filter__input}>
                  <input type="checkbox" name="stops" />
                  Non-stop
                </label>
                <label className={styles.filter__input}>
                  <input type="checkbox" name="stops" />1 stop
                </label>
                {isStopoverGreaterThan(1) && (
                  <label className={styles.filter__input}>
                    <input type="checkbox" name="stops" />
                    2+ stops
                  </label>
                )}
              </div>
            </div>
          )} */}
					{/* TIME FILTER */}
					<div className={styles.filter__box}>
						<button className={styles.header}>
							<h5 className="capitalize">Departure Time</h5>
							<FaChevronDown />
						</button>
						<div className={styles.content}>
							<label
								className={`${styles.filter__input} ${styles.range__input}`}
							>
								<div className={styles.filter__input_col_one}>
                  Outbound{" "}
									<span>
                    Flights before{" "}
										{outboundTakeOffTime >= 0 &&
                      functions.convertTo12HourFormat(outboundTakeOffTime)}
									</span>
								</div>
								<div className={styles.range__ctn}>
									<input
										type="range"
										name="outboundTakeOffTime"
										id=""
										min={0}
										max={23}
										value={outboundTakeOffTime}
										onChange={(e) => setOutboundTakeOffTime(e.target.value)}
									/>
								</div>
								<div className={styles.filter__input_col_two}>
									<div>12:00AM</div>
									<button onClick={() => setOutboundTakeOffTime(-1)}>
                    Clear Filter
									</button>
									<div>11:59PM</div>
								</div>
							</label>
							{queryParams.returnDate && (
								<label
									className={`${styles.filter__input} ${styles.range__input}`}
								>
									<div className={styles.filter__input_col_one}>
                    Return{" "}
										<span>
                      Flights before{" "}
											{inboundTakeOffTime >= 0 &&
                        functions.convertTo12HourFormat(inboundTakeOffTime)}
										</span>
									</div>
									<div className={styles.range__ctn}>
										<input
											type="range"
											name="inboundTakeOffTime"
											id=""
											min={0}
											max={23}
											value={inboundTakeOffTime}
											onChange={(e) => setInboundTakeOffTime(e.target.value)}
										/>
									</div>
									<div className={styles.filter__input_col_two}>
										<div>12:00AM</div>
										<button onClick={() => setInboundTakeOffTime(-1)}>
                      Clear Filter
										</button>
										<div>11:59PM</div>
									</div>
								</label>
							)}
						</div>
					</div>
					{/* AIRLINE FILTER */}
					<div className={styles.filter__box}>
						<button className={styles.header}>
							<h5 className="capitalize">Airlines</h5>
							<FaChevronDown />
						</button>
						<div className={styles.content}>
							{flightAirlines?.map((airline) => (
								<label key={airline} className={styles.filter__input}>
									<input
										type="checkbox"
										name="filterAirlines"
										checked={filterAirlines?.includes(airline)}
										value={airline}
										onChange={(e) => addAirportAirlineFilter(e.target.value)}
									/>
									{airline}
								</label>
							))}
						</div>
					</div>
					{/* LAYOVER FILTER */}
					{/* {isStopoverGreaterThan() && (
            <div className={styles.filter__box}>
              <button className={styles.header}>
                <h5 className="capitalize">Layover</h5>
                <FaChevronDown />
              </button>
              <div className={styles.content}>
                <div className={styles.filter__input_group}>
                  <h6>Canada</h6>
                  <label className={styles.filter__input}>
                    <input type="checkbox" name="layover" />
                    Iberia
                  </label>
                  <label className={styles.filter__input}>
                    <input type="checkbox" name="layover" />
                    Toronto
                  </label>
                </div>
                <div className={styles.filter__input_group}>
                  <h6>Egypt</h6>
                  <label className={styles.filter__input}>
                    <input type="checkbox" name="layover" />
                    Cairo
                  </label>
                </div>
              </div>
            </div>
          )} */}
				</div>
				<div className={styles.rhs}>
					{isLoading &&
            [1, 2, 3, 4].map((key) => (
            <div
              key={key}
              className={`${styles.dashMetric_content} skeleton`}
              style={{
                borderRadius: "16px",
                height: "200px",
                boxShadow: "none",
              }}
            />
            ))}
					{sortedFlights?.map((flight) => (
						<FlightCard
							key={flight.id}
							data={flight}
							cheapest={flight.id === cheapestFlight}
							quickest={flight.id === quickestFlight}
						/>
					))}
					{sortedFlights?.length === 0 && !isLoading ? (
						<div className="empty-state">
							<h2>✈️</h2>
							<h3>No Flights Available</h3>
						</div>
					):<></>}
				</div>
			</div>
		</div>
	)
}

export default SelectFlight
