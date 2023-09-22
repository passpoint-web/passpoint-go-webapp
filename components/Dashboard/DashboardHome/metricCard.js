import styles from "../../../assets/styles/dashboard-layout.module.css";
import { metricData } from "@/constants/general";

const MetricCard = () => {
  return (
    <div className={styles.dashMetric}>
      {metricData.map((item, i) => (
        <div key={i} className={styles.dashMetric_content}>
          <item.icon />
          <div>
            <p>{item.title}</p>
            <span>{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricCard;
