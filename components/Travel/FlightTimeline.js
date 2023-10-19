"use client"

import styles from "../../assets/styles/flight.module.css"

const FlightTimeline = ({ direct = false }) => {
	return (
		<div className={`${styles.fc__timeline} ${[direct ? '' : styles.fc__timeline_with_stopover]}`}>
			<div className={styles.fc__col}>
				<h5>07:50PM</h5>
				<div>London (LHR)</div>
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
						<div>12h10m</div>
						{!direct && <div className={styles.circle} />}
						<div>{ direct ? 'Direct' : 'Madrid' }</div>
					</div>
					<div className={styles.fc__line}></div>
				</div>
				{/* TIMELINE STOP */}
				<div className={styles.fc__timeline_stop}>
					<div className={styles.circle} />
				</div>
			</div>
			<div className={styles.fc__col}>
				<h5>08:00AM</h5>
				<div>New York City (JFK)</div>
			</div>
		</div>
	)
}

export default FlightTimeline
