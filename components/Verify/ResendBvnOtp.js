import styles from "@/assets/styles/auth-screens.module.css";
import TertiaryBtn from "@/components/Btn/Tertiary";
import { useEffect, useState } from "react";
import { kyc, resendOtp } from "@/services/restService";
import { useNotify } from "@/utils/hooks";
const ResendBvnOtp = ({ bvnNo, clearOtp }) => {
  const [resendOTPStatus, setResendOTPStatus] = useState("Resend OTP");
  const [countDown, setCountDown] = useState(0);
  const countDownTimer = () => {
    if (countDown > 0) {
      window.setTimeout(() => {
        setCountDown(countDown - 1);
      }, 1000);
    } else {
      setResendOTPStatus("Resend OTP");
    }
  };

  const notify = useNotify();

  useEffect(() => {
    countDownTimer();
  }, [countDown]);

  const resendOTP = async (e) => {
    e.preventDefault();
    setResendOTPStatus("Resending...");
    console.log(bvnNo);
    try {
      const response = await kyc.verifyBvn({ bvn: bvnNo });
      console.log(response);

      notify("success", "OTP Resent Successfully. Please Retry New OTP.");
      clearOtp();
      setCountDown(59);
      countDownTimer();
    } catch (_err) {
      const { message } = _err.response?.data || _err;
      notify("error", message);
    } finally {
      setResendOTPStatus("Resend OTP");
    }
  };

  return (
    <p className={styles.receive_otp_text}>
      Didn’t receive any code?{" "}
      {!countDown && resendOTPStatus === "Resend OTP" ? (
        <TertiaryBtn text="Resend OTP" onClick={resendOTP} />
      ) : !countDown && resendOTPStatus === "Resending..." ? (
        <span className={styles.otp_count_down}>Resending...</span>
      ) : (
        <span className={styles.otp_count_down}>
          Resend OTP(0.{countDown}s)
        </span>
      )}
    </p>
  );
};

export default ResendBvnOtp;
