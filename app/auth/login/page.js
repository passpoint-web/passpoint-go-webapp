"use client";
import styles from "@/assets/styles/auth-screens.module.css";
import PrimaryBtn from '@/components/Btn/Primary'
import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import PasswordField from '@/components/Auth/PasswordField'
import functions from '@/utils/functions'
import { login } from '@/services/restService'
import Input from '@/components/Dashboard/Input'
import toast from '@/components/Toast'
import { saveCredentials } from '@/services/localService'

const Login = () => {
  const { validEmail } = functions;
  // eslint-disable-next-line no-unused-vars
  const { push } = useRouter();
  const [ctaClicked, setCtaClicked] = useState(false);
  const [allFieldsValid, setAllFieldsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCtaClicked(true);
    if (!allFieldsValid) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await login(payload);
      const data = response.data.data;
      console.log(response.data);
      localStorage.setItem("goToken", response.data.token);
      saveCredentials(data);
      directUser(data);
      notify("success", `You're logged in as ${payload.email}`);
    } catch (_err) {
      const { message } = _err.response?.data || _err;
      notify("error", message);
      console.log(message);
    } finally {
      setIsLoading(false);
    }
  };

  const directUser = ({ userType, is_active, regStage }) => {
    const businessLevels = ["", "address", "personal", "verify"];
    const individualLevels = ["", "business", "address", "verify"];
    if (!is_active && Number(userType) == 2) {
      push(`/auth/signup/business/${businessLevels[regStage]}`);
    } else if (!is_active && Number(userType) == 1) {
      push(`/auth/signup/individual/${individualLevels[regStage]}`);
    } else {
      push("/dashboard");
    }
  };

  useEffect(() => {
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
                placeholder="John@mail.com"
                value={payload.email}
                onChange={handleChange}
                error={ctaClicked && !validEmail(payload.email)}
                errorMsg={
                  !payload.email
                    ? "Email address is required"
                    : !validEmail(payload.email)
                    ? "Valid business email is required"
                    : "Business email is required"
                }
              />
              <Input
                label="Password"
                id="password"
                name="password"
                placeholder="Password"
                error={ctaClicked && !payload.password}
                errorMsg="Password is required"
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
