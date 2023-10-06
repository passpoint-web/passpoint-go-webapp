import AddressCop from "@/components/KYC/corporate/AddressCop";
import styles from "../../kyc.module.css";

export const metadata = () => {
  return {
    title: "Address - KYC | Passpoint Go",
    description: "",
  };
};
const Address = () => {
  return <AddressCop styles={styles} />;
};

export default Address;
