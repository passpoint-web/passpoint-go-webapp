"use client"
import { useState } from "react"
import ModalWrapper from "../Modal/ModalWrapper"
import Loader from "../Btn/Loader"
// import PaymentSuccessful from "./PaymentSuccessful"
import Tab from "../Tab"
import flightStyles from '@/assets/styles/flight.module.css'
import { Button, Stack } from "@chakra-ui/react"

const TeamMemberModal = ({ styles, closeModal }) => {
	const tabs = ["Bio", "Permissions"]
	const [activeTab, setActiveTab] = useState(tabs[0])
	// eslint-disable-next-line no-unused-vars
	// const [isLoading, setIsLoading] = useState(false)
	const [isUploading, setIsUploading] = useState(false)
	const [permissions, setPermissions] = useState([
		'User Management: Create, edit, and delete user accounts.',
		'Dashboard Access: Full access to all dashboard features and settings.',
		'Financial Access: Access to financial data and billing information.',
		'Content Management: Create, edit, and manage content.',
		'Reporting: Access to detailed reports and analytics.',
		'Booking Management: Full control over booking and reservations.'
	])
	const [selectedPermissions, setSelectedPermissions] = useState([])

	const handleCloseModal = () => {
		closeModal()
	}

	const addPermissions = (permission) => {
		let tempPermissions = [...selectedPermissions]
		if (tempPermissions.includes(permission)) {
			tempPermissions = tempPermissions?.filter((a) => a !== permission)
		} else {
			tempPermissions.push(permission)
		}
		setSelectedPermissions(tempPermissions)
	}

	return (
		<ModalWrapper
			loading={false}
			onClose={() => handleCloseModal()}
			ctaBtnType="none"
			topClose={true}
			heading={"Profile"}
			subHeading={"See team profile and permissions here"}
			ctaBtnText="Modify"
			bottomCancelNeeded={false}
			containsTabLayout
			hasBottomActions={false}
		>
			<Tab tabs={tabs}
				setActiveTab={(val)=>setActiveTab(val)}
				activeTab={activeTab} />

			{activeTab === tabs[0] ? <div className={flightStyles.modal__flight_details}>
				{/* PROFILE BIO */}
				<div className={flightStyles.modal__flight_details_section}>
					<div className={flightStyles.row}>
						<div className={flightStyles.label}>Name</div>
						<div className={flightStyles.value}>
							<span className="text-bold">
								Harry Stevenson
							</span>
						</div>
					</div>
					<div className={flightStyles.row}>
						<div className={flightStyles.label}>Email Address</div>
						<div className={flightStyles.value}>
							<span className="text-bold">
								harrysteve@gmail.com
							</span>
						</div>
					</div>
					<div className={flightStyles.row}>
						<div className={flightStyles.label}>Role</div>
						<div className={flightStyles.value}>
							<span className=" text-bold">
								Co-Administrator
							</span>
						</div>
					</div>
					<div className={flightStyles.row}>
						<div className={flightStyles.label}>Status</div>
						<div className={flightStyles.value}>
							<span className="text-blue text-bold uppercase">
								<div className="success-tag">
                  Active
								</div>
							</span>
						</div>
					</div>
				</div>
			</div> : <div className={flightStyles.modal__flight_details}>
				{/* PROFILE PERMISSIONS */}
				<Stack gap={4}>
					{permissions?.map((permission) => (
						<label key={permission}
							className={styles.filter__input}>
							<input
								type="checkbox"
								name="filterAirlines"
								checked={selectedPermissions?.includes(permission)}
								value={permission}
								onChange={(e) => addPermissions(e.target.value)}
							/>
							{permission}
						</label>
					))}
				</Stack>
			</div>}

			<div className={`${flightStyles.modal__bottom_actions} ${flightStyles.modal__bottom_actions_no_red}`}>
				<button className="primary_btn"
					onClick={() => closeModal()}>
          Modify
				</button>
				<button className="primary_btn"
					onClick={() => null}>
					{isUploading ? <Loader /> : "Update"}
				</button>
			</div>
		</ModalWrapper>
	)
}

export default TeamMemberModal
