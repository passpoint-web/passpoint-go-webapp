"use client";
import { usePathname } from "next/navigation";
import FormLevel from "../../FormLevel";
import { useEffect, useState } from "react";
// import BackBtn from "@/components/Btn/Back";
import styles from "@/app/dashboard/business-profile-setup/business-profile.module.css";
import { getCredentials } from "@/services/localService";

const KycSetupLHS = () => {
	const pathname = usePathname();
	// const { push } = useRouter();
	const user = getCredentials();

	const [levelsToDisplay, setLevelsToDisplay] = useState([]);

	const individualKycLevel = [
		{
			title: "Contact Information",
			sub_title: "Please provide essential details about your business.",
			active: pathname === "/dashboard/kyc/individual/contact",
			completed: false,
		},
		{
			title: "Proof Of Identity",
			sub_title:
        "Verify your identity to ensure a secure and trusted experience.",
			active: pathname === "/dashboard/kyc/individual/identity",
			completed: false,
		},
		{
			title: "Proof of Address",
			sub_title: "Verify your current address for accurate communication.",
			active: pathname === "/dashboard/kyc/individual/address",
			completed: false,
		},
	];

	const corporateKycLevel = [
		{
			title: "Business Information",
			sub_title: "Please provide essential details about your business.",
			active: pathname === "/dashboard/kyc/corporate/business",
			completed: false,
		},
		{
			title: "Proof Of Identity",
			sub_title:
        "Verify your identity to ensure a secure and trusted experience.",
			active: pathname === "/dashboard/kyc/corporate/identity",
			completed: false,
		},
		{
			title: "Proof of Address",
			sub_title: "Verify your current address for accurate communication.",
			active: pathname === "/dashboard/kyc/corporate/address",
			completed: false,
		},
		{
			title: "Proof of Ownership",
			sub_title: "Demonstrate your ownership of relevant assets or properties.",
			active: pathname === "/dashboard/kyc/corporate/ownership",
			completed: false,
		},
	];

	useEffect(() => {
		if (user?.userType === "1") {
			setLevelsToDisplay(individualKycLevel);
		} else {
			setLevelsToDisplay(corporateKycLevel);
		}
	}, [pathname, user?.userType]);
	return (
		<>
			{/* <BackBtn text="Back" onClick={() => push("/dashboard")} /> */}
			<div className={styles.lhs_levels_ctn}>
				<section className={styles.lhs_kyc}>
					<h1>Complete KYC</h1>
					<p>We want to know more about you and your business</p>
				</section>
				{levelsToDisplay.map((e, index) => (
					<FormLevel
						mobileWidth="1000"
						key={index}
						auth={{ ...e, level: index + 1 }}
					/>
				))}
			</div>
		</>
	);
};

export default KycSetupLHS;
