"use client";
import DashboardHeader from "@/components/Dashboard/Header";
import DashboardSidebar from "@/components/Dashboard/Sidebar";
import styles from "@/assets/styles/dashboard-layout.module.css";
import Notification from "@/components/Notification/Notification";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [openNotify, setOpenNotify] = useState(false);
  return (
    <div className={styles.dashLayout}>
      <aside>
        <DashboardSidebar />
      </aside>
      <div className={styles.dash_children}>
        <DashboardHeader setOpenNotify={setOpenNotify} />
        <main className={styles.dash_outlet}>{children}</main>
      </div>
      <Notification setOpenNotify={setOpenNotify} openNotify={openNotify} />
    </div>
  );
}
