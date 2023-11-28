'use client'
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";
import { sidebarData } from "@/constants/general";
import Link from "next/link";

const DashboardSidebar = () => {
  const pathname = usePathname()

	return (
		<div className={styles.dashSide_main}>
			<nav>
				{sidebarData.map((item, index) => (
					<Link
						href={item.path}
						key={index}
						className={`${styles.dashSide_link} ${
							pathname.includes(item.path) ? styles.dashSide_active : ''
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

export default DashboardSidebar
