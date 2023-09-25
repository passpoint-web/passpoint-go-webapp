import { usePathname } from "next/navigation";
import styles from "../../assets/styles/dashboard-layout.module.css";
import Logo from "../Logo";
import { sidebarData } from "@/constants/general";
import Link from "next/link";

const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <div className={styles.dashSide_main}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <nav>
        {sidebarData.map((item, index) => (
          <Link
            href={item.path}
            key={index}
            className={`${styles.dashSide_link} ${
              pathname === item.path && styles.dashSide_active
            }`}
          >
            <item.icon />
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default DashboardSidebar;
