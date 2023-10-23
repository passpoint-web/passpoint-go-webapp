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

  console.log(user);

  return (
    <div className={styles.dashKyc}>
      <div className={styles.dashKyc_content}>
        <h3>Complete KYC</h3>
        <p>We want to know more about you and your business</p>
        <Link
          href={
            user?.userType === "1"
              ? "/dashboard/kyc/individual/identity"
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
