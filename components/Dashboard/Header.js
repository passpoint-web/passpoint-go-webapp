"use client";
import { DropDownIconDark, PlusIcon } from "@/constants/icons";
import ProfileImage from "@/assets/images/dashboard/avatar.svg";
import Link from "next/link";
import Image from "next/image";
import { getCredentials, removeToken } from "@/services/localService";
import { useEffect, useState } from "react";
import OverlayScreen from "../OverlayScreen";
import { menuItems } from "@/constants/general";
import { useRouter } from "next/navigation";

const DashboardHeader = ({ setOpenNotify, styles }) => {
	const [showDropDown, setShowDropDown] = useState(false);
	const [savedCredentials, setSavedCredentials] = useState();
	const { push } = useRouter();

	const handleLogout = () => {
		removeToken();
		push("/auth/login");
	};

	const hideSelect = () => {
		window.setTimeout(() => {
			setShowDropDown(false);
		}, 200);
	};

	useEffect(() => {
		setSavedCredentials(getCredentials());
	}, []);

	const items = menuItems(handleLogout, setOpenNotify);
	return (
		<div className={styles.dashHeader_main}>
			<button className={styles.generate}>
				<PlusIcon />
        Generate Storefront
			</button>

			<div
				className={styles.dashHeader_profile}
				onClick={() => setShowDropDown(!showDropDown)}
			>
				<Image src={ProfileImage} alt="avatar" />
				<h3>{savedCredentials?.businessName}</h3>
				<i className={showDropDown ? styles.dropIcon : styles.openIcon}>
					<DropDownIconDark />
				</i>

				{showDropDown && (
					<div className={`${styles.headerDropdown} dropdown`}>
						{items.map((item, index) => (
							<div key={index}>
								{item.type === "link" ? (
									<Link href={item.href}>
										{item.icon} {item.label}
									</Link>
								) : (
									<button className={styles[item.label.toLowerCase().replaceAll(' ', '_')]} onClick={item.onClick}>
										{item.icon} {item.label}
									</button>
								)}
							</div>
						))}
					</div>
				)}
				{showDropDown ? <OverlayScreen onClick={hideSelect} /> : <></>}
			</div>
		</div>
	);
};

export default DashboardHeader;
