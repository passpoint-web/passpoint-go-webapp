"use client"

import { AirplaneIcon, FlightExchangeIcon } from "@/constants/icons"
import Link from "next/link"
import CustomSelect from "@/components/Custom/Select"
import Input from "../Dashboard/Input"

const FlightPageHeader = ({ styles }) => {
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
					/>
				</div>
			</div>
			<div className={styles.row_two}>
				<div className={styles.to__fro_group}>
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
					/>
				</div>
				<div className={styles.to__fro_group}>
					<Input
						label="Departure Date"
						id="departure-date"
						name="departureDate"
						type="date"
						placeholder="Select Date"
					/>
					<Input
						label="Return Date"
						id="going-to"
						name="returnDate"
						type="date"
						placeholder="Select Date"
					/>
				</div>
				<Link
					className="primary_btn"
					href={"/dashboard/travel/flights/search"}
				>
					<AirplaneIcon />
          Search Flights
				</Link>
			</div>
		</div>
	)
}

export default FlightPageHeader
