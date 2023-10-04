import AddressInd from "@/components/KYC/individual/AddressInd";
import styles from "../../kyc.module.css";

export const metadata = () => {
  return {
    title: "Proof Of Address - KYC-Individual | Passpoint Go",
    description: "",
  };
};
const Address = () => {
  return <AddressInd styles={styles} />;
};

export default Address;
