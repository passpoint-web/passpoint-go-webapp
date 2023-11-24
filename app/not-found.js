"use client";
import DashboardHeader from "@/components/Dashboard/Header";
import styles from "@/assets/styles/dashboard-layout.module.css";
import Error from "../assets/images/dashboard/error.svg";
import Image from "next/image";
import PrimaryLink from "@/components/Link/Primary";
const NotFound = () => {
  return (
    <main className={styles.errorPage}>
      <DashboardHeader styles={styles} />
      <section className={styles.errorPage_main}>
        <div className={styles.errorPage_content}>
          <Image src={Error} alt="error" />
          <h1>Oops! You've Hit a Roadblock</h1>
          <p>
            Looks like you took a wrong turn or the page you're looking for is
            on vacation.
          </p>
          <div className={styles.errorPage_link}>
            <PrimaryLink text="Back to Home" href="/" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
