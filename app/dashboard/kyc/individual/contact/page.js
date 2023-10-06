import ContactInd from "@/components/KYC/individual/ContactInd";
import styles from "../../kyc.module.css";

export const metadata = () => {
  return {
    title: "Contact - KYC | Passpoint Go",
    description: "",
  };
};
const Contact = () => {
  return <ContactInd styles={styles} />;
};

export default Contact;
