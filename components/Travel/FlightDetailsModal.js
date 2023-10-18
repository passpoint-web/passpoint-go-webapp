"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import ModalWrapper from "../Modal/ModalWrapper"

const FlightDetailsModal = ({ setFlightDetailVisible }) => {
	const path = usePathname()
	const router = useRouter()

	const closeModal = () => {
		setFlightDetailVisible(null)
		router.push(path.substring(path.indexOf('?')))
	}
	return (
		<ModalWrapper
			loading={false}
			onClose={()=> closeModal()}
			ctaBtnType='sd'
			heading={'Flight Details'}
			subHeading={'See all your booking details here'}
			ctaBtnText='Modify'
			bottomCancelNeeded={true}
			containsTabLayout
		>
			<h3>This is a modal</h3>
		</ModalWrapper>
	)
}

export default FlightDetailsModal
