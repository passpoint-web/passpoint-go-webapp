"use client";
import PrimaryBtn from "@/components/Btn/Primary";
import Input from "@/components/Dashboard/Input";
import FeedbackInfo from "@/components/FeedbackInfo";
import FileUpload from "@/components/FileUpload";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const IdentityPageCop = ({ styles }) => {
  const { push } = useRouter();
  const [ctaClicked, setCtaClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allFieldsValid, setAllFieldsValid] = useState(false);
  const [payload, setPayload] = useState({
    bvn: "",
    businessCert: {},
    businessLicense: {},
    businessPhoto: {},
  });

  const handleChange = (file, identifier) => {
    setPayload((prev) => ({
      ...prev,
      [identifier]: file,
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
    push("/dashboard/kyc/corporate/address");
  };

  useEffect(() => {
    const conditionsMet =
      payload.bvn &&
      payload.businessCert.name &&
      payload.businessLicense.name &&
      payload.businessPhoto.name;
    if (conditionsMet) {
      setAllFieldsValid(true);
    } else {
      setAllFieldsValid(false);
    }
  }, [payload]);

  return (
    <div className={styles.inner} onSubmit={handleSubmit}>
      <h1>Proof of Identity</h1>
      <form>
        <div>
          <Input
            label="Bank Verification Number"
            id="bvn"
            name="bvn"
            placeholder="Enter your BVN"
            error={ctaClicked && !payload.bvn}
            onChange={(e) => handleChange(e.target.value, "bvn")}
            errorMsg="BVN is required"
          />
          <FeedbackInfo
            type="info"
            message="To get your BVN, Dial *560# with your business phone number"
          />
        </div>
        <div className={styles.innerUpload}>
          <FileUpload
            subTitle="Business Registration Certificate"
            fileObj={payload.businessCert}
            handlefileUpload={(file) => handleChange(file, "businessCert")}
          />
          {ctaClicked && !payload.businessCert.name ? (
            <FeedbackInfo message="Business Logo is required" />
          ) : (
            <></>
          )}
        </div>
        <div className={styles.innerUpload}>
          <FileUpload
            subTitle="Business License"
            fileObj={payload.businessLicense}
            handlefileUpload={(file) => handleChange(file, "businessLicense")}
          />
          {ctaClicked && !payload.businessLicense.name ? (
            <FeedbackInfo message="Business Logo is required" />
          ) : (
            <></>
          )}
        </div>
        <div className={styles.innerUpload}>
          <FileUpload
            subTitle="Passport Photograph"
            fileObj={payload.businessPhoto}
            handlefileUpload={(file) => handleChange(file, "businessPhoto")}
          />
          {ctaClicked && !payload.businessPhoto.name ? (
            <FeedbackInfo message="Business Logo is required" />
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

export default IdentityPageCop;
