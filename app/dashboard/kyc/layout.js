// 'use client'
import styles from "./kyc.module.css";
import KycSetupLHS from "@/components/KYC/SetupLHS";
export const metadata = () => {
  return {
    title: "KYC | Passpoint Go",
    description: "",
  };
};
const PublicProfileSetupLayout = ({ children }) => {
  return (
    <div className={styles.layout_ctn}>
      <div className={styles.lhs}>
        <KycSetupLHS />
      </div>
      <div className={styles.pages}>{children}</div>
    </div>
  );
};

export default PublicProfileSetupLayout;
