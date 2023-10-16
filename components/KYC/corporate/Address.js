"use client";
import BackBtn from "@/components/Btn/Back";
import PrimaryBtn from "@/components/Btn/Primary";
import CustomSelect from "@/components/Custom/Select";
import Input from "@/components/Dashboard/Input";
import FileUpload from "@/components/FileUpload";
import { kyc } from "@/services/restService";
import { documentType } from "@/utils/CONSTANTS";
import { useNotify } from "@/utils/hooks";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Address = ({ styles }) => {
	const { push } = useRouter();
	const notify = useNotify();
	const [ctaClicked, setCtaClicked] = useState(false);
	const [allFieldsValid, setAllFieldsValid] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [payload, setPayload] = useState({
		documentType: "",
		documentFile: "",
	});

	const handleChange = (name, value) => {
		setPayload((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(payload);
		setCtaClicked(true);
		if (!allFieldsValid) {
			return;
		}
		setIsLoading(true);
		try {
			const response = await kyc.uploadKycAddress({
				...payload,
			});
			console.log(response);
			notify("success", "Your Address has been saved");
			push("/dashboard/kyc/corporate/ownership");
		} catch (_err) {
			const { message } = _err.response?.data || _err;
			notify("error", message);
			if (message?.toLowerCase().includes("already uploaded")) {
				push("/dashboard/kyc/corporate/ownership");
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const conditionsMet = payload.documentType && payload.documentFile;
		if (conditionsMet) {
			setAllFieldsValid(true);
		} else {
			setAllFieldsValid(false);
		}
	}, [payload]);

	return (
		<div className={styles.inner} onSubmit={handleSubmit}>
			<h1>Proof of Address</h1>
			<form>
				<Input
					id="documentType"
					label="Select Document type"
					error={ctaClicked && !payload.documentType}
					errorMsg="Document is required"
				>
					<CustomSelect
						defaultValue="Choose the type of document you want to upload"
						id="documentType"
						selectOptions={documentType}
						selectedOption={payload.documentType}
						fieldError={ctaClicked && !payload.documentType}
						emitSelect={(option) => handleChange("documentType", option)}
					/>
				</Input>
				<div className={styles.innerUpload}>
					<FileUpload
						subTitle="Upload the document selected"
						base64={payload.documentFile}
						handlefileUpload={(file) => handleChange("documentFile", file)}
						error={ctaClicked && !payload.documentFile}
						errorMsg="Address is required"
					/>
				</div>
				<div className={styles.action_ctn}>
					<BackBtn
						type="button"
						text="Back"
						onClick={() => push("/dashboard/kyc/corporate/identity")}
					/>
					<PrimaryBtn
						type="submit"
						text="Save and continue"
						loading={isLoading}
					/>
				</div>
			</form>
		</div>
	);
};

export default Address;
