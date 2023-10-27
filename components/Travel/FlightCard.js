"use client"

import {
  setMostRecentFlightSearchURL,
  setSelectedFlight,
} from "@/services/localService"
import functions from "@/utils/functions"
import Link from "next/link"
import styles from "../../assets/styles/flight.module.css"
import FlightTimeline from "./FlightTimeline"

const FlightCard = ({ selected, data }) => {
  const outbound = data?.outbound
  const inbound = data?.inbound

  const selectFlight = (data) => {
    setSelectedFlight(data)
    setMostRecentFlightSearchURL(`${location.pathname}${location.search}`)
  }

  return (
    <div className={`${styles.flight__card} come-up-sm`}>
      {/* ROW ONE - FOR OUTBOUND */}
      <div className={styles.fc__row_one}>
        <div className={styles.fc__airline}>
          <div
            style={{
              backgroundImage: `url(${outbound?.at(0)?.airline_details?.logo})`,
            }}
          ></div>
          <h6>{outbound?.[0]?.airline_details?.name}</h6>
        </div>
        <FlightTimeline data={outbound} />
        <div className={styles.fc__price}>
          {!selected && (
            <div className={styles.fc__tags}>
              <div className="primary-tag">Best</div>
              <div className="success-tag">Cheapest</div>
            </div>
          )}
          <h4>{functions.formatMoney(data?.amount, data?.currency)}</h4>
        </div>
      </div>

      {/* ROW TWO - FOR INBOUND */}
      <div className={styles.fc__row_two}>
        {inbound?.length > 0 ? (
          <div className={styles.fc__airline}>
            <div
              style={{
                backgroundImage: `url(${inbound?.[0]?.airline_details?.logo})`,
              }}
            ></div>
            <h6>{inbound?.[0]?.airline_details?.name}</h6>
          </div>
        ) : (
          <div />
        )}
        {inbound?.length > 0 ? <FlightTimeline data={inbound} /> : <div />}
        <Link
          href={`/dashboard/travel/flights/pay/${data?.id}`}
          className="primary_btn"
          style={{ visibility: selected ? "hidden" : "visible" }}
          onClick={() => selectFlight(data)}
        >
          Book Now
        </Link>
      </div>
    </div>
  )
}

export default FlightCard
