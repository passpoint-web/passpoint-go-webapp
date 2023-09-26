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

ChartJS.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  BarElement,
  Legend,
  Title
);

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
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
      data: [60, 105, 150, 100, 90, 135, 130, 90, 55, 85, 88, 130],
      backgroundColor: "#1B59F8",
      borderColor: "#1B59F8",
      barThickness: 11.3,
    },
  ],
};

const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    title: {
      display: false,
      text: "Chart.js Bar Chart - Stacked",
    },
    legend: {
      display: false,
    },
  },
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
        stepSize: 50,
      },
    },
  },
};

export function CustomerChart() {
  return (
    <main className={styles.dashCustomerCahrt}>
      <div className={styles.content}>
        <h3>Customer Growth</h3>
        <h3>
          1000 <span>+33.39%</span>
        </h3>
      </div>
      <div>
        <Bar options={options}
height={182}
data={data} />
      </div>
    </main>
  );
}
