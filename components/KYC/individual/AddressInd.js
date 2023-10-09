"use client";
import PrimaryBtn from "@/components/Btn/Primary";
import CustomSelect from "@/components/Custom/Select";
import Input from "@/components/Dashboard/Input";
import FileUpload from "@/components/FileUpload";
import { kyc } from "@/services/restService";
import { documentType } from "@/utils/CONSTANTS";
import { useNotify } from "@/utils/hooks";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const AddressInd = ({ styles }) => {
  const notify = useNotify();
  const { push } = useRouter();
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
      const response = await kyc.uploadAddress({
        ...payload,
      });
      console.log(response);
      notify("success", "Your address has been saved");
      push("/dashboard");
    } catch (_err) {
      const { message } = _err.response?.data || _err;
      notify("error", message);
      if (message.toLowerCase().includes("already uploaded")) {
        push("/dashboard");
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
            smTitle="Upload the document selected"
            base64={payload.documentFile}
            handlefileUpload={(file) => handleChange("documentFile", file)}
            error={ctaClicked && !payload.documentFile}
            errorMsg="Address file is required"
          />
        </div>
        <div className={styles.action_ctn}>
          <PrimaryBtn text="Save and continue" loading={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default AddressInd;
