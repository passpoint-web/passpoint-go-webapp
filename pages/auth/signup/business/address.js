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
// const countries = CS.getCountries()

const BusinessAddress = () => {
  const { push } = useRouter();
  const [streetNo, setStreetNo] = useState("");
  const [LGA, setLGA] = useState(undefined);
  const [country, setCountry] = useState(undefined);
  const [state, setState] = useState(undefined);
  const [states, setStates] = useState([]);
  const [allFieldsValid, setAllFieldsValid] = useState(false);
  const [fullScreenLoader, setFullScreenLoader] = useState(false);
  const [ctaClicked, setCtaClicked] = useState(false);
  const [LGAs, setLGAs] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCtaClicked(true);
    if (!allFieldsValid) {
      return;
    }
    setFullScreenLoader(true);
    window.setTimeout(() => {
      setFullScreenLoader(false);
      push("/auth/signup/business/personal");
    }, 3000);
  };

  const handleSetCountry = (e) => {
    setCountry(e);
    setStates(CS.getStatesByShort(e.cca2)); // cca2: country's shortname
    setState("");
    setLGA("");
  };

  const handleSetState = (e) => {
    setState(e);
    setLGAs(CS.getCities(country.cca2, e));
    setLGA("");
  };

  useEffect(() => {
    if (country?.name?.common && state && LGAs.length && LGA && streetNo) {
      setAllFieldsValid(true);
    } else {
      setAllFieldsValid(false);
    }
  }, [state, LGA, streetNo]);

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
            <BackBtn emitClick={() => push("/auth/signup/business")} />
            <h1 className="title">Add your business address 🏠</h1>
            <h4 className="sub-title media-max-700">
              Kindly provide personal information
            </h4>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inner}>
                <div
                  className={`${styles.form_group} ${
                    ctaClicked && !country ? styles.error : ""
                  }`}
                >
                  <label htmlFor="country">Country</label>
                  <CountrySelect
                    fieldError={ctaClicked && !country?.name?.common}
                    emitCountry={(e) => handleSetCountry(e)}
                  />
                  {ctaClicked && !country?.name?.common ? (
                    <FeedbackInfo message="Country is needed" />
                  ) : (
                    <></>
                  )}
                </div>
                <div className={styles.form_group}>
                  <label>Select State</label>
                  <CustomSelect
                    disabled={!country?.name?.common}
                    fieldError={ctaClicked && !state}
                    selectOptions={states}
                    selectedOption={state}
                    emitSelect={(e) => handleSetState(e)}
                  />
                  {ctaClicked && !state ? (
                    <FeedbackInfo message="State is needed" />
                  ) : (
                    <></>
                  )}
                </div>
                <div className={styles.form_group}>
                  <label>Local Govt.</label>
                  <CustomSelect
                    disabled={!state}
                    fieldError={ctaClicked && state && !LGA && LGAs.length}
                    selectOptions={LGAs}
                    selectedOption={LGA}
                    emitSelect={(e) => setLGA(e)}
                  />
                  {ctaClicked && state && !LGA && LGAs.length ? (
                    <FeedbackInfo message="LGA is needed" />
                  ) : (
                    <></>
                  )}
                </div>
                <div
                  className={`${styles.form_group} ${
                    ctaClicked && !streetNo ? styles.error : ""
                  }`}
                >
                  <label htmlFor="street-no">Street no.</label>
                  <input
                    id="street-no"
                    placeholder="91, Lagos road"
                    value={streetNo}
                    onChange={(e) => setStreetNo(e.target.value)}
                  />
                  {ctaClicked && !streetNo ? (
                    <FeedbackInfo message="Street No. is needed" />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className={styles.action_ctn}>
                <PrimaryBtn text={"Save and continue"} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default BusinessAddress;
