// 'use client'
import styles from "./kyc.module.css";
import KycSetupLHS from "@/components/KYC/SetupLHS";
export const metadata = () => {
  return {
    title: "KYC | Passpoint Go",
    description: "",
  };
};
const KYCLayout = ({ children }) => {
  return (
    <div className={styles.overlay_screen}>
      <div className={styles.layout_ctn}>
      <div className={styles.lhs}>
        <KycSetupLHS />
      </div>
      <div className={styles.pages}>{children}</div>
    </div>
    </div>
  );
};

export default KYCLayout;
