"use client";
import PrimaryBtn from "@/components/Btn/Primary";
import CustomSelect from "@/components/Custom/Select";
import Input from "@/components/Dashboard/Input";
import { getCredentials } from "@/services/localService";
import { kyc } from "@/services/restService";
import { useNotify } from "@/utils/hooks";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";

const BusinessPageCop = ({ styles }) => {
  const { push } = useRouter();
  const notify = useNotify();
  const [savedCredentials, setSavedCredentials] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [ctaClicked, setCtaClicked] = useState(false);
  const [allFieldsValid, setAllFieldsValid] = useState(false);
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCtaClicked(true);
    if (!allFieldsValid) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await kyc.uploadKycBusiness({
        url,
      });
      console.log(response);
      notify("success", "Your website has been saved");
      push("/dashboard/kyc/corporate/identity");
    } catch (_err) {
      const { message } = _err.response?.data || _err;
      notify("error", message);
      if (message?.toLowerCase().includes("already saved")) {
        push("/dashboard/kyc/corporate/identity");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (url) {
      setAllFieldsValid(true);
    } else {
      setAllFieldsValid(false);
    }
  }, [url]);

  useEffect(() => {
    setSavedCredentials(getCredentials());
  }, []);

  return (
    <div className={styles.inner}>
      <h1>Business Information</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Business Name">
          <CustomSelect
            disabled
            selectedOption={savedCredentials?.businessName}
          />
        </Input>
        <Input
          disabled
          label="Business Address"
          id="address"
          name="address"
          defaultValue={savedCredentials?.address}
        />
        <Input
          disabled
          label="Business Email Address"
          id="email"
          name="email"
          defaultValue={savedCredentials?.email}
        />
        <Input id="phone" label="Business Phone Number">
          <PhoneInput
            disabled
            country={"ng"}
            value={savedCredentials?.phoneNumber}
          />
        </Input>
        <Input
          label="Business Website Address"
          id="url"
          name="url"
          value={url}
          error={ctaClicked && !url}
          errorMsg="Business website is required"
          onChange={(e) => setUrl(e.target.value)}
          placeholder="www.kelechitravels.com"
        />
        <div className={styles.action_ctn}>
          <PrimaryBtn text="Save and continue" loading={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default BusinessPageCop;
