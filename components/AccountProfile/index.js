"use client";
import styles from "./account-profile.module.css";
// import { ProfileEditIcon } from '@/constants/icons'
import { getCredentials } from "@/services/localService";
import ProfileImage from "@/assets/images/dashboard/avatar.svg";
import Image from "next/image";
import ModalWrapper from "../Modal/ModalWrapper";
import { useEffect, useState } from "react";
import Input from "../Dashboard/Input";
import formStyles from "@/assets/styles/auth-screens.module.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNotify } from "@/utils/hooks";
import CustomSelect from "../Custom/Select";
import { businessIndustries, businessTypes, CS } from "@/utils/CONSTANTS";
// eslint-disable-next-line no-unused-vars
import CountrySelect from "../Custom/CountrySelect";

const AccountProfile = () => {
	const [savedCredentials, setSavedCredentials] = useState({});
	const [personalInfoEdit, setPersonalInfoEdit] = useState(false);
	const [businessInfoEdit, setBusinessInfoEdit] = useState(false);
	const [addressInfoEdit, setAddressInfoEdit] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [ctaClicked, setCtaClicked] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [states, setStates] = useState([]);
	// const [allFieldsValid, setAllFieldsValid] = useState(false)
	// eslint-disable-next-line no-unused-vars
	const [lgas, setLgas] = useState([]);
	const [payload, setPayload] = useState({});

	// eslint-disable-next-line no-unused-vars
	const notify = useNotify();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPayload((prevState) => ({
			...prevState,
			[name]: value,
		}));
		const resetState =
      name === "country" && value.name.common !== payload.country?.name?.common;
		const resetLga = name === "state" && value !== payload.state;
		if (resetState) {
			setPayload((prevState) => ({
				...prevState,
				state: "",
			}));
		}

		if (resetState || resetLga) {
			setPayload((prevState) => ({
				...prevState,
				lga: "",
			}));
		}
	};

	useEffect(() => {
		setSavedCredentials(getCredentials());
		setPayload(getCredentials());
	}, []);

	useEffect(() => {
		setStates(CS.getStatesByShort(payload?.country?.cca2)); // cca2: country's shortname
	}, [payload.country?.name?.common]);

	useEffect(() => {
		const cities = CS.getCities(payload?.country?.cca2, payload.state) || [];
		if (cities.length) {
			setLgas(cities);
		} else {
			setLgas([payload.state]);
		}
	}, [payload.state]);

	// const BusinessProfileCard = () => (
	// 	<div className={styles.profile_card}>
	// 		<div className={styles.top}>
	// 			<h3>Business Profile is ready!</h3>
	// 		</div>
	// 		<div className={styles.business_profile_content}>{/* <Input /> */}</div>
	// 	</div>
	// );

	const PersonalInfo = () => (
		<>
			{personalInfoEdit && (
				<ModalWrapper
					onClose={() => setPersonalInfoEdit(false)}
					heading="Edit Personal Information"
					subHeading="Kindly update your personal information"
					ctaBtnText="Update"
				>
					<form className={formStyles.form}>
						<div className={formStyles.form_row}>
							<Input
								label="Last Name"
								id="lastName"
								placeholder="Last Name"
								value={payload.lastName}
								onChange={handleChange}
							/>
							<Input
								label="First Name"
								id="firstName"
								placeholder="First Name"
								value={payload.firstName}
								onChange={handleChange}
							/>
						</div>
						<Input
							id="phone"
							label="Phone Number"
							error={ctaClicked && !payload.phoneNumber}
							errorMsg={!payload.phoneNumber && "Phone is required"}
						>
							<PhoneInput
								disabled
								country={"ng"}
								value={payload.phoneNumber}
								onChange={(phone) =>
									handleChange({ target: { name: "phone", value: phone } })
								}
							/>
						</Input>
					</form>
				</ModalWrapper>
			)}
			<div className={styles.profile_card}>
				<div className={styles.top}>
					<h3>Personal Information</h3>
					{/* <button onClick={()=>setPersonalInfoEdit(true)}>
						<ProfileEditIcon />
					</button> */}
				</div>
				<div className={styles.content}>
					<div className={styles.info}>
						<div className={styles.heading}>First Name</div>
						<div className={styles.value}>
							{savedCredentials.firstName || "-"}
						</div>
					</div>
					<div className={styles.info}>
						<div className={styles.heading}>Last Name</div>
						<div className={styles.value}>
							{savedCredentials.lastName || "-"}
						</div>
					</div>
					<div className={styles.info}>
						<div className={styles.heading}>Phone Number</div>
						<div className={styles.value}>
							{savedCredentials.phoneNumber || "-"}
						</div>
					</div>
				</div>
			</div>
		</>
	);

	const BusinessInfo = () => (
		<>
			{businessInfoEdit && (
				<ModalWrapper
					onClose={() => setBusinessInfoEdit(false)}
					heading="Edit Business Information"
					subHeading="Kindly update your business information"
					ctaBtnText="Update"
				>
					<form className={formStyles.form}>
						<Input
							label="Business Name"
							id="businessName"
							name="businessName"
							placeholder="Business Name"
							value={payload.businessName}
							onChange={handleChange}
						/>
						<Input
							label="Business Email Address"
							id="email"
							disabled
							type="email"
							name="email"
							placeholder="Business Email Address"
							value={payload.email}
							onChange={handleChange}
						/>
						{savedCredentials.userType === "2" && (
							<>
								<Input
									id="business-type"
									label="Business Type"
									error={ctaClicked && !payload.businessType}
									errorMsg="Business Type is required"
								>
									<CustomSelect
										id="business-type"
										disabled
										selectOptions={businessTypes}
										selectedOption={payload.businessType}
										fieldError={ctaClicked && !payload.businessType}
										emitSelect={(option) =>
											handleChange({
												target: { name: "businessType", value: option },
											})
										}
									/>
								</Input>
								<Input
									id="business-industry"
									label="Business Industry"
									error={ctaClicked && !payload.businessIndustry}
									errorMsg="Business Industry is required"
								>
									<CustomSelect
										id="business-type"
										disabled
										selectOptions={businessIndustries}
										selectedOption={payload.businessIndustry}
										fieldError={ctaClicked && !payload.businessIndustry}
										emitSelect={(option) =>
											handleChange({
												target: { name: "businessIndustry", value: option },
											})
										}
									/>
								</Input>
								<Input
									label="Business Identification Number"
									id="rcNumber"
									name="rcNumber"
									disabled
									placeholder="Business Identification Number"
									value={payload.rcNumber}
									onChange={handleChange}
								/>
							</>
						)}
					</form>
				</ModalWrapper>
			)}
			<div className={styles.profile_card}>
				<div className={styles.top}>
					<h3>Business Information</h3>
					{/* <button onClick={()=>setBusinessInfoEdit(true)}>
						<ProfileEditIcon />
					</button> */}
				</div>

				<div className={styles.inner}>
					<Image
						className={styles.avatar}
						src={savedCredentials.profileImg || ProfileImage}
						alt="avatar"
					/>
					<div className={styles.content}>
						<div className={styles.info}>
							<div className={styles.heading}>Business Name</div>
							<div className={styles.value}>
								{savedCredentials.businessName || "-"}
							</div>
						</div>
						<div className={styles.info}>
							<div className={styles.heading}>Business Type</div>
							<div className={styles.value}>
								{savedCredentials.businessType || "-"}
							</div>
						</div>
						<div className={styles.info}>
							<div className={styles.heading}>
                Business Identification Number
							</div>
							<div className={styles.value}>
								{savedCredentials.rcNumber || "-"}
							</div>
						</div>
						<div className={styles.info}>
							<div className={styles.heading}>Email Address</div>
							<div className={styles.value}>
								{savedCredentials.email || "-"}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);

	const AddressInfo = () => (
		<>
			{addressInfoEdit && (
				<ModalWrapper
					onClose={() => setAddressInfoEdit(false)}
					heading="Edit Address Information"
					subHeading="Kindly update your address information"
					ctaBtnText="Update"
				>
					<form className={formStyles.form}>
						<div className={styles.inner}>
							{/* <Input
							id="country"
							label="Country"
							error={ctaClicked && !payload.country?.name?.common}
							errorMsg="Country is required"
						>
							<CountrySelect
								fieldError={ctaClicked && !payload.country?.name?.common}
								emitCountry={(option) =>
									handleChange({
										target: { name: 'country', value: option },
									})}
							/>
						</Input> */}
							{/* <Input
							id="state"
							label="Select state"
							error={ctaClicked && !payload.state}
							errorMsg="State is required"
						>
							<CustomSelect
								disabled={!payload.country?.name?.common}
								fieldError={ctaClicked && !payload.state}
								selectOptions={states}
								selectedOption={payload.state}
								emitSelect={(e) => handleChange({
									target: { name: 'state', value: e },
								})}
							/>
						</Input> */}
							{/* <Input
							id="lga"
							label="Select Local Govt."
							error={ctaClicked && payload.state && (lgas?.length && !payload.lga)}
							errorMsg="lga is required"
						>
							<CustomSelect
								disabled={!payload.state}
								fieldError={ctaClicked && payload.state && (lgas?.length && !payload.lga)}
								selectOptions={lgas}
								selectedOption={payload.lga}
								emitSelect={(e) => handleChange({
									target: { name: 'lga', value: e },
								})}
							/>
						</Input> */}
							<Input
								label="Street No."
								id="street-no"
								name="streetNo"
								placeholder="91, Lagos road"
								value={payload.address}
								onChange={handleChange}
								error={ctaClicked && !payload.streetNo}
								errorMsg="Street No. is required"
							/>
						</div>
					</form>
				</ModalWrapper>
			)}
			<div className={styles.profile_card}>
				<div className={styles.top}>
					<h3>Address Information</h3>
					{/* <button onClick={()=>setAddressInfoEdit(true)}>
						<ProfileEditIcon />
					</button> */}
				</div>
				<div className={styles.content}>
					<div className={styles.info}>
						<div className={styles.heading}>Business Address</div>
						<div className={styles.value}>
							{savedCredentials.address || "-"}
						</div>
					</div>
				</div>
			</div>
		</>
	);

	return (
		<div className={styles.profile_ctn}>
			{/* {savedCredentials.hasPublicProfile ? BusinessProfileCard() : <></>} */}
			{PersonalInfo()}
			{BusinessInfo()}
			{AddressInfo()}
		</div>
	);
};

export default AccountProfile;
