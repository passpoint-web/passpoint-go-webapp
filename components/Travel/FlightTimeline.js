"use client"

import functions from "@/utils/functions"
import styles from "../../assets/styles/flight.module.css"

const FlightTimeline = ({ data, isOutbound }) => {
  const totalDuration = isOutbound
    ? data?.total_outbound_duration
    : data?.total_inbound_duration
  const flights = isOutbound ? data?.outbound : data?.inbound
  const directFlight = flights?.length === 1
  return (
    <div
      className={`${styles.fc__timeline} ${[
        directFlight ? "" : styles.fc__timeline_with_stopover,
      ]}`}
    >
      <div className={styles.fc__col}>
        <h5>{functions.formatCustomTime(flights?.at(-1)?.departure_time)}</h5>
        <div>
          {functions.getFormattedAirportByIata(flights?.at(0)?.airport_from)}
        </div>
      </div>
      <div className={styles.fc__timeline_range}>
        {/* TIMELINE STOP */}
        <div className={styles.fc__timeline_stop}>
          <div className={styles.circle} />
          <div className={styles.fc__line}></div>
        </div>
        {/* TIMELINE STOP - MIDDLE DIRECT FLIGHT */}
        {flights
          ?.slice(0, directFlight ? flights?.length : flights?.length - 1)
          .map((flight) => (
            <div key={flight.arrival_time} className={styles.fc__timeline_stop}>
              <div className={styles.circle__ctn}>
                <div>
                  {functions.convertMinutesToHHMM(flight?.duration)}
                  {/* {flight?.layover &&
                    `(${functions.convertMinutesToHHMM(flight?.layover)})`} */}
                </div>
                <div>{directFlight ? "Direct" : flight?.airport_to}</div>
              </div>
              {!directFlight && <div className={styles.circle} />}
              <div className={styles.fc__line}></div>
            </div>
          ))}
        {/* TIMELINE STOP */}
        <div className={styles.fc__timeline_stop}>
          <div className={styles.circle} />
        </div>
      </div>
      <div className={styles.fc__col}>
        <h5>{functions.formatCustomTime(flights?.at(-1)?.arrival_time)}</h5>
        <div>
          {functions.getFormattedAirportByIata(flights?.at(-1)?.airport_to)}
        </div>
      </div>
    </div>
  )
}

export default FlightTimeline
