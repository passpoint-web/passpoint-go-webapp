import styles from "../../../assets/styles/dashboard-layout.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { metrics } from "@/services/restService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  BarElement,
  Legend,
  Title
);

const options = {
  maintainAspectRatio: false,
  responsive: true,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 10,
          family: "GraphikRegular",
        },
        color: "#A0AEC0",
      },
    },
    y: {
      grid: {
        lineType: "dash",
        color: "#F2F4F6",
      },
      ticks: {
        font: {
          size: 10,
          family: "GraphikRegular",
        },
        color: "#A0AEC0",
        stepSize: 100,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

export function CustomerChart() {
  const [chartData, setChartData] = useState({});
  const dataValues = chartData?.growthList
    ? Object.values(chartData.growthList)
    : [];

  const normalMonthsOrder = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = {
    labels: normalMonthsOrder,
    datasets: [
      {
        data: dataValues,
        backgroundColor: "#1B59F8",
        borderColor: "#1B59F8",
        barThickness: 11.3,
      },
    ],
  };

  const getMetrics = async () => {
    try {
      const response = await metrics();
      setChartData(response.data.customerGrowth);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMetrics();
  }, []);

  return (
    <main className={styles.dashCustomerCahrt}>
      <div className={styles.content}>
        <h3>Customer Growth</h3>
        {chartData.totalCustomer !== undefined && (
          <h3>
            {chartData.totalCustomer}{" "}
            <span
              style={{
                color: chartData.percentageGrowth >= 0 ? "#66cb9f" : "#ff3b2d",
              }}
            >
              {chartData.percentageGrowth >= 0
                ? `+${chartData.percentageGrowth}`
                : `${chartData.percentageGrowth}`}
            </span>
          </h3>
        )}
      </div>
      <div>
        <Bar options={options} height={182} data={data} />
      </div>
    </main>
  );
}
