import styles from "@/assets/styles/auth-screens.module.css";
import PrimaryBtn from "@/components/Btn/Primary";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CustomSelect from "@/components/Custom/Select/Select";
import AuthLayout from "@/app/auth-layout";
import CountrySelect from "@/components/Custom/CountrySelect";
import BackBtn from "@/components/Btn/Back";
import FeedbackInfo from "@/components/FeedbackInfo";
// eslint-disable-next-line no-undef
const CS = require("countrycitystatejson");

const BusinessAddress = () => {
  const { push } = useRouter();
  const [states, setStates] = useState([]);
  const [allFieldsValid, setAllFieldsValid] = useState(false);
  const [fullScreenLoader, setFullScreenLoader] = useState(false);
  const [ctaClicked, setCtaClicked] = useState(false);
  const [LGAs, setLGAs] = useState([]);
  const [payload, setPayload] = useState({
    streetNo: "",
    lga: undefined,
    country: undefined,
    state: undefined,
  });

  const handleChange = (name, value) => {
    setPayload((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear the LGA when changing the State
    if (name === "state") {
      setPayload((prevState) => ({
        ...prevState,
        lga: "",
      }));
    }
  };

  const loadLGAs = (selectedState) => {
    if (selectedState) {
      // Use the selectedState to load the corresponding LGAs
      const lgas = CS.getCities(payload.country?.cca2, selectedState);
      setLGAs(lgas);
    } else {
      // Clear the LGAs if no State is selected
      setLGAs([]);
    }
  };

  const loadStates = (selectedCountry) => {
    if (selectedCountry) {
      // Use the selectedCountry to load the corresponding states
      const countryStates = CS.getStatesByShort(selectedCountry.cca2);
      setStates(countryStates);
    } else {
      // Clear the states if no country is selected
      setStates([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(payload);
    setCtaClicked(true);
    if (!allFieldsValid) {
      return;
    }
    setFullScreenLoader(true);
    window.setTimeout(() => {
      setFullScreenLoader(false);
      push("/auth/signup/individual/verify");
    }, 3000);
  };

  useEffect(() => {
    if (
      payload.country?.name?.common &&
      payload.state &&
      LGAs.length &&
      payload.lga &&
      payload.streetNo
    ) {
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
            <BackBtn emitClick={() => push("/auth/signup/individual/business")} />
            <h1 className="title">Add Address</h1>
            <h4 className="sub-title media-max-700">
              Kindly provide personal information
            </h4>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inner}>
                <div
                  className={`${styles.form_group} ${
                    ctaClicked && !payload.streetNo ? styles.error : ""
                  }`}
                >
                  <label htmlFor="street-no">Street no.</label>
                  <input
                    id="street-no"
                    name="streetNo"
                    placeholder="91, Lagos road"
                    value={payload.streetNo}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                  {ctaClicked && !payload.streetNo ? (
                    <FeedbackInfo message="Street No. is needed" />
                  ) : (
                    <></>
                  )}
                </div>
                <div className={styles.form_group}>
                  <label>Select State</label>
                  <CustomSelect
                    disabled={!payload.country?.name?.common}
                    fieldError={ctaClicked && !payload.state}
                    selectOptions={states}
                    selectedOption={payload.state}
                    emitSelect={(option) => {
                      handleChange("state", option);
                      loadLGAs(option); // Load LGAs based on the selected State
                    }}
                  />
                  {ctaClicked && !payload.state ? (
                    <FeedbackInfo message="State is needed" />
                  ) : (
                    <></>
                  )}
                </div>
                <div className={styles.form_group}>
                  <label>Local Govt.</label>
                  <CustomSelect
                    disabled={!payload.state}
                    fieldError={ctaClicked && !payload.lga && LGAs.length}
                    selectOptions={LGAs}
                    selectedOption={payload.lga}
                    emitSelect={(option) => handleChange("lga", option)}
                  />
                  {ctaClicked &&
                  payload.state &&
                  !payload.lga &&
                  LGAs.length ? (
                    <FeedbackInfo message="LGA is needed" />
                  ) : (
                    <></>
                  )}
                </div>
                <div
                  className={`${styles.form_group} ${
                    ctaClicked && !payload.country ? styles.error : ""
                  }`}
                >
                  <label htmlFor="country">Country</label>
                  <CountrySelect
                    fieldError={ctaClicked && !payload.country?.name?.common}
                    emitCountry={(option) => {
                      handleChange("country", option);
                      loadStates(option); // Load states based on the selected country
                    }}
                  />
                  {ctaClicked && !payload.country?.name?.common ? (
                    <FeedbackInfo message="Country is needed" />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className={styles.action_ctn}>
                <PrimaryBtn disabled={!allFieldsValid} text={"Open account"} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default BusinessAddress;
