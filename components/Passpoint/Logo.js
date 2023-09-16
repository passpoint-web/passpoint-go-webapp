import { Logo } from "@/constants/icons";
import styles from "@/assets/styles/auth-screens.module.css";
import Link from "next/link";

const PasspointLogo = () => {
  return (
    <Link href="/auth/login" className={styles.logo}>
      <Logo />
    </Link>
  );
};

export default PasspointLogo;
