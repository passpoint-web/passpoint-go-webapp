import styles from "../../kyc.module.css";
import Ownership from "@/components/KYC/corporate/Ownership";

export const metadata = () => {
	return {
		title: "Proof of Ownership - KYC-Corporate  | Passpoint Go",
		description: "",
	};
};
const OwnershipPage = () => {
	return <Ownership styles={styles} />;
};

export default OwnershipPage;
