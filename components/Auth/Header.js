"use client";
import { usePathname } from "next/navigation";
import styles from "@/assets/styles/auth-screens.module.css";
import SecondaryLink from "../Link/Secondary";
import Logo from "../Logo";

const AuthHeader = () => {
  const pathname = usePathname();
  const btn = pathname.includes("/signup")
    ? { url: "/auth/login", text: "Login" }
    : { url: "/auth/signup", text: "Signup" };
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Logo />
        {Object.keys(btn).length ? (
          <div className={styles.rhs}>
            <SecondaryLink type="medium" href={`${btn.url}`} text={btn.text} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
};

export default AuthHeader;
