// eslint-disable-next-line no-unused-vars
import { DropDownIconDark, PlusIcon } from "@/constants/icons";
import styles from "@/assets/styles/dashboard-layout.module.css";
import ProfileImage from "@/assets/images/dashboard/avatar.svg";
import Link from "next/link";
import Image from "next/image";
import { getCredentials, removeToken } from "@/services/localService";
import { useEffect, useState } from "react";
import OverlayScreen from "../OverlayScreen";
import { menuItems } from "@/constants/general";
import { useRouter } from "next/navigation";

const DashboardHeader = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [savedCredentials, setSavedCredentials] = useState();
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push("/auth/login");
  };

  const hideSelect = () => {
    window.setTimeout(() => {
      setShowDropDown(false);
    }, 200);
  };

  useEffect(() => {
    setSavedCredentials(getCredentials());
  }, []);

  const items = menuItems(handleLogout);
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
          <div className={styles.headerDropdown}>
            {items.map((item, index) => (
              <div key={index}>
                {item.type === "link" ? (
                  <Link href={item.href}>
                    {item.icon} {item.label}
                  </Link>
                ) : (
                  <button onClick={item.onClick}>
                    {item.icon} {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* {showDropDown ? <OverlayScreen onClick={hideSelect} /> : <></>} */}
      </div>
    </div>
  );
};

export default DashboardHeader;
