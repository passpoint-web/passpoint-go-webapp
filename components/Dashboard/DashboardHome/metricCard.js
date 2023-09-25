"use client";
import { useState, useEffect } from "react";
import styles from "../../../assets/styles/dashboard-layout.module.css";
import { metrics } from "@/services/restService";
import { Metric1, Metric2, Metric3, Metric4 } from "@/constants/icons";

const MetricCard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    totalReveune: 0,
    bookingConversion: 0,
    completedBookings: 0,
    totalVists: 0,
  });

  const getMetrics = async () => {
    try {
      const response = await metrics();
      setData(response.data.metrics);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMetrics();
  }, []);

  const metricData = [
    {
      title: "Total Revenue",
      icon: Metric1,
      value: data.totalReveune,
    },
    {
      title: "Booking Conversion Rate",
      icon: Metric2,
      value: data.bookingConversion,
    },
    {
      title: "Completed Bookings",
      icon: Metric3,
      value: `${data.completedBookings}%`,
    },
    {
      title: "Total Visits",
      icon: Metric4,
      value: data.totalVists,
    },
  ];

  return (
    <div className={styles.dashMetric}>
      {loading ? (
        <h2>Loading...</h2> // You can replace this with your loading indicator
      ) : (
        metricData.map((item, i) => (
          <div key={i} className={styles.dashMetric_content}>
            <item.icon />
            <div>
              <p>{item.title}</p>
              <span>{item.value}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MetricCard;
