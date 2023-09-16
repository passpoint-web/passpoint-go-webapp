import AuthLayout from "@/app/auth-layout";
import styles from "@/assets/styles/auth-screens.module.css";
import PrimaryBtn from "@/components/Btn/Primary";
import TertiaryBtn from "@/components/Btn/Tertiary";
import BackBtn from "@/components/Btn/Back";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
// import functions from '@/utils/functions'
import { useRouter } from "next/router";
import FeedbackInfo from "@/components/FeedbackInfo";

const VerifyEmail = () => {
  const { push } = useRouter();
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [fullScreenLoader, setFullScreenLoader] = useState(false);
  const [ctaClicked, setCtaClicked] = useState(false);

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    setCtaClicked(true);
    if (otp.length !== 6) {
      return;
    }
    setFullScreenLoader(true);
    window.setTimeout(() => {
      setFullScreenLoader(false);
      push("/auth/login");
    }, 3000);
  };

  useEffect(() => {
    setErrorMsg("");
  });

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
            <BackBtn emitClick={() => push("/auth/signup/business/address")} />
            <h1 className="title">Verify Email Address</h1>
            <h4 className="sub-title">
              We sent a 6 digit code to daniel****@gmail.com, please enter the
              code below, or click the verification link in your mail to
              complete verification{" "}
            </h4>
            <form className={styles.form} onSubmit={handleVerificationSubmit}>
              <div className={styles.inner}>
                <div
                  className={`${styles.form_group} ${
                    (ctaClicked && otp.length !== 6) || errorMsg
                      ? styles.error
                      : ""
                  }`}
                >
                  <div className={styles.otp_input}>
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      inputType="number"
                      inputMode="numeric"
                      renderSeparator={<span />}
                      renderInput={(props) => <input {...props} />}
                    />
                  </div>
                  {(ctaClicked && otp.length !== 6) || errorMsg ? (
                    <FeedbackInfo
                      center={true}
                      message={otp.length !== 6 ? "Valid OTP needed" : errorMsg}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className={styles.action_ctn}>
                <p>
                  Didn’t receive any code? <TertiaryBtn text="Resend OTP" />
                </p>
                <PrimaryBtn text="Verify" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;
