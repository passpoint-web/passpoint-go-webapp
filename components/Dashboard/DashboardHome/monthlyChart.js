import styles from "../../../assets/styles/dashboard-layout.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { metrics } from "@/services/restService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

var options = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    x: {
      grid: {
        display: true,
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
        color: "#D9D9D9",
      },
      max: 25000,
      min: 5000,
      ticks: {
        font: {
          size: 10,
          family: "GraphikRegular",
        },
        color: "#A0AEC0",
        beginAtZero: false,
        stepSize: 5000,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

export function MonthlyChart() {
  const [chartData, setChartData] = useState({});
  const dataValues = chartData?.reveuneList
    ? Object.values(chartData.reveuneList)
    : [];
  var data = {
    labels: [
      "Jan",
      "Feb",
      " Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: dataValues,
        backgroundColor: "#789DFB",
        borderColor: "#789DFB",
        barThickness: 50,
        borderRadius: 3,
        tension: 0.4,
      },
    ],
  };
  console.log(chartData);
  const getMetrics = async () => {
    try {
      const response = await metrics();
      console.log(response);
      setChartData(response.data.monthlyReveune);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMetrics();
  }, []);
  return (
    <main className={styles.dashMonthChart}>
      <div className={styles.content}>
        <h3>Month on Month Revenue</h3>
        {chartData.totalMonthlyReveune !== undefined && (
          <h3>
            {`£${chartData.totalMonthlyReveune}`} <span>-8.39%</span>
          </h3>
        )}
      </div>
      <div>
        <Line options={options} height={182} data={data} />
      </div>
    </main>
  );
}
