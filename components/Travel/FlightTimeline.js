"use client"

import functions from "@/utils/functions"
import styles from "../../assets/styles/flight.module.css"

const FlightTimeline = ({ data }) => {
  const directFlight = data?.length === 1
  return (
    <div
      className={`${styles.fc__timeline} ${[
        directFlight ? "" : styles.fc__timeline_with_stopover,
      ]}`}
    >
      <div className={styles.fc__col}>
        <h5>{functions.formatCustomTime(data?.at(-1)?.departure_time)}</h5>
        <div>
          {functions.getFormattedAirportByIata(data?.at(0)?.airport_from)}
        </div>
      </div>
      <div className={styles.fc__timeline_range}>
        {/* TIMELINE STOP */}
        <div className={styles.fc__timeline_stop}>
          <div className={styles.circle} />
          <div className={styles.fc__line}></div>
        </div>
        {/* TIMELINE STOP */}
        <div className={styles.fc__timeline_stop}>
          <div className={styles.circle__ctn}>
            <div>{functions.convertMinutesToHHMM(data?.at(0)?.duration)}</div>
            {!directFlight && <div className={styles.circle} />}
            <div>{directFlight ? "Direct" : "Madrid"}</div>
          </div>
          <div className={styles.fc__line}></div>
        </div>
        {/* TIMELINE STOP */}
        <div className={styles.fc__timeline_stop}>
          <div className={styles.circle} />
        </div>
      </div>
      <div className={styles.fc__col}>
        <h5>{functions.formatCustomTime(data?.at(-1)?.arrival_time)}</h5>
        <div>
          {functions.getFormattedAirportByIata(data?.at(-1)?.airport_to)}
        </div>
      </div>
    </div>
  )
}

export default FlightTimeline
