import styles from "../../kyc.module.css";
import Identity from "@/components/KYC/corporate/Identity";
export const metadata = () => {
	return {
		title: "Identity - KYC | Passpoint Go",
		description: "",
	};
};

const IdentityPage = () => {
	return <Identity styles={styles} />;
};

export default IdentityPage;
