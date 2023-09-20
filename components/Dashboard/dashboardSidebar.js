import { usePathname } from "next/navigation";
import styles from "../../assets/styles/dashboardLayout.module.css";
import Logo from "../Logo";
import { sidebarData } from "@/constants/general";
import Link from "next/link";

const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <div className={styles.dashSide_main}>
      <i>
        <Logo />
      </i>
      <nav>
        {sidebarData.map((item, index) => (
          <Link href={item.path} key={index} legacyBehavior>
            <a
              className={`${styles.dashSide_link} ${
                pathname === item.path && styles.dashSide_active
              }`}
            >
              <item.icon />
              {item.title}
            </a>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default DashboardSidebar;
