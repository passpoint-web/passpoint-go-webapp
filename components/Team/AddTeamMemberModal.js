"use client"
import { useState } from "react"
import ModalWrapper from "../Modal/ModalWrapper"
import Loader from "../Btn/Loader"
// import PaymentSuccessful from "./PaymentSuccessful"
import flightStyles from '@/assets/styles/flight.module.css'
import { Stack } from "@chakra-ui/react"
import Input from "../Dashboard/Input"
import Select from "../Dashboard/Select"

const AddTeamMemberModal = ({ styles, closeModal }) => {
	// eslint-disable-next-line no-unused-vars
	// const [isLoading, setIsLoading] = useState(false)
	const [isUploading, setIsUploading] = useState(false)
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [role, setRole] = useState('')

	const handleCloseModal = () => {
		closeModal()
	}

	return (
		<ModalWrapper
			loading={false}
			onClose={() => handleCloseModal()}
			ctaBtnType="none"
			topClose={true}
			heading={"Add New Members"}
			subHeading={"Kindly provide the information to add members"}
			ctaBtnText="Modify"
			bottomCancelNeeded={false}
			containsTabLayout
			hasBottomActions={false}
		>
			<Stack padding={8}
				paddingTop={0}>

				<form action="">
					<div className="form-row">
						<Input
							label="First Name"
							placeholder="John"
							// value={passenger.first_name}
							onChange={(e) =>
								setFirstName(e.target.value)
							}
							name="name"
						/>
						<Input
							label="Last Name"
							placeholder="Smith"
							// value={passenger.last_name}
							onChange={(e) =>
								setLastName(e.target.value)
							}
							name="name"
						/>
					</div>
					<Input
						label="Email Address"
						placeholder="kelechi@travels.com"
						name="email"
						// value={passenger.email}
						onChange={(e) =>
							setEmail(e.target.value)
						}
					/>
					<Select
						label="Assign Role"
						id="class"
						styleProps={{
							dropdown: {
								height: 100,
							},
						}}
						selectOptions={["Co-Administrator", "Team Member", "Support Agent"]}
						selectedOption={role}
						emitSelect={(e) => setRole(e.target.value)}
						placeholder="Select a Role"
					/>
				</form>
			</Stack>
			<div className={`${flightStyles.modal__bottom_actions} ${flightStyles.modal__bottom_actions_no_red}`}>
				<button className="primary_btn"
					onClick={() => closeModal()}>
          Cancel
				</button>
				<button className="primary_btn"
					onClick={() => null}>
					{isUploading ? <Loader /> : "Proceed"}
				</button>
			</div>
		</ModalWrapper>
	)
}

export default AddTeamMemberModal
