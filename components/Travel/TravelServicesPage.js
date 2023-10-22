
'use client'

import { BriefcaseIcon } from "@/constants/icons"
import Link from "next/link"
import { FaArrowRight } from "react-icons/fa"
// import Search from "../Custom/Search"
// import PrimaryLink from "../Link/Primary"
import MetricCard from "./MetricCard"
// import CustomSelect from '@/components/Custom/Select'
import CustomTable from "../Custom/Table"
// import { travel } from '@/services/restService'
// import { useEffect } from "react"

const TravelServicesPage = ({ styles }) => {

	const travelServices = [
		{
			name: 'Flights',
			link: 'flights',
			icon: '✈️',
			description: 'Book your flights here'
		},
		{
			name: 'Hotels',
			link: 'hotels',
			icon: '🏨',
			description: 'Book your hotels here'
		},
		{
			name: 'Airport Taxis',
			link: 'taxis',
			icon: '🚕',
			description: 'Book your airpot taxis here'
		},
		{
			name: 'Logistics',
			link: 'logitics',
			icon: '🚚',
			description: 'Book your logistics here'
		}
	]

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
					{travelServices.map((t, id) => (
						<Link key={id} href={`/dashboard/travel/${t.link}`}>
							<div>
								{t.icon}
								<h4>{t.name}</h4>
								<span>{t.description}</span>
							</div>
							<FaArrowRight />
						</Link>
					))}
				</div>
			</div>
			<MetricCard />
			<CustomTable action="/dashboard/travel/flights?id=AH12345678" />
		</div>
	)
}

export default TravelServicesPage
