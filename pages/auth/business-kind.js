import AuthLayout from "@/app/auth-layout";
import styles from "@/assets/styles/auth-screens.module.css";
import PrimaryBtn from "@/components/Btn/Primary";
import { useState } from "react";
import ChoiceCard from "@/components/BusinessKind/ChoiceCard";
import { useRouter } from "next/router";

const BusinessKind = () => {
  const router = useRouter();
  const [option, setOption] = useState(undefined);

  const onSetOption = (value) => {
    setOption(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/kyc/business-type");
  };

  return (
    <AuthLayout pageTitle={"Business Kind"}>
      <div className={styles.auth}>
        <div className={`${styles.inner} ${styles.business_type}`}>
          <div className={styles.center}>
            <h1 className="center">What kind of business are you?</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inner}>
                <ChoiceCard emitSetOption={onSetOption} />
              </div>
              <div className={`${styles.action_ctn} ${styles.end}`}>
                <PrimaryBtn disabled={option === undefined} text="Continue" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default BusinessKind;
