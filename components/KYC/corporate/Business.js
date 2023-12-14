"use client";
import Button from "@/components/Btn/Button";
import CustomSelect from "@/components/Custom/Select";
import Input from "@/components/Dashboard/Input";
import FullScreenLoader from "@/components/Modal/FullScreenLoader";
import {
	saveKycDetails,
	getKycDetails as getSavedKycDetails,
	getCredentials,
} from "@/services/localService";
import { kyc } from "@/services/restService";
import { useNotify } from "@/utils/hooks";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";

const Business = ({ styles }) => {
	const { push } = useRouter();
	const notify = useNotify();
	const savedKycDetails = getSavedKycDetails();
	const [savedCredentials, setSavedCredentials] = useState();
	const [submitType, setSubmitType] = useState("NEW");
	const [dataLoading, setDataLoading] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [ctaClicked, setCtaClicked] = useState(false);
	const [allFieldsValid, setAllFieldsValid] = useState(false);
	const [url, setUrl] = useState("");

	const getKycDetails = async () => {
		try {
			const response = await kyc.getKycDetails();
			const data = response.data.data;
			saveKycDetails(data);
			// console.log(data);
			const { websiteURL } = data.businessInfo;
			if (websiteURL) {
				setUrl(websiteURL);
				setSubmitType("EDIT");
			}
		} catch (_err) {
			// console.log(_err);
		} finally {
			setDataLoading(false);
		}
	};
	useEffect(() => {
		getKycDetails();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setCtaClicked(true);
		if (!allFieldsValid) {
			return;
		}
		setIsLoading(true);
		try {
			await kyc.uploadKycBusiness({
				url,
				submitType,
			});
			saveKycDetails({
				...savedKycDetails,
				KycStage: savedKycDetails?.KycStage > 1 ? savedKycDetails?.KycStage : 1,
			});
			notify("success", "Your information has been saved");
			push("/kyc/corporate/identity");
		} catch (_err) {
			const { message } = _err.response?.data || _err;
			notify("error", message);
			if (message?.toLowerCase().includes("already saved")) {
				push("/kyc/corporate/identity");
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (url) {
			setAllFieldsValid(true);
		} else {
			setAllFieldsValid(false);
		}
	}, [url]);

	useEffect(() => {
		setSavedCredentials(getCredentials());
	}, []);

	return (
		<>
			{dataLoading ? <FullScreenLoader /> : <></>}
			<div className={styles.inner}>
				<h2>Business Information</h2>
				<h4 className="sub-title media-max-1000">
          Please provide essential details about your business.
				</h4>
				<form onSubmit={handleSubmit}>
					<Input label="Business Name">
						<CustomSelect
							disabled
							selectedOption={savedCredentials?.businessName}
						/>
					</Input>
					<Input
						disabled
						label="Business Address"
						id="address"
						name="address"
						defaultValue={savedCredentials?.address}
					/>
					<Input
						disabled
						label="Business Email Address"
						id="email"
						name="email"
						defaultValue={savedCredentials?.email}
					/>
					<Input id="phone"
						label="Business Phone Number">
						<PhoneInput
							disabled
							country={"ng"}
							value={savedCredentials?.phoneNumber}
						/>
					</Input>
					<Input
						label="Business Website Address"
						id="url"
						name="url"
						value={url}
						error={ctaClicked && !url}
						errorMsg="Business website is required"
						onChange={(e) => setUrl(e.target.value)}
						placeholder="www.kelechitravels.com"
					/>
					<div className={styles.action_ctn}>
						<Button
							text="Save and continue"
							className="primary sd"
							loading={isLoading}
						/>
					</div>
				</form>
			</div>
		</>
	);
};

export default Business;
