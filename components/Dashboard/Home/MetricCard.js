"use client";
import { useState, useEffect } from "react";
import styles from "../../../assets/styles/dashboard-layout.module.css";
import { metrics } from "@/services/restService";
import { Metric1, Metric2, Metric3, Metric4 } from "@/constants/icons";
import functions from "@/utils/functions";
const { makeNumArr, formatMoney, formatNumber } = functions;
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
      sym: "%",
      value: data.bookingConversion,
    },
    {
      title: "Completed Bookings",
      icon: Metric3,
      value: data.completedBookings,
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
        makeNumArr(4).map((_, i) => (
          <div
            key={i}
            className={`${styles.dashMetric_content} skeleton`}
            style={{ borderRadius: "16px", height: "94px", boxShadow: "none" }}
          />
        ))
      ) : (
        <>
          <div className={styles.dashMetric_content}>
            <Metric1 />
            <div>
              <p>{metricData[0].title}</p>
              <span>{formatMoney(metricData[0].value, "NGN")}</span>
            </div>
          </div>
          <div className={styles.dashMetric_content}>
            <Metric2 />
            <div>
              <p>{metricData[1].title}</p>
              <span>{formatNumber(metricData[1].value)}%</span>
            </div>
          </div>
          <div className={styles.dashMetric_content}>
            <Metric3 />
            <div>
              <p>{metricData[2].title}</p>
              <span>{formatNumber(metricData[2].value)}%</span>
            </div>
          </div>
          <div className={styles.dashMetric_content}>
            <Metric4 />
            <div>
              <p>{metricData[3].title}</p>
              <span>{formatNumber(metricData[3].value)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MetricCard;
