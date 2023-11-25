"use client";
import Link from "next/link";
import styles from "@/assets/styles/dashboard-layout.module.css";

const KycCard = () => {
  return (
    <div className={styles.dashKyc}>
      <div className={styles.dashKyc_content}>
        <h3>Wallet & Virtual Accounts</h3>
        <p>Manage your wallet and your virtual account here.</p>
        <Link href="/wallet" className="primary_link medium">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default KycCard;
