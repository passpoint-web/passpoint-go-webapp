"use client";
import PrimaryBtn from "@/components/Btn/Primary";
import CustomSelect from "@/components/Custom/Select";
import Input from "@/components/Dashboard/Input";
import { getCredentials } from "@/services/localService";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";

const BusinessPageCop = ({ styles }) => {
  const { push } = useRouter();
  const [savedCredentials, setSavedCredentials] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [ctaClicked, setCtaClicked] = useState(false);
  const [allFieldsValid, setAllFieldsValid] = useState(false);
  const [website, setWebsite] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setCtaClicked(true);
    if (!allFieldsValid) {
      return;
    }
    setIsLoading(true);
    push("/dashboard/kyc/corporate/identity");
  };

  useEffect(() => {
    if (website) {
      setAllFieldsValid(true);
    } else {
      setAllFieldsValid(false);
    }
  }, [website]);

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
          id="website"
          name="website"
          value={website}
          error={ctaClicked && !website}
          errorMsg="Business website is required"
          onChange={(e) => setWebsite(e.target.value)}
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
