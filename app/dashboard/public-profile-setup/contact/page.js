import ContactPage from "@/components/PublicProfile/SetupPages/ContactPage";
import styles from "../public-profile.module.css";

export const metadata = () => {
  return {
    title: "Contact - Setup Public Profile | Passpoint Go",
    description: "",
  };
};

const Contact = () => {
  return <ContactPage styles={styles} />;
};

export default Contact;
