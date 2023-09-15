import AuthLayout from "@/app/auth-layout";
import styles from "@/assets/styles/auth-screens.module.css";
import PrimaryBtn from "@/components/Btn/Primary";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
// import {notify} from '@/components/Toast'
import PasswordField from "@/components/Auth/PasswordField";

const Login = () => {
  const { push } = useRouter();
  const [fullScreenLoader, setFullScreenLoader] = useState(false);
  const [password, setPassword] = useState("");
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setPayload((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
	  e.preventDefault();
	  console.log(payload)
    // console.log(notify())
    // notify('yoyoyoy')
    setFullScreenLoader(true);
    window.setTimeout(() => {
      setFullScreenLoader(false);
      push("/auth/business-kind");
    }, 3000);
  };

  // const onSetPassword = (e) => {
  // 	console.log(e)
  // }

  return (
    <AuthLayout
      fullScreenLoader={fullScreenLoader}
      btn={{ text: "Sign up", url: "/auth/signup" }}
      pageTitle={"Login"}
    >
      <div className={styles.auth}>
        <div className={styles.inner}>
          <div className={styles.center}>
            <h1 className="title">
              <span>Hi,</span> 👋🏾 Welcome back
            </h1>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inner}>
                <div className={styles.form_group}>
                  <label htmlFor="email-address">Email address</label>
                  <input
                    placeholder="kelechi@gmail.com"
                    id="email-address"
                    type="email"
                    name="email"
                    value={payload.email}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.form_group}>
                  <label htmlFor="password">Password</label>
                  <PasswordField
                    passwordStrengthNeeded={false}
                    emitPassword={(e) => setPassword(e)}
                    setPayload={setPayload}
                  />
                </div>
              </div>
              <div className={styles.action_ctn}>
                <PrimaryBtn
                  disabled={!payload.email || password.length < 7}
                  text="Log in"
                />
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
    </AuthLayout>
  );
};

export default Login;
