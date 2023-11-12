"use client";
// import Input from "@/components/Dashboard/Input";
// import FeedbackInfo from "@/components/FeedbackInfo";
import FileUpload from "@/components/FileUpload";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import formStyles from "@/assets/styles/auth-screens.module.css";
import BackBtn from "@/components/Btn/Back";
import { useNotify } from "@/utils/hooks";
import { kyc } from "@/services/restService";
import Button from "@/components/Btn/Button";
import {
  saveKycDetails,
  getKycDetails as getSavedKycDetails,
} from "@/services/localService";
import FullScreenLoader from "@/components/Modal/FullScreenLoader";

const Identity = ({ styles }) => {
  const { push } = useRouter();
  const notify = useNotify();
  const savedKycDetails = getSavedKycDetails();
  const [dataLoading, setDataLoading] = useState(true);
  const [ctaClicked, setCtaClicked] = useState(false);
  const [submitType, setSubmitType] = useState("NEW");
  const [isLoading, setIsLoading] = useState(false);
  const [allFieldsValid, setAllFieldsValid] = useState(false);
  const [payload, setPayload] = useState([
    {
      documentType: "act of memorandum",
      documentFile: "",
    },
    {
      documentType: "business license",
      documentFile: "",
    },
  ]);

  const handleChange = (file, documentIndex) => {
    setPayload((prev) => {
      const updatedPayload = [...prev];
      updatedPayload[documentIndex].documentFile = file;
      return updatedPayload;
    });
  };

  const getKycDetails = async () => {
    try {
      const response = await kyc.getKycDetails();
      const data = response.data.data;
      saveKycDetails(data);
      const documents = data.proofIdentity;
      if (documents && documents.length > 0) {
        setPayload((prev) => {
          const updatedPayload = [...prev];
          updatedPayload[0].documentFile = documents[0]?.docFile;
          updatedPayload[1].documentFile = documents[1]?.docFile;
          return updatedPayload;
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
    setCtaClicked(true);
    if (!allFieldsValid) {
      return;
    }
    setIsLoading(true);
    try {
      console.log(submitType)
      await kyc.uploadKycIdentity({
        documents: payload,
        submitType,
      });
      saveKycDetails({
        ...savedKycDetails,
        KycStage:
          savedKycDetails?.KycStage > 2 ? savedKycDetails?.KycStage : 2,
      });
      notify("success", "Your identity has been saved");
      push("/dashboard/kyc/corporate/address");
    } catch (_err) {
      const { message } = _err.response?.data || _err;
      notify("error", message);
      if (message?.toLowerCase().includes("already uploaded")) {
        push("/dashboard/kyc/corporate/address");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const conditionsMet = payload[0].documentFile && payload[1].documentFile;
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
        <h2>Proof of Identity</h2>
        <h4 className="sub-title media-max-1000">
        Verify your identity to ensure a secure and trusted experience.
        </h4>
        <form className={formStyles.form}>
          <FileUpload
            smTitle="Act of Memorandum"
            base64={payload[0].documentFile}
            handlefileUpload={(file) => handleChange(file, 0)}
            error={ctaClicked && !payload[0].documentFile}
            errorMsg="Act of Memorandum is required"
          />
          <FileUpload
            smTitle="Business License"
            base64={payload[1].documentFile}
            handlefileUpload={(file) => handleChange(file, 1)}
            error={ctaClicked && !payload[1].documentFile}
            errorMsg="Business License is required"
          />
          <div className={styles.action_ctn}>
            <BackBtn
              buttonType="button"
              type="sd"
              text="Back"
              className="half sd"
              onClick={() => push("/dashboard/kyc/corporate/business")}
            />
            <Button
              className="primary sd half"
              text="Save and continue"
              loading={isLoading}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Identity;
