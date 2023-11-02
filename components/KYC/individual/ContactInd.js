"use client";
import PrimaryBtn from "@/components/Btn/Primary";
import Input from "@/components/Dashboard/Input";
import { getCredentials } from "@/services/localService";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";

const ContactInd = ({ styles }) => {
  const { push } = useRouter();
  const [savedCredentials, setSavedCredentials] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    push("/dashboard/kyc/individual/identity");
  };

  useEffect(() => {
    setSavedCredentials(getCredentials());
  }, []);

  return (
    <div className={styles.inner}>
      <h1>Contact Information</h1>
      <form onSubmit={handleSubmit}>
        <Input
          disabled
          label="Email Address"
          id="email"
          name="email"
          defaultValue={savedCredentials?.email}
        />
        <Input id="phone" label="Phone Number">
          <PhoneInput
            disabled
            country={"ng"}
            value={savedCredentials?.phoneNumber}
          />
        </Input>
        <Input
          disabled
          label="Home Address"
          id="address"
          name="address"
          defaultValue={savedCredentials?.address}
        />

        <div className={styles.action_ctn}>
          <PrimaryBtn text="Save and continue" loading={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default ContactInd;
