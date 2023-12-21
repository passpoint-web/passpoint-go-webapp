"use client";
import styles from '@/app/(dashboard)/kyc/kyc.module.css'
import KycSetupLHS from "@/components/KYC/SetupLHS";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LayoutLogic = ({ children }) => {
  const pathname = usePathname();
  const [pathnames, setPathnames] = useState([]);
  useEffect(() => {
    setPathnames([
      "/kyc/corporate/verify-bvn",
      "/kyc/status",
    ]);
  }, [pathname]);
  return (
    <>
      {pathnames.includes(pathname) ? (
        <>{children}</>
      ) : (
        <div className={styles.overlay_screen}>
          <div className={styles.layout_ctn}>
            <div className={styles.lhs}>
              <KycSetupLHS />
            </div>
            <div className={styles.pages}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default LayoutLogic;
