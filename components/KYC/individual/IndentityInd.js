"use client";
import PrimaryBtn from "@/components/Btn/Primary";
import CustomSelect from "@/components/Custom/Select";
import Input from "@/components/Dashboard/Input";
import FullScreenLoader from "@/components/Modal/FullScreenLoader";
import bvnStyles from "@/assets/styles/auth-screens.module.css";
import ModalWrapper from "@/components/Modal/ModalWrapper";
import {
	saveKycDetails,
	getKycDetails as getSavedKycDetails,
} from "@/services/localService";
import { kyc, kycBvn } from "@/services/restService";
import { indKycDocType } from "@/utils/CONSTANTS";
import { useNotify } from "@/utils/hooks";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import OTPInput from "react-otp-input";
import functions from "@/utils/functions";
import ResendBvnOtp from "@/components/Verify/ResendBvnOtp";

const IdentityInd = ({ styles }) => {
	const { push } = useRouter();
	const notify = useNotify();
	const savedKycDetails = getSavedKycDetails();
	const [submitType, setSubmitType] = useState("NEW");
	const [dataLoading, setDataLoading] = useState(true);
	const [ctaClicked, setCtaClicked] = useState(false);
	const [allFieldsValid, setAllFieldsValid] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [showVerifyBVNModal, setShowVerifyBVNModal] = useState(false);
	const [bvnVerifyData, setBvnVerifyData] = useState("");
	const [payload, setPayload] = useState({
		documentType: "",
		documentNumber: "",
	});

	const handleChange = (name, value) => {
		setPayload((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const getKycDetails = async () => {
		try {
			const response = await kyc.getKycDetails();
			const data = response.data.data;
			saveKycDetails(data);
			const documents = data.proofIdentity;
			if (documents) {
				setPayload({
					...payload,
					documentType: documents.identityDocumentType,
					documentNumber: documents.identityDocumentNumber,
				});
				setSubmitType("EDIT");
			} else {
				setSubmitType("NEW");
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

	const uploadIdentity = async () => {
		try {
			await kyc.uploadIndIdentity({
				...payload,
				submitType,
			});
			saveKycDetails({
				...savedKycDetails,
				KycStage: savedKycDetails?.KycStage > 1 ? savedKycDetails?.KycStage : 1,
			});
			notify("success", "Your identity has been saved");
			push("/kyc/individual/address");
		} catch (_err) {
			const { message } = _err.response?.data || _err;
			notify("error", message);
			if (message?.toLowerCase().includes("already saved")) {
				push("/kyc/individual/address");
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setCtaClicked(true);
		if (!allFieldsValid) {
			return;
		}
		setIsLoading(true);
		if (payload.documentType === "Bank Verification Number (BVN)") {
			const data = {
				id: payload.documentNumber,
				kycType: "1",
				otherInfo: {
					dob: "1997-05-16",
					verificationType: "1",
				},
			};
			try {
				const verifyResponse = await kycBvn.verifyBvn(data);
				if (verifyResponse.status === 200) {
					setBvnVerifyData(verifyResponse.data);
					notify("success", "OTP sent successfully");
					setShowVerifyBVNModal(true);
					setIsLoading(false);
				}
			} catch (verifyError) {
				const responseMessage =
          verifyError.response?.data?.responseMessage || verifyError.message;
				if (responseMessage === "bvn has already been verified") {
					notify("info", "BVN has already been verified. Continuing process.");
					await uploadIdentity(); // Call the uploadIdentity function directly
				} else {
					notify("error", responseMessage);
					setIsLoading(false);
					return;
				}
			}
		} else {
			// If the document type is not BVN, just call the upload identity process
			await uploadIdentity();
		}
	};

	useEffect(() => {
		const conditionsMet = payload.documentType && payload.documentNumber;
		if (conditionsMet) {
			setAllFieldsValid(true);
		} else {
			setAllFieldsValid(false);
		}
	}, [payload]);

	return (
		<>
			{dataLoading ? <FullScreenLoader /> : <></>}
			<div className={styles.inner}
				onSubmit={handleSubmit}>
				<h1>Proof of Identity</h1>
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
							selectOptions={indKycDocType}
							selectedOption={payload.documentType}
							fieldError={ctaClicked && !payload.documentType}
							emitSelect={(option) => handleChange("documentType", option)}
						/>
					</Input>
					<Input
						label="Document Number"
						id="documentNumber"
						name="documentNumber"
						placeholder="Enter your Document Number"
						error={ctaClicked && !payload.documentNumber}
						value={payload.documentNumber}
						onChange={(e) => handleChange("documentNumber", e.target.value)}
						errorMsg="Document number is required"
						info={
							payload.documentType === "Bank Verification Number (BVN)"
								? "To get your BVN, Dial *560# with your business phone number"
								: ""
						}
					/>
					<div className={styles.action_ctn}>
						{/* <BackBtn
            type="button"
            className="half sd"
            text="Back"
            onClick={() => push("/kyc/individual/contact")}
          /> */}
						<PrimaryBtn
							type="submit"
							text="Save and continue"
							loading={isLoading}
						/>
					</div>
				</form>
			</div>
			{showVerifyBVNModal && (
				<VerifyBVN
					submitType={submitType}
					payload={payload}
					savedKycDetails={savedKycDetails}
					bvnVerifyData={bvnVerifyData}
					setShowVerifyBVNModal={setShowVerifyBVNModal}
				/>
			)}
		</>
	);
};

export default IdentityInd;

const VerifyBVN = ({
	setShowVerifyBVNModal,
	bvnVerifyData,
	payload,
	savedKycDetails,
	submitType,
}) => {
	const { push } = useRouter();
	const notify = useNotify();
	const [otp, setOtp] = useState("");
	const { maskedPhoneNo } = functions;
	const bvnNo = payload.documentNumber;
	const [errorMsg, setErrorMsg] = useState("");
	const [ctaClicked, setCtaClicked] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setCtaClicked(true);
		if (otp.length !== 6) {
			setErrorMsg("Please enter a 6 digit OTP");
			return;
		}
		setIsLoading(true);
		try {
			// Perform OTP verification here
			const data = {
				otp,
				reference: bvnVerifyData.reference,
			};
			const otpVerifyResponse = await kycBvn.confirmBvn(data);
			if (otpVerifyResponse.status === 200) {
				// OTP verification is successful; proceed to upload KYC details
				await kyc.uploadIndIdentity({
					...payload,
					submitType,
				});
				saveKycDetails({
					...savedKycDetails,
					KycStage:
            savedKycDetails?.KycStage > 1 ? savedKycDetails?.KycStage : 1,
				});
				notify(
					"success",
					"Your BVN and identity have been successfully verified and saved."
				);
				push("/kyc/individual/address");
				setShowVerifyBVNModal(false);
			}
		} catch (otpError) {
			setErrorMsg(
				otpError.response?.data?.responseMessage ||
          "Invalid OTP, please try again"
			);
			setIsLoading(false);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ModalWrapper
			heading="Verify BVN"
			subHeading={`We sent an OTP ${maskedPhoneNo(
				bvnVerifyData.otherInfo
			)} please enter the code below.`}
			ctaBtnText="Verify"
			ctaBtnType="lg"
			loading={isLoading}
			topCancelNeeded={false}
			bottomCancelNeeded={false}
			onClose={() => setShowVerifyBVNModal(false)}
			handleCta={handleSubmit}
		>
			<form className={bvnStyles.form}>
				<div className={bvnStyles.inner}>
					<Input
						error={(ctaClicked && otp?.length !== 6) || errorMsg}
						errorMsg={otp?.length !== 6 ? "Valid OTP needed" : errorMsg}
						msgPositionCenter={true}
					>
						<div className={bvnStyles.otp_input}>
							<OTPInput
								value={otp}
								onChange={setOtp}
								numInputs={6}
								shouldAutoFocus={true}
								inputType="number"
								inputMode={null}
								renderSeparator={<span />}
								renderInput={(props) => <input {...props} />}
							/>
						</div>
					</Input>
					<div style={{ textAlign: "center" }}>
						<ResendBvnOtp bvnNo={bvnNo}
							clearOtp={() => setOtp("")} />
					</div>
				</div>
			</form>
		</ModalWrapper>
	);
};
