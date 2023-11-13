"use client";
import styles from "@/assets/styles/auth-screens.module.css";
import PrimaryBtn from "@/components/Btn/Primary";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/restService";
import { CS } from "@/utils/CONSTANTS";
import { getCredentials, saveCredentials } from "@/services/localService";
import CountrySelect from "@/components/Custom/CountrySelect";
// import BackBtn from '@/components/Btn/Back'
import Input from "@/components/Dashboard/Input";
import { useNotify } from "@/utils/hooks";
import SearchSelect from "@/components/Dashboard/SearchSelect";

const BusinessAddress = () => {
	// eslint-disable-next-line no-unused-vars
	const { push, back } = useRouter();
	const [states, setStates] = useState([]);
	const [allFieldsValid, setAllFieldsValid] = useState(false);
	const [ctaClicked, setCtaClicked] = useState(false);
	const [lgas, setLgas] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [payload, setPayload] = useState({
		country: "",
		state: "",
		lga: "",
		streetNo: "",
	});

	const savedCredentials = getCredentials();

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
	// onBoardIndividualBusinessAddress
	const handleSubmit = async (e) => {
		e.preventDefault();
		setCtaClicked(true);
		if (!allFieldsValid) {
			return;
		}
		setIsLoading(true);
		try {
			const { lga, state, country, streetNo } = payload;
			let body = {
				email: savedCredentials.email,
				country: country.name.common,
				lga,
				state,
				address: streetNo,
			};
			const response = await registerUser("onBoardUserBusinessAddress", body);
			console.log(response);
			// setSignupLevel({'business', 2})
			saveCredentials({ ...savedCredentials, ...body, regStage: 3 });
			notify("success", "Your business address has been saved");
			push("/auth/signup/individual/verify");
		} catch (_err) {
			const { message } = _err.response?.data || _err;
			notify("error", message);
		} finally {
			setIsLoading(false);
		}
	};

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

	useEffect(() => {
		const { country, state, lga, streetNo } = payload;
		const lgaNeeded = lgas?.length ? lga : false;
		if (country?.name?.common && state && lgaNeeded && streetNo) {
			setAllFieldsValid(true);
		} else {
			setAllFieldsValid(false);
		}
	}, [payload]);

	return (
		<div className={`${styles.auth} ${styles.no_pd_top}`}>
			<div className={styles.inner}>
				<div className={styles.center}>
					{/* <BackBtn onClick={() => back()} /> */}
					<h1 className="title">Add address 🏠</h1>
					<h4 className="sub-title media-max-700">
            Kindly provide personal information
					</h4>
					<form className={styles.form}
						onSubmit={handleSubmit}>
						<div className={styles.inner}>
							<Input
								id="country"
								label="Country"
								error={ctaClicked && !payload.country?.name?.common}
								errorMsg="Country is required"
							>
								<CountrySelect
									disabled
									fieldError={ctaClicked && !payload.country?.name?.common}
									emitCountry={(option) =>
										handleChange({
											target: { name: "country", value: option },
										})
									}
								/>
							</Input>
							{/* <Select 
								id="state"
								label="Select state"
								error={ctaClicked && !payload.state}
								errorMsg="State is required"
								selectDisabled={!payload.country?.name?.common}
								fieldError={ctaClicked && !payload.state}
								selectOptions={states}
								selectedOption={payload.state}
								emitSelect={(e) =>
									handleChange({
										target: { name: "state", value: e },
									})
									}
							/> */}
							<SearchSelect 
								id="state"
								label="Select state"
								error={ctaClicked && !payload.state}
								errorMsg="State is required"
								selectDisabled={!payload.country?.name?.common}
								fieldError={ctaClicked && !payload.state}
								selectOptions={states}
								selectedOption={payload.state}
								emitSelect={(e) =>
									handleChange({
										target: { name: "state", value: e },
									})
									}
							/>
							<SearchSelect 
							id="lga"
							label="Select Local Govt."
							error={
								ctaClicked && payload.state && lgas?.length && !payload.lga
							}
							errorMsg="lga is required"
								selectDisabled={!payload.state}
								fieldError={
									ctaClicked && payload.state && lgas?.length && !payload.lga
								}
								selectOptions={lgas}
								selectedOption={payload.lga}
								emitSelect={(e) =>
									handleChange({
										target: { name: "lga", value: e },
									})
								}/>
							<Input
								label="Street No."
								id="street-no"
								name="streetNo"
								placeholder="91, Lagos road"
								value={payload.streetNo}
								onChange={handleChange}
								error={ctaClicked && !payload.streetNo}
								errorMsg="Street No. is required"
							/>
						</div>
						<div className={styles.action_ctn}>
							<PrimaryBtn text={"Save and continue"}
								loading={isLoading} />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default BusinessAddress;
