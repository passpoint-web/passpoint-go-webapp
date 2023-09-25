"use client";
import PublicProfileCard from "@/components/Dashboard/DashboardHome/PublicProfileCard";
import styles from "../../assets/styles/dashboard-layout.module.css";
import KycCard from "@/components/Dashboard/DashboardHome/KycCard";
import MetricCard from "@/components/Dashboard/DashboardHome/MetricCard";
import { MonthlyChart } from "@/components/Dashboard/DashboardHome/MonthlyChart";
import { CustomerChart } from "@/components/Dashboard/DashboardHome/CustomerChart";

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
