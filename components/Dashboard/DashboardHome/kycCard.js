import Link from "next/link";
import styles from "../../../assets/styles/dashboard-layout.module.css";

const KycCard = () => {
  return (
    <div className={styles.dashKyc}>
      <div className={styles.dashKyc_content}>
        <h3>Complete KYC</h3>
        <p>We want to know more about you and your business</p>
        <Link href="" className="medium">Get Started</Link>
      </div>
    </div>
  );
};

export default KycCard;
