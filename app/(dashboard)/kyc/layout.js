import LayoutLogic from "@/components/KYC/LayoutLogic";
export const metadata = () => {
	return {
		title: "KYC | Passpoint Go",
		description: "",
	};
};
const KYCLayout = ({ children }) => {
	return (
		<LayoutLogic>
			{children}
		</LayoutLogic>
	);
};

export default KYCLayout;
