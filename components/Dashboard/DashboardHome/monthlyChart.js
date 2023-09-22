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
      data: [
        7500, 6000, 9000, 12500, 16500, 18500, 11000, 5000, 6500, 10000, 8000,
        9500,
      ],
      backgroundColor: "#789DFB",
      borderColor: "#789DFB",
      barThickness: 50,
      borderRadius: 3,
      tension: 0.4,
    },
  ],
};

export function MonthlyChart() {
  return (
    <main className={styles.dashMonthChart}>
      <div className={styles.content}>
        <h3>Month on Month Revenue</h3>
        <h3>
          £12,283 <span>-8.39%</span>
        </h3>
      </div>
      <div>
        <Line options={options} height={182} data={data} />
      </div>
    </main>
  );
}
