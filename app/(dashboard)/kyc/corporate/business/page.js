import Business from "@/components/KYC/corporate/Business";
import styles from "../../kyc.module.css";
export const metadata = () => {
	return {
		title: "About Business - KYC | Passpoint Go",
		description: "",
	};
};

const BusinessPage = () => {
	return <Business styles={styles} />;
};

export default BusinessPage
