"use client"
import { useState } from "react"
import ModalWrapper from "../Modal/ModalWrapper"
import Loader from "../Btn/Loader"
// import PaymentSuccessful from "./PaymentSuccessful"
import flightStyles from '@/assets/styles/flight.module.css'
import { Stack } from "@chakra-ui/react"
import Input from "../Dashboard/Input"
import Textarea from "../Dashboard/Textarea"

const AddNewRoleModal = ({ styles, closeModal }) => {
	// eslint-disable-next-line no-unused-vars
	// const [isLoading, setIsLoading] = useState(false)
	const [isUploading, setIsUploading] = useState(false)
	const [role, setRole] = useState('')
	const [roleDescription, setRoleDescription] = useState('')
	const [permissions, setPermissions] = useState([
		'User Management: Create, edit, and delete user accounts.',
		'Dashboard Access: Full access to all dashboard features and settings.',
		'Financial Access: Access to financial data and billing information.',
		'Content Management: Create, edit, and manage content.',
		'Reporting: Access to detailed reports and analytics.',
		'Booking Management: Full control over booking and reservations.'
	])
	const [selectedPermissions, setSelectedPermissions] = useState([])
	const [formStep, setFormStep] = useState(1)

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
			heading={formStep === 1 ? "Add New Members" : "Choose Permissions"}
			subHeading={formStep === 1 ? "Kindly provide the information to add members" : "Kindly select permission for this role"}
			ctaBtnText="Modify"
			bottomCancelNeeded={false}
			containsTabLayout
			hasBottomActions={false}
		>
			<Stack padding={8}
				paddingTop={0}>

				{formStep === 1 && <form action="">
					<Input
						label="Role"
						placeholder="Enter role title"
						name="role"
						value={role}
						onChange={(e) =>
							setRole(e.target.value)
						}
					/>
					<Textarea
						label="Describe the role"
						placeholder="Tell us a little about this role"
						name="role"
						rows="10"
						value={roleDescription}
						style={{ height: '330px' }}
						onChange={(e) =>
							setRoleDescription(e.target.value)
						} />
				</form>}

				{formStep === 2 && <form action="">
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
				</form>}
			</Stack>
			<div className={`${flightStyles.modal__bottom_actions} ${flightStyles.modal__bottom_actions_no_red}`}>
				<button className="primary_btn"
					onClick={() => {formStep === 1 ? closeModal() : setFormStep(1)}}>
					{formStep === 1 ? 'Cancel' : 'Go back'}
				</button>
				<button className="primary_btn"
					onClick={() => (formStep === 1 ? setFormStep(2) : null)}>
					{isUploading ? <Loader /> : "Proceed"}
				</button>
			</div>
		</ModalWrapper>
	)
}

export default AddNewRoleModal
