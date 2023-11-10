"use client";
import BackBtn from "@/components/Btn/Back";
import PrimaryBtn from "@/components/Btn/Primary";
import CustomSelect from "@/components/Custom/Select";
import Input from "@/components/Dashboard/Input";
import FileUpload from "@/components/FileUpload";
import FullScreenLoader from "@/components/Modal/FullScreenLoader";
import {
  saveKycDetails,
  getKycDetails as getSavedKycDetails,
} from "@/services/localService";
import { kyc } from "@/services/restService";
import { documentType } from "@/utils/CONSTANTS";
import { useNotify } from "@/utils/hooks";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { useState, useEffect } from "react";

const Address = ({ styles }) => {
  const { push } = useRouter();
  const notify = useNotify();
  const savedKycDetails = getSavedKycDetails();
  const [ctaClicked, setCtaClicked] = useState(false);
  const [submitType, setSubmitType] = useState("NEW");
  const [dataLoading, setDataLoading] = useState(true);
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

  const getKycDetails = async () => {
    try {
      const response = await kyc.getKycDetails();
      const data = response.data.data;
      saveKycDetails(data);
      const documents = data.proofAddress;
      if (documents) {
        setPayload({
          ...payload,
          documentType: documents.addressDocumentType,
          documentFile: documents.addressDocumentFile,
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
      const response = await kyc.uploadKycAddress({
        ...payload,
        submitType,
      });
      saveKycDetails({
        ...savedKycDetails,
        KycStage: 3,
      });
      console.log(response);
      notify("success", "Your Address has been saved");
      push("/dashboard/kyc/success");
    } catch (_err) {
      const { message } = _err.response?.data || _err;
      notify("error", message);
      if (message?.toLowerCase().includes("already uploaded")) {
        push("/dashboard/kyc/success");
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
    <>
      {dataLoading ? <FullScreenLoader /> : <></>}
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
              type="sd"
              buttonType="button"
              className="half sd"
              text="Back"
              onClick={() => push("/dashboard/kyc/corporate/identity")}
            />
            <PrimaryBtn
              className="primary sd half"
              type="submit"
              text="Submit"
              loading={isLoading}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Address;
