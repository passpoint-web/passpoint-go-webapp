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

const Identity = ({ styles }) => {
  const { push } = useRouter();
  const notify = useNotify();
  const [ctaClicked, setCtaClicked] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(payload);
    setCtaClicked(true);
    if (!allFieldsValid) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await kyc.uploadKycIdentity({
        documents: payload,
      });
      console.log(response);
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
    <div className={styles.inner} onSubmit={handleSubmit}>
      <h1>Proof of Identity</h1>
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
          {/* <BackBtn
            type="sd"
            text="Back"
            className="half sd"
            onClick={() => push("/dashboard/kyc/corporate/identity")}
          /> */}
          <Button
            className="primary sd"
            text="Save and continue"
            loading={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default Identity;
