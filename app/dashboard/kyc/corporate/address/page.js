import Address from "@/components/KYC/corporate/Address";
import styles from "../../kyc.module.css";

export const metadata = () => {
	return {
		title: "Address - KYC | Passpoint Go",
		description: "",
	};
};
const AddressPage = () => {
	return <Address styles={styles} />;
};

export default AddressPage;
