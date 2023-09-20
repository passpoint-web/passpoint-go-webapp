"use client";
import styles from "../../assets/styles/dashboardLayout.module.css";
import KycCard from "@/components/Dashboard/DashboardHome/kycCard";
import MetricCard from "@/components/Dashboard/DashboardHome/metricCard";
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
    </main>
  );
}
