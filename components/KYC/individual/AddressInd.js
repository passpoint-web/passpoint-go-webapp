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
import { useState, useEffect } from "react";

const AddressInd = ({ styles }) => {
  const notify = useNotify();
  const { push } = useRouter();
  const savedKycDetails = getSavedKycDetails();
  const [submitType, setSubmitType] = useState("NEW");
  const [dataLoading, setDataLoading] = useState(true);
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

  const getKycDetails = async () => {
    try {
      const response = await kyc.getKycDetails();
      const data = response.data.data;
      saveKycDetails(data);
      console.log(data);
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
    console.log(payload);
    setCtaClicked(true);
    if (!allFieldsValid) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await kyc.uploadIndAddress({
        ...payload,
        submitType,
      });
      saveKycDetails({
        ...savedKycDetails,
        KycStage: 2,
      });
      notify("success", "Your address has been saved");
      push("/dashboard/kyc/success");
    } catch (_err) {
      const { message } = _err.response?.data || _err;
      notify("error", message);
      if (message.toLowerCase().includes("already uploaded")) {
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
              smTitle="Upload the document selected"
              base64={payload.documentFile}
              handlefileUpload={(file) => handleChange("documentFile", file)}
              error={ctaClicked && !payload.documentFile}
              errorMsg="Address file is required"
            />
          </div>
          <div className={styles.action_ctn}>
            <BackBtn
              type="sd"
              buttonType="button"
              className="half sd"
              text="Back"
              onClick={() => push("/dashboard/kyc/individual/identity")}
            />
            <PrimaryBtn
              type="submit"
              text="Submit"
              loading={isLoading}
              className="primary sd half"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddressInd;
