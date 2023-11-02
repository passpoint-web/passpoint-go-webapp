"use client";
import PrimaryBtn from "@/components/Btn/Primary";
import CustomSelect from "@/components/Custom/Select";
import Input from "@/components/Dashboard/Input";
import FullScreenLoader from "@/components/Modal/FullScreenLoader";
import {
  saveKycDetails,
  getKycDetails as getSavedKycDetails,
} from "@/services/localService";
import { kyc } from "@/services/restService";
import { indKycDocType } from "@/utils/CONSTANTS";
import { useNotify } from "@/utils/hooks";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const IdentityInd = ({ styles }) => {
  const { push } = useRouter();
  const notify = useNotify();
  const savedKycDetails = getSavedKycDetails();
  const [submitType, setSubmitType] = useState("NEW");
  const [dataLoading, setDataLoading] = useState(true);
  const [ctaClicked, setCtaClicked] = useState(false);
  const [allFieldsValid, setAllFieldsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      console.log(data);
      const documents = data.proofIdentity;
      if (documents) {
        setPayload({
          ...payload,
          documentType: documents.identityDocumentType,
          documentNumber: documents.identityDocumentNumber,
        });
        setSubmitType("EDIT");
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
    try {
      await kyc.uploadIndIdentity({
        ...payload,
        submitType,
      });
      saveKycDetails({
        ...savedKycDetails,
        KycStage:
          savedKycDetails.KycStage > 1 ? savedKycDetails.KycStage : 1,
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
    </>
  );
};

export default IdentityInd;
