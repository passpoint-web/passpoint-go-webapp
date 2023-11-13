import ContactPage from "@/components/BusinessProfile/SetupPages/ContactPage";
import styles from "../business-profile.module.css";

export const metadata = () => {
  return {
    title: "Contact - Setup Business Profile | Passpoint Go",
    description: "",
  };
};

const Contact = () => {
  return <ContactPage styles={styles} />;
};

export default Contact;
