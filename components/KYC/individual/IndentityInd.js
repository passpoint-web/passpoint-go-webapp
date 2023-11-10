"use client";
import BackBtn from "@/components/Btn/Back";
import PrimaryBtn from "@/components/Btn/Primary";
import CustomSelect from "@/components/Custom/Select";
import Input from "@/components/Dashboard/Input";
import FullScreenLoader from "@/components/Modal/FullScreenLoader";
import bvnStyles from "@/assets/styles/auth-screens.module.css";
import ModalWrapper from "@/components/Modal/ModalWrapper";
import ResendOTP from "@/components/Verify/ResendOTP";
import {
  saveKycDetails,
  getKycDetails as getSavedKycDetails,
} from "@/services/localService";
import { kyc } from "@/services/restService";
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
  const [number, setNumber] = useState("");
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

  const verifyBVN = async () => {
    try {
      const res = await kyc.verifyBvn({ bvn: payload.documentNumber });
      setNumber(res.data.data.phoneNumber);
      notify("success", "OTP sent successfully");
    } catch (_err) {
      console.log(_err);
      notify("error", message);
    } finally {
    }
  };

  const getKycDetails = async () => {
    try {
      const response = await kyc.getKycDetails();
      const data = response.data.data;
      saveKycDetails(data);
      console.log(data);
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
      console.log(_err);
    } finally {
      setDataLoading(false);
    }
  };
  useEffect(() => {
    getKycDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(payload);
    setCtaClicked(true);
    if (!allFieldsValid) {
      return;
    }
    setIsLoading(true);

    // Check if the document type is BVN and proceed with verification
    if (payload.documentType === "Bank Verification Number (BVN)") {
      try {
        const verifyResponse = await kyc.verifyBvn({
          bvn: payload.documentNumber,
        });

        // If verification is successful, set the number for OTP and show the modal
        if (verifyResponse.status === 200) {
          setNumber(verifyResponse.data.data.phoneNumber);
          notify("success", "OTP sent successfully");
          setShowVerifyBVNModal(true);
          setIsLoading(false);
          return;
        }
      } catch (verifyError) {
        const { message } = verifyError.response?.data || verifyError;
        notify("error", message);
        setIsLoading(false); // Stop loading on error as well
        return; // Exit if there's an error
      }
    }

    try {
      const response = await kyc.uploadIndIdentity({
        ...payload,
        submitType,
      });
      saveKycDetails({
        ...savedKycDetails,
        KycStage: savedKycDetails.KycStage > 1 ? savedKycDetails.KycStage : 1,
      });
      notify("success", "Your identity has been saved");
      push("/dashboard/kyc/individual/address");
    } catch (_err) {
      const { message } = _err.response?.data || _err;
      notify("error", message);
      if (message?.toLowerCase().includes("already uploaded")) {
        push("/dashboard/kyc/individual/address");
      }
    } finally {
      setIsLoading(false);
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
      <div className={styles.inner} onSubmit={handleSubmit}>
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
            type="number"
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
            onClick={() => push("/dashboard/kyc/individual/contact")}
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
          // notify={notify}
          payload={payload}
          number={number}
          setShowVerifyBVNModal={setShowVerifyBVNModal}
        />
      )}
    </>
  );
};

export default IdentityInd;

const VerifyBVN = ({ setShowVerifyBVNModal, number, payload }) => {
  const [otp, setOtp] = useState("");
  const { maskedPhoneNo } = functions;
  const bvnNo = payload.documentNumber;
  const [errorMsg, setErrorMsg] = useState("");
  const [ctaClicked, setCtaClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCtaClicked(true);
  };

  return (
    <ModalWrapper
      heading="Verify BVN"
      subHeading={`We sent an OTP ${maskedPhoneNo(
        number
      )} please enter the code below.`}
      ctaBtnText="Verify"
      ctaBtnType="lg"
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
        <div style={{textAlign: "center"}}>
          <ResendBvnOtp bvnNo={bvnNo} clearOtp={() => setOtp("")} />
        </div>
        </div>
      </form>
    </ModalWrapper>
  );
};
