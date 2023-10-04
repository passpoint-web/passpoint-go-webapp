import BusinessPageCop from "@/components/KYC/corporate/BusinessPageCop";
import styles from "../../kyc.module.css";
export const metadata = () => {
  return {
    title: "About Business - KYC | Passpoint Go",
    description: "",
  };
};

const Business = () => {
  return <BusinessPageCop styles={styles} />;
};

export default Business;
