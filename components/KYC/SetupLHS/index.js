"use client";
import { usePathname } from "next/navigation";
import FormLevel from "../../FormLevel/FormLevel";
import { useEffect, useState } from "react";
// import BackBtn from "@/components/Btn/Back";
import styles from '@/app/(dashboard)/kyc/kyc.module.css'
// import formLevelStyles from '../kyc-lhs.module.css'
import { getCredentials, getKycDetails } from "@/services/localService";

const KycSetupLHS = () => {
	const pathname = usePathname();
	// const { push } = useRouter();
	const user = getCredentials();

	const [levelsToDisplay, setLevelsToDisplay] = useState([]);
	const [kycDetailsState, setKycDetailsState] = useState({});

	const individualKycLevel = [
		// Not needed for MVP
		// {
		//   title: "Contact Information",
		//   sub_title: "Please provide essential details about your business.",
		//   active: pathname === "/kyc/individual/contact",
		//   completed: false,
		// },
		{
			title: "Proof Of Identity",
			sub_title:
        "Verify your identity to ensure a secure and trusted experience.",
			active: pathname === "/kyc/individual/identity",
			completed: kycDetailsState?.KycStage > 0,
		},
		{
			title: "Proof of Address",
			sub_title: "Verify your current address for accurate communication.",
			active: pathname === "/kyc/individual/address",
			completed: kycDetailsState?.isCompleted,
		},
	];

	const corporateKycLevel = [
		// Not needed for MVP
		{
			title: "Business Information",
			sub_title: "Please provide essential details about your business.",
			active: pathname === "/kyc/corporate/business",
			completed: kycDetailsState?.KycStage > 0,
		},
		{
			title: "Proof Of Identity",
			sub_title:
        "Verify your identity to ensure a secure and trusted experience.",
			active: pathname === "/kyc/corporate/identity",
			completed: kycDetailsState?.KycStage > 1,
		},
		{
			title: "Proof of Address",
			sub_title: "Verify your current address for accurate communication.",
			active: pathname === "/kyc/corporate/address",
			completed: kycDetailsState?.isCompleted,
		},
		// Not needed for MVP
		// {
		//   title: "Proof of Ownership",
		//   sub_title: "Demonstrate your ownership of relevant assets or properties.",
		//   active: pathname === "/kyc/corporate/ownership",
		//   completed: false,
		// },
	];

	useEffect(() => {
		getKycDetails();
	}, []);

	useEffect(() => {
		const fetchedKycDetails = getKycDetails();
		const kycLevels =
      user?.userType === "1" ? individualKycLevel : corporateKycLevel;

		setKycDetailsState({
			...fetchedKycDetails,
			levels: kycLevels,
		});
	}, [pathname, user?.userType]);

	useEffect(() => {
		if (user?.userType === "1") {
			setLevelsToDisplay(individualKycLevel);
		} else {
			setLevelsToDisplay(corporateKycLevel);
		}
	}, [pathname, user?.userType]);
	return (
		<>
			<div className={styles.lhs_levels_ctn}>
				<section className={styles.lhs_kyc}>
					<div className={styles.top}>
						<h1>Complete KYC</h1>
						<p>We want to know more about you and your business</p>
					</div>
					<div className={styles.levels}>
						{levelsToDisplay.map((e, index) => (
							<FormLevel
								key={index}
								w1000={true}
								auth={{ ...e, level: index + 1 }}
							/>
						))}
					</div>
				</section>
			</div>
		</>
	);
};

export default KycSetupLHS;
