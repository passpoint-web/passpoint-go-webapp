import styles from "../../kyc.module.css";
import IdentityInd from "@/components/KYC/individual/IndentityInd";

export const metadata = () => {
  return {
    title: "Proof Of Identity - KYC-Individual | Passpoint Go",
    description: "",
  };
};
const Identity = () => {
  return <IdentityInd styles={styles} />;
};

export default Identity;
