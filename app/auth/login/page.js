"use client";
import styles from "@/assets/styles/auth-screens.module.css";
import PrimaryBtn from "@/components/Btn/Primary";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PasswordField from "@/components/Auth/PasswordField";
import functions from "@/utils/functions";
import { login } from "@/services/restService";
import Input from "@/components/Dashboard/Input";
import { saveToken, saveCredentials } from "@/services/localService";
import { useNotify } from "@/utils/hooks";
// import loginUser

const Login = () => {
  const { validEmail } = functions;
  // const {loginUser} = useAuth()
  // eslint-disable-next-line no-unused-vars
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [ctaClicked, setCtaClicked] = useState(false);
  const [allFieldsValid, setAllFieldsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const notify = useNotify();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    // setLogout()
    e.preventDefault();
    setCtaClicked(true);
    if (!allFieldsValid) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await login(payload);
      const { data, token } = response.data;
      saveToken(token);
      saveCredentials(data);
      directUser(data);
      notify("success", `You're logged in as ${payload.email}`);
    } catch (_err) {
      const { message } = _err.response?.data || _err;
      console.log(message);
      setFeedbackError(message);
      notify("error", message);
    } finally {
      setIsLoading(false);
    }
  };

  const directUser = ({ userType, isActive, regStage, kycStatus }) => {
    const businessLevels = ["", "address", "personal", "verify"];
    const individualLevels = ["", "business", "address", "verify"];
    if (!isActive && Number(userType) == 2) {
      push(`/auth/signup/business/${businessLevels[regStage]}`);
    } else if (!isActive && Number(userType) == 1) {
      push(`/auth/signup/individual/${individualLevels[regStage]}`);
    } else if (kycStatus.toLowerCase() === "pending") {
      if (Number(userType) == 2) {
        push("/kyc/corporate/business");
      } else {
        push("/kyc/individual/identity");
      }
    } else if (kycStatus === "inReview") {
      push("/kyc/status");
    } else if (kycStatus.toLowerCase() === "rejected") {
      push("/kyc/status");
    } else if (!searchParams.get("fallBackUrl")) {
      push("/dashboard");
    } else {
      push(searchParams.get("fallBackUrl"));
    }
  };

  useEffect(() => {
    setFeedbackError("");
    const { email, password } = payload;
    const conditionsMet = validEmail(email) && password;
    if (conditionsMet) {
      setAllFieldsValid(true);
    } else {
      setAllFieldsValid(false);
    }
  }, [payload]);

  return (
    <div className={styles.auth}>
      <div className={styles.inner}>
        <div className={styles.center}>
          <h1 className="title">
            <span>Hi,</span> 👋🏾 Welcome back
          </h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inner}>
              <Input
                label="Email Address"
                id="email-address"
                name="email"
                type="email"
                placeholder="John@mail.com"
                value={payload.email}
                onChange={handleChange}
                error={ctaClicked && !validEmail(payload.email)}
                errorMsg={
                  !payload.email
                    ? "Email address is required"
                    : !validEmail(payload.email)
                    ? "Valid email is required"
                    : "Email is required"
                }
              />
              <Input
                label="Password"
                id="password"
                name="password"
                placeholder="Password"
                error={
                  (ctaClicked && !payload.password) ||
                  feedbackError?.toLowerCase().includes("password")
                }
                errorMsg={
                  !payload.password
                    ? "Password is required"
                    : feedbackError?.toLowerCase().includes("password")
                    ? feedbackError
                    : "Password is required"
                }
              >
                <PasswordField
                  errorField={ctaClicked && !payload.password}
                  passwordStrengthNeeded={false}
                  emitPassword={(e) =>
                    handleChange({
                      target: { name: "password", value: e },
                    })
                  }
                />
              </Input>
            </div>
            <div className={styles.action_ctn}>
              <PrimaryBtn text="Log in" loading={isLoading} />
              <p>
                Forgot password?{" "}
                <Link href="/auth/forgot-password" text="Reset it">
                  Reset it
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
