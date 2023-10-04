import styles from "../../kyc.module.css";
import OwnershipCop from "@/components/KYC/corporate/OwnershipCop";

export const metadata = () => {
  return {
    title: "Proof of Ownership - KYC-Corporate  | Passpoint Go",
    description: "",
  };
};
const Ownership = () => {
  return <OwnershipCop styles={styles} />;
};

export default Ownership;
