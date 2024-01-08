import FlightPageHeader from "./FlightPageHeader"
import FlightTable from "../Tables/FlightTable"

const FlightPage = ({ styles }) => {



	return (
		<div className={`${styles.inner} flight-services`}>
			<FlightPageHeader styles={styles} />
			<FlightTable
				modalStyles={styles}
				title="flight"
			/>
		</div>
	)
}

export default FlightPage
