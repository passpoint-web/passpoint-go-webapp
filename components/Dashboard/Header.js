"use client";
import Logo from "@/components/PasspointLogo";
import { DropDownIconDark } from "@/constants/icons";
import ProfileImage from "@/assets/images/dashboard/avatar.svg";
import Link from "next/link";
import Image from "next/image";
import { setLogout } from "@/services/localService";
import { useState } from "react";
import OverlayScreen from "../OverlayScreen";
import { menuItems } from "@/constants/general";
import { useRouter } from "next/navigation";
import ModalWrapper from "../Modal/ModalWrapper";

const DashboardHeader = ({ setOpenNotify, styles, user }) => {
	const [showDropDown, setShowDropDown] = useState(false);
	const [logoutModal, setLogoutModal] = useState(false);
	const { push } = useRouter();

  const handleLogout = () => {
    setLogout();
    push("/auth/login");
  };
  const handleLogoutModal = () => {
		setLogoutModal(true)
  };

  const hideSelect = () => {
    window.setTimeout(() => {
      setShowDropDown(false);
    }, 200);
  };

	const items = menuItems(handleLogoutModal, setOpenNotify);
	return (
		<>
		{logoutModal ?
			<ModalWrapper 
			heading='You are attempting to log out'
			onClose={()=>setLogoutModal(false)} 
			handleCta={handleLogout} 
			subHeading='Are you sure you want to logout now or there’s more to do?' 
			ctaBtnText="Logout" 
			cancelBtnText="Go Back"
			ctaBtnColor='#ff3b2d' />
			: <></>
		}
		<div className={styles.dashHeader_main}>
			<div className={styles.logo}>
				<Logo href='/dashboard' />
			</div>
			{/* <button className={styles.generate}>
				<PlusIcon />
        Generate Storefront
      </button> */}
			<div
				className={styles.dashHeader_profile}
				onClick={() => setShowDropDown(!showDropDown)}
			>
				<Image src={ProfileImage} alt="avatar" />
				<h3>{user?.businessName}</h3>
				<i className={showDropDown ? styles.dropIcon : styles.openIcon}>
					<DropDownIconDark />
				</i>

				{showDropDown ? <OverlayScreen zIndex={true} onClick={hideSelect} /> : <></>}
				{showDropDown ? (
					<div className={`${styles.headerDropdown} dropdown`}>
						{items.map((item, index) => (
							<div key={index}>
                {styles[item.label]}
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
				):<></>}
			</div>
		</div></>
	);
};

export default DashboardHeader;
