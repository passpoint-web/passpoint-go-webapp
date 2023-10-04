"use client";
import PrimaryBtn from "@/components/Btn/Primary";
import CustomSelect from "@/components/Custom/Select";
import Input from "@/components/Dashboard/Input";
import FeedbackInfo from "@/components/FeedbackInfo";
import FileUpload from "@/components/FileUpload";
import { documentType } from "@/utils/CONSTANTS";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const AddressCop = ({ styles }) => {
  const { push } = useRouter();
  const [ctaClicked, setCtaClicked] = useState(false);
  const [allFieldsValid, setAllFieldsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState({
    documentType: "",
    document: {},
  });

  const handleChange = (name, value) => {
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(payload);
    setCtaClicked(true);
    if (!allFieldsValid) {
      return;
    }
    setIsLoading(true);
    push("/dashboard/kyc/corporate/ownership");
  };

  useEffect(() => {
    const conditionsMet = payload.documentType && payload.document.name;
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
            fileObj={payload.document}
            handlefileUpload={(file) => handleChange("document", file)}
          />
          {ctaClicked && !payload.document.name ? (
            <FeedbackInfo message="Document is required" />
          ) : (
            <></>
          )}
        </div>
        <div className={styles.action_ctn}>
          <PrimaryBtn text="Save and continue" loading={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default AddressCop;
