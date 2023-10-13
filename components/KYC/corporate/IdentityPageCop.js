"use client";
import PrimaryBtn from "@/components/Btn/Primary";
import Input from "@/components/Dashboard/Input";
// import FeedbackInfo from "@/components/FeedbackInfo";
import FileUpload from "@/components/FileUpload";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import formStyles from "@/assets/styles/auth-screens.module.css";
import BackBtn from "@/components/Btn/Back";
import { useNotify } from "@/utils/hooks";
import { kyc } from "@/services/restService";

const IdentityPageCop = ({ styles }) => {
  const { push } = useRouter();
  const notify = useNotify();
  const [ctaClicked, setCtaClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allFieldsValid, setAllFieldsValid] = useState(false);
  const [payload, setPayload] = useState({
    documents: [
      {
        documentType: "act of memorandum",
        documentFile: "",
      },
      {
        documentType: "business license",
        documentFile: "",
      },
    ],
  });

  // const handleChange = (file, identifier) => {
  //   setPayload((prev) => ({
  //     ...prev,
  //     [identifier]: file,
  //   }));
  // };

  const handleChange = (file, documentIndex) => {
    setPayload((prev) => {
      const updatedDocuments = [...prev.documents];
      updatedDocuments[documentIndex].documentFile = file;
      return { ...prev, documents: updatedDocuments };
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
        ...payload,
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
    const conditionsMet =
      payload.documents[0].documentFile && payload.documents[1].documentFile;
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
        {/* <Input
          label="Bank Verification Number"
          id="bvn"
          name="bvn"
          type="number"
          placeholder="Enter your BVN"
          error={ctaClicked && !payload.bvn}
          onChange={(e) => handleChange(e.target.value, "bvn")}
          errorMsg="BVN is required"
          info="To get your BVN, Dial *560# with your business phone number"
        /> */}
        <FileUpload
          smTitle="Act of Memorandum"
          base64={payload.documents[0].documentFile}
          handlefileUpload={(file) => handleChange(file, 0)}
          error={ctaClicked && !payload.documents[0].documentFile}
          errorMsg="Act of Memorandum is required"
        />
        <FileUpload
          smTitle="Business License"
          base64={payload.documents[1].documentFile}
          handlefileUpload={(file) => handleChange(file, 1)}
          error={ctaClicked && !payload.documents[1].documentFile}
          errorMsg="Business License is required"
        />
        {/* <FileUpload
          smTitle="Passport Photograph"
          fileObj={payload.businessPhoto}
          handlefileUpload={(file) => handleChange(file, "businessPhoto")}
          error={ctaClicked && !payload.businessPhoto.name}
          errorMsg="Passport photograph is required"
        /> */}
        <div className={styles.action_ctn}>
          <BackBtn
            type="button"
            text="Back"
            onClick={() => push("/dashboard/kyc/corporate/business")}
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

export default IdentityPageCop;
