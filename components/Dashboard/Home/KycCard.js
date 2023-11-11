"use client";
import Link from "next/link";
import styles from "@/assets/styles/dashboard-layout.module.css";
import { getCredentials } from "@/services/localService";
import { useEffect, useState } from "react";

const KycCard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const credentials = getCredentials();
    setUser(credentials);
  }, []);

  return (
    <div className={styles.dashKyc}>
      <div className={styles.dashKyc_content}>
        <h3>Wallet & Virtual Accounts</h3>
        <p>Manage your wallet and your virtual account here.</p>
        <Link href="/dashboard/wallet" className="primary_link medium">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default KycCard;
