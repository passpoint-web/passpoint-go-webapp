'use client'
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";
import Logo from "@/components/PasspointLogo";
import { sidebarData } from "@/constants/general";
import Link from "next/link";

const DashboardSidebar = () => {
	const pathname = usePathname();

	return (
		<div className={styles.dashSide_main}>
			<div className={styles.logo}>
				<Logo href='/dashboard' />
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
