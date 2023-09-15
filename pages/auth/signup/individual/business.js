import AuthLayout from "@/app/auth-layout";
import styles from "@/assets/styles/auth-screens.module.css";
import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect } from "react";
import CustomSelect from "@/components/Custom/Select/Select";
import PrimaryBtn from "@/components/Btn/Primary";
import BackBtn from "@/components/Btn/Back";
import FeedbackInfo from "@/components/FeedbackInfo";

const BusinessInformation = () => {
  const { push } = useRouter();
  const [fullScreenLoader, setFullScreenLoader] = useState(false);
  const [allFieldsValid, setAllFieldsValid] = useState(false);
  const [ctaClicked, setCtaClicked] = useState(false);
  const [payload, setPayload] = useState({
    businessName: "",
    businessIndustry: undefined,
  });

  const businessIndustries = [
    "Travel Agents",
    "Tour Operators",
    "Hospitality Service Providers (Hoteliers, rentals, Restaurants)",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check if the field name is 'businessIndustry'
    if (name === "businessIndustry") {
      setPayload((prevState) => ({
        ...prevState,
        businessIndustry: value,
      }));
    } else {
      setPayload((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(payload);
    setCtaClicked(true);
    if (!allFieldsValid) {
      return;
    }
    setFullScreenLoader(true);
    window.setTimeout(() => {
      setFullScreenLoader(false);
      push("/auth/signup/individual/address");
    }, 3000);
  };

  useEffect(() => {
    const conditionsMet = payload.businessName && payload.businessIndustry;
    if (conditionsMet) {
      setAllFieldsValid(true);
    } else {
      setAllFieldsValid(false);
    }
  }, [payload]);

  return (
    <AuthLayout
      LHSRequired={true}
      fullScreenLoader={fullScreenLoader}
      btn={{ text: "Log in", url: "/auth/login" }}
      pageTitle={"Signup"}
    >
      <div className={`${styles.auth} ${styles.no_pd_top}`}>
        <div className={styles.inner}>
          <div className={styles.center}>
            <BackBtn emitClick={() => push("/auth/signup/individual")} />
            <h1 className="title">Register your business with Passpoint</h1>
            <h4 className="sub-title media-max-700">
              We want to know how you want to operate on Passpoint
            </h4>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inner}>
                <div className={styles.form_group}>
                  <label>Business Industry</label>
                  <CustomSelect
                    id="business-industry"
                    selectOptions={businessIndustries}
                    selectedOption={payload.businessIndustry}
                    fieldError={ctaClicked && !payload.businessIndustry}
                    emitSelect={(option) =>
                      handleChange({
                        target: { name: "businessIndustry", value: option },
                      })
                    }
                  />
                  {ctaClicked && !payload.businessIndustry ? (
                    <FeedbackInfo message="Business industry needed" />
                  ) : (
                    <></>
                  )}
                </div>
                <div
                  className={`${styles.form_group} ${
                    ctaClicked && !payload.businessName ? styles.error : ""
                  }`}
                >
                  <label htmlFor="business-name">Business Name</label>
                  <input
                    placeholder="Kelechi Travels"
                    id="business-name"
                    name="businessName"
                    value={payload.businessName}
                    onChange={handleChange}
                  />
                  {ctaClicked && !payload.businessName ? (
                    <FeedbackInfo message="Business name needed" />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className={styles.action_ctn}>
                <PrimaryBtn
                  disabled={!allFieldsValid}
                  text="Save and continue"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default BusinessInformation;
