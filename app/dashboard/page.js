"use client";
import { CustomerChart } from "@/components/Dashboard/DashboardHome/customerChart";
import styles from "../../assets/styles/dashboard-layout.module.css";
import KycCard from "@/components/Dashboard/DashboardHome/kycCard";
import MetricCard from "@/components/Dashboard/DashboardHome/metricCard";
import { MonthlyChart } from "@/components/Dashboard/DashboardHome/monthlyChart";
import PublicProfileCard from "@/components/Dashboard/DashboardHome/publicProfileCard";

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
        <div>
          <MonthlyChart />
        </div>
        <div>
          <CustomerChart />
        </div>
      </section>
    </main>
  );
}
