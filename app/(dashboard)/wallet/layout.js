import AccessLayout from "@/components/Layouts/AccessLayout"
export const metadata = () => {
  return {
    title: "Wallet | Passpoint Go",
    description: "",
  };
};
const WalletLayout = ({children}) => {
	return (
		<AccessLayout>
			{children}
		</AccessLayout>
	)
}

export default WalletLayout
