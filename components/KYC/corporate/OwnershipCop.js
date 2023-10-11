"use client";
import BackBtn from "@/components/Btn/Back";
import PrimaryBtn from "@/components/Btn/Primary";
import FeedbackInfo from "@/components/FeedbackInfo";
import FileUpload from "@/components/FileUpload";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const OwnershipCop = ({ styles }) => {
  const { push } = useRouter();
  const [ctaClicked, setCtaClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allFieldsValid, setAllFieldsValid] = useState(false);
  const [payload, setPayload] = useState({
    businessArt: {},
    partnership: {},
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
    push("/dashboard/kyc/success");
  };

  useEffect(() => {
    const conditionsMet = payload.businessArt.name && payload.partnership.name;
    if (conditionsMet) {
      setAllFieldsValid(true);
    } else {
      setAllFieldsValid(false);
    }
  }, [payload]);

  return (
    <div className={styles.inner} onSubmit={handleSubmit}>
      <h1>Proof of Ownership</h1>
      <form>
        <div className={styles.innerUpload}>
          <FileUpload
            subTitle="Business's Articles of Incorporation"
            fileObj={payload.businessArt}
            handlefileUpload={(file) => handleChange(file, "businessArt")}
          />
          {ctaClicked && !payload.businessArt.name ? (
            <FeedbackInfo message="Business article is required" />
          ) : (
            <></>
          )}
        </div>
        <div className={styles.innerUpload}>
          <FileUpload
            subTitle="Partnership Agreement"
            fileObj={payload.partnership}
            handlefileUpload={(file) => handleChange(file, "partnership")}
          />
          {ctaClicked && !payload.partnership.name ? (
            <FeedbackInfo message="Partnership is required" />
          ) : (
            <></>
          )}
        </div>
        <div className={styles.action_ctn}>
          <BackBtn
            type="button"
            text="Back"
            onClick={() => push("/dashboard/kyc/corporate/address")}
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

export default OwnershipCop;
