"use client"

import styles from "../../assets/styles/flight.module.css"
import { FaChevronDown } from "react-icons/fa"
import FlightCard from "./FlightCard"
import Link from "next/link"
import { ProfileEditIcon } from "@/constants/icons"

const SelectFlight = () => {
	const flights = [1, 2, 3, 4, 5, 6]
	return (
		<div className={`select-flight-wrapper ${styles.row__wrapper}`}>
			<button className={styles.row__header}>
				<div className="texts">
					<h3 className="capitalize"> Select Flights (100)</h3>
					{/* <p>Manage your bookings here</p> */}
				</div>
				<FaChevronDown />
			</button>
			<div className={styles.fs__row}>
				<div className={styles.lhs}>
					{/* CATEGORY FILTER */}
					<div className={styles.filter__box}>
						<button className={styles.header}>
							<h5 className="capitalize">Category</h5>
							<FaChevronDown />
						</button>
						<div className={styles.content}>
							<label className={styles.filter__input}>
								<input type="checkbox" name="category" />
                Best
							</label>
							<label className={styles.filter__input}>
								<input type="checkbox" name="category" />
                Cheapest
							</label>
							<label className={styles.filter__input}>
								<input type="checkbox" name="category" />
                Quickest
							</label>
							<label className={styles.filter__input}>
								<input type="checkbox" name="category" />
                Slowest
							</label>
						</div>
					</div>
					{/* PRICE FILTER */}
					<div className={styles.filter__box}>
						<button className={styles.header}>
							<h5 className="capitalize">Price</h5>
							<FaChevronDown />
						</button>
						<div className={styles.content}>
							<label className={`${styles.filter__input} ${styles.range__input}`}>
								<div className={styles.range__ctn}>
									<input type="range" name="" id="" />
								</div>
								<div className={styles.filter__input_col_two}>
									<div>
                    ₦ 400,000
									</div>
									<div>
                    ₦ 1,000,000
									</div>
								</div>
							</label>
						</div>
					</div>
					{/* STOPS FILTER */}
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
								<input type="checkbox" name="stops" />
                1 stop
							</label>
							<label className={styles.filter__input}>
								<input type="checkbox" name="stops" />
                2+ stops
							</label>
						</div>
					</div>
					{/* TIME FILTER */}
					<div className={styles.filter__box}>
						<button className={styles.header}>
							<h5 className="capitalize">Time</h5>
							<FaChevronDown />
						</button>
						<div className={styles.content}>
							<label className={`${styles.filter__input} ${styles.range__input}`}>
								<div className={styles.filter__input_col_one}>
                  Take-off <span>New York (JFK)</span>
								</div>
								<div className={styles.range__ctn}>
									<input type="range" name="" id="" />
								</div>
								<div className={styles.filter__input_col_two}>
									<div>
                    Thu 12:00AM
									</div>
									<div>
                    12:00AM
									</div>
								</div>
							</label>
							<label className={`${styles.filter__input} ${styles.range__input}`}>
								<div className={styles.filter__input_col_one}>
                  Take-off <span>New York (JFK)</span>
								</div>
								<div className={styles.range__ctn}>
									<input type="range" name="" id="" />
								</div>
								<div className={styles.filter__input_col_two}>
									<div>
                    Thu 12:00AM
									</div>
									<div>
                    12:00AM
									</div>
								</div>
							</label>
							<label className={`${styles.filter__input} ${styles.range__input}`}>
								<div className={styles.filter__input_col_one}>
                  Take-off <span>New York (JFK)</span>
								</div>
								<div className={styles.range__ctn}>
									<input type="range" name="" id="" />
								</div>
								<div className={styles.filter__input_col_two}>
									<div>
                    Thu 12:00AM
									</div>
									<div>
                    12:00AM
									</div>
								</div>
							</label>
							<label className={`${styles.filter__input} ${styles.range__input}`}>
								<div className={styles.filter__input_col_one}>
                  Take-off <span>New York (JFK)</span>
								</div>
								<div className={styles.range__ctn}>
									<input type="range" name="" id="" />
								</div>
								<div className={styles.filter__input_col_two}>
									<div>
                    Thu 12:00AM
									</div>
									<div>
                    12:00AM
									</div>
								</div>
							</label>
						</div>
					</div>
					{/* AIRLINE FILTER */}
					<div className={styles.filter__box}>
						<button className={styles.header}>
							<h5 className="capitalize">Airlines</h5>
							<FaChevronDown />
						</button>
						<div className={styles.content}>
							<label className={styles.filter__input}>
								<input type="checkbox" name="airline" />
                Iberia
							</label>
							<label className={styles.filter__input}>
								<input type="checkbox" name="airline" />
                Air Canada
							</label>
							<label className={styles.filter__input}>
								<input type="checkbox" name="airline" />
                American Airlines
							</label>
							<label className={styles.filter__input}>
								<input type="checkbox" name="airline" />
                British Airways
							</label>
						</div>
					</div>
					{/* LAYOVER FILTER */}
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
				</div>
				<div className={styles.rhs}>
					{flights.map(flight => <FlightCard key={flight} />)}
				</div>
			</div>
		</div>
	)
}

export default SelectFlight
