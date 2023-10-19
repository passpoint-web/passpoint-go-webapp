
'use client'

import { BriefcaseIcon } from "@/constants/icons"
import Link from "next/link"
import { FaArrowRight } from "react-icons/fa"
import Search from "../Custom/Search"
import PrimaryLink from "../Link/Primary"
import MetricCard from "./MetricCard"
import CustomSelect from '@/components/Custom/Select'
import CustomTable from "../Custom/Table"

const TravelServicesPage = ({ styles }) => {
	return (
		<div className={`${styles.inner} travel-services`}>
			<div className={styles.travel__dashboard_header}>
				<div className={styles.row_one}>
					<div>
						<h3>Travel Services</h3>
						<p>Kindly select your preferred service</p>
					</div>
					<Link className="primary_btn" href="/dashboard/travel/manage">
						<BriefcaseIcon />
            Manage Services
					</Link>
				</div>
				<div className={styles.row_two}>
					<Link href="/dashboard/travel/flights">
						<div>
              ✈️
							<h4>Flights</h4>
							<span>Book your flights here</span>
						</div>
						<FaArrowRight />
					</Link>
					<Link href="/dashboard/travel/hotels">
						<div>
              🏨
							<h4>Hotels</h4>
							<span>Book your hotels here</span>
						</div>
						<FaArrowRight />
					</Link>
					<Link href="/dashboard/travel/taxis">
						<div>
              🚕
							<h4>Airport Taxis</h4>
							<span>Book your airport taxis here</span>
						</div>
						<FaArrowRight />
					</Link>
					<Link href="/dashboard/travel/logistics">
						<div>
              🚚
							<h4>Logistics</h4>
							<span>Book your logistics here</span>
						</div>
						<FaArrowRight />
					</Link>
				</div>
			</div>
			<MetricCard />
			<CustomTable action="/dashboard/travel/flights/AH12345678" />
		</div>
	)
}

export default TravelServicesPage
