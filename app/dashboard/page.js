// "use client";
import PublicProfileCard from "@/components/Dashboard/Home/PublicProfileCard";
import styles from "@/assets/styles/dashboard-layout.module.css";
import { MonthlyChart } from "@/components/Dashboard/Home/MonthlyChart";
import KycCard from "@/components/Dashboard/Home/KycCard";
import { CustomerChart } from "@/components/Dashboard/Home/CustomerChart";
import MetricCard from "@/components/Dashboard/Home/MetricCard";
export const metadata = {
	title: 'Dashboard | Passpoint Go',
	description: '',
}
export default function Dashboard() {
	return (
		<main className={styles.dashboard}>
			<section className={styles.dashboard_public}>
				<PublicProfileCard />
				<KycCard />
			</section>
			<section>
				<MetricCard />
			</section>
			<section className={styles.dashboard_chart}>
				<MonthlyChart />
				<CustomerChart />
			</section>
		</main>
	);
}
