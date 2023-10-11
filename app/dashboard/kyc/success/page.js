"use client";
import PrimaryBtn from "@/components/Btn/Primary";
import styles from "../kyc.module.css";
import { TickIcon } from "@/constants/icons";
import { useRouter } from "next/navigation";

const Success = () => {
  const { push } = useRouter();
  return (
    <div className={styles.inner}>
      <section className={styles.innerSucces}>
        <div>
          <TickIcon />
        </div>
        <h2>KYC Completed Successfully</h2>
        <p>
          You have now completed your KYC Registration and your documents are
          being reviewed by the admin, You will get an update in 24 hours
        </p>
        <div className={styles.action_ctn}>
          <PrimaryBtn
            text="Go To Dashboard"
            onClick={() => push("/dashboard")}
          />
        </div>
      </section>
    </div>
  );
};

export default Success;
