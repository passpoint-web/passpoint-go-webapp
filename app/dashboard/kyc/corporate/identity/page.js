import styles from "../../kyc.module.css";
import IdentityPageCop from "@/components/KYC/corporate/IdentityPageCop";
export const metadata = () => {
  return {
    title: "Identity - KYC | Passpoint Go",
    description: "",
  };
};

const Identity = () => {
  return <IdentityPageCop styles={styles} />;
};

export default Identity;
