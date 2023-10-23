"use client"

import functions from "@/utils/functions"
import Link from "next/link"
import styles from "../../assets/styles/flight.module.css"
import FlightTimeline from "./FlightTimeline"

const FlightCard = ({ selected, data }) => {
  return (
    <div className={`${styles.flight__card}`}>
      {/* ROW ONE */}
      <div className={styles.fc__row_one}>
        <div className={styles.fc__airline}>
          <div></div>
          <h6>Iberia</h6>
        </div>
        <FlightTimeline direct />
        <div className={styles.fc__price}>
          {!selected && (
            <div className={styles.fc__tags}>
              <div className="primary-tag">Best</div>
              <div className="success-tag">Cheapest</div>
            </div>
          )}
          <h4>{functions.formatMoney(data?.amount, "NGN")}</h4>
        </div>
      </div>

      {/* ROW TWO */}
      <div className={styles.fc__row_two}>
        <div className={styles.fc__airline}>
          <div></div>
          <h6>Iberia</h6>
        </div>
        <FlightTimeline />
        <Link
          href="/dashboard/travel/flights/pay"
          className="primary_btn"
          style={{ visibility: selected ? "hidden" : "visible" }}
        >
          Book Now
        </Link>
      </div>
    </div>
  )
}

export default FlightCard
