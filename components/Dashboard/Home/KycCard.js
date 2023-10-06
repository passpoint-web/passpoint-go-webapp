import Link from "next/link";
import styles from "@/assets/styles/dashboard-layout.module.css";
import { getCredentials } from "@/services/localService";

const KycCard = () => {
  const user = getCredentials();

  return (
    <div className={styles.dashKyc}>
      <div className={styles.dashKyc_content}>
        <h3>Complete KYC</h3>
        <p>We want to know more about you and your business</p>
        <Link
          href={
            user?.userType === "1"
              ? "/dashboard/kyc/individual/contact"
              : "/dashboard/kyc/corporate/business"
          }
          className="primary_link medium"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default KycCard;