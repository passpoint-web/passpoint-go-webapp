"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/restService";
import { getCredentials, saveCredentials } from "@/services/localService";
import styles from "@/assets/styles/auth-screens.module.css";
import PrimaryBtn from "@/components/Btn/Primary";
import PhoneInput from "react-phone-input-2";
import CheckBox from "@/components/Custom/Check";
// import BackBtn from '@/components/Btn/Back'
import Input from "@/components/Dashboard/Input";
import { useNotify } from "@/utils/hooks";

const BusinessPersonalInfo = () => {
	// eslint-disable-next-line no-unused-vars
	const { push } = useRouter();

	const [allFieldsValid, setAllFieldsValid] = useState(false);
	const [ctaClicked, setCtaClicked] = useState(false);
	const [termsAccepted, setTermsAccepted] = useState(false);
	const [roleConfirmed, setRoleConfirmed] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [payload, setPayload] = useState({
		lastName: "",
		firstName: "",
		phone: "",
	});
	const savedCredentials = getCredentials();

	const notify = useNotify();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPayload((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setCtaClicked(true);
		if (!allFieldsValid) {
			return;
		}
		setIsLoading(true);
		let {phone} = payload
		phone = phone.replace('+','')
		try {
			const response = await registerUser("onBoardUserPersonalInfo", {
				email: savedCredentials?.email,
				...payload, phone,
			});
			console.log(response);
			saveCredentials({ ...savedCredentials, ...payload, regStage: 3 });
			notify("success", "Your personal information has been saved");
			push("/auth/signup/business/verify");
		} catch (_err) {
			const { message } = _err.response?.data || _err;
			notify("error", message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const { firstName, lastName, phone } = payload;
		const conditionsMet =
      firstName && lastName && phone && termsAccepted && roleConfirmed;
		if (conditionsMet) {
			setAllFieldsValid(true);
		} else {
			setAllFieldsValid(false);
		}
	}, [payload, termsAccepted, roleConfirmed]);

	return (
		<div className={`${styles.auth} ${styles.no_pd_top}`}>
			<div className={styles.inner}>
				<div className={styles.center}>
					{/* <BackBtn onClick={() => back()} /> */}
					<h1 className="title">Personal Information</h1>
					<h4 className="sub-title media-max-700">
            Kindly provide personal information
					</h4>
					<form className={styles.form}
						onSubmit={handleSubmit}>
						<div className={styles.inner}>
							<div className={styles.form_row}>
								<Input
									label="Last Name"
									id="last-name"
									name="lastName"
									placeholder="Doe"
									value={payload.lastName}
									onChange={handleChange}
									error={ctaClicked && !payload.lastName}
									errorMsg="Last Name is required"
								/>
								<Input
									label="First Name"
									id="first-name"
									name="firstName"
									placeholder="Jon"
									value={payload.firstName}
									onChange={handleChange}
									error={ctaClicked && !payload.firstName}
									errorMsg="First Name is required"
								/>
							</div>
							<Input
								id="phone"
								label="Phone Number"
								error={ctaClicked && !payload.phone}
								errorMsg="Phone is required"
							>
								<PhoneInput
									country={"ng"}
									onlyCountries={['ng']}
									value={payload.phone}
									onChange={(phone) =>
										handleChange({ target: { name: "phone", value: phone } })
									}
								/>
							</Input>
							<div
								className={`${styles.terms} ${
									ctaClicked && !roleConfirmed ? styles.error : ""
								}`}
							>
								<CheckBox
									value={roleConfirmed}
									error={ctaClicked && !roleConfirmed}
									onChange={() => setRoleConfirmed(!roleConfirmed)}
								/>
								<p>
                  By clicking, you indicate your role as the owner or manager of
                  the business
								</p>
							</div>
							<div
								className={`${styles.terms} ${
									ctaClicked && !termsAccepted ? styles.error : ""
								}`}
							>
								<CheckBox
									value={termsAccepted}
									error={ctaClicked && !termsAccepted}
									onChange={() => setTermsAccepted(!termsAccepted)}
								/>
								<p>
                  By clicking, you accept our <a href="#">Terms of use</a> and{" "}
									<a href="#">Privacy Policy</a>
								</p>
							</div>
							<div className={styles.action_ctn}>
								<PrimaryBtn loading={isLoading}
									text="Save and Continue" />
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default BusinessPersonalInfo;
