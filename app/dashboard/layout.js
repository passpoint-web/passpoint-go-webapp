'use client'
import DashboardHeader from '@/components/Dashboard/DashboardHeader'
import DashboardSidebar from '@/components/Dashboard/DashboardSidebar'
import styles from '@/assets/styles/dashboard-layout.module.css'
export default function DashboardLayout({ children }) {
	return (
		<div className={styles.dashLayout}>
			<aside>
				<DashboardSidebar />
			</aside>
			<div className={styles.dash_children}>
				<DashboardHeader />
				<main className={styles.dash_outlet}>{children}</main>
			</div>
		</div>
	)
}
