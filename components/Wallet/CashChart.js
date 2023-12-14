"use client";
import { Inflow, Outflow } from "@/constants/icons";
import CustomSelect from "../Custom/Select";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
	responsive: true,
	maintainAspectRatio: true,
	plugins: {
		legend: {
			display: false,
		},
	},
};

const data = {
	labels: ["#009EC4", "#FF3B2D"],
	datasets: [
		{
			label: "# of Votes",
			data: [12, 19],
			backgroundColor: ["#009EC4", "#FF3B2D"],
			borderColor: [],
			borderWidth: 0,
			radius: 80,
			cutout: "80%",
		},
	],
};

const timeData = [
	{
		label: "Daily",
		amount: "₦1,200,000",
	},
	{
		label: "Weekly",
		amount: "₦7,422,453",
	},
	{
		label: "Monthly",
		amount: "₦24,850,530",
	},
];

const CashChart = ({ styles }) => {
	return (
		<div className={styles.cashChart}>
			<h3>Cash Flow</h3>
			<section className={styles.cashChart_time}>
				{timeData.map((time, i) => (
					<div key={i}>
						<small>{time.label}</small>
						<p>{time.amount}</p>
					</div>
				))}
			</section>
			<section className={styles.cashChart_select}>
				<CustomSelect
					id="status-type"
					selectOptions={["Confirmed", "Pending", "Failed"]}
					selectedOption={""}
					placeholder="Last Month"
				/>
			</section>
			<section className={styles.cashChart_chartjs}>
				<article className={styles.cashChart_inflow}>
					<Inflow />
					<div>
						<small>Inflow</small>
						<p>₦10,224,568</p>
					</div>
				</article>
				<div className={styles.CashChart_dougnut}>
					<Doughnut options={options}
						data={data} />
					<article>
						<small>Total Cashflow</small>
						<p>₦24,850,530</p>
					</article>
				</div>
				<article className={styles.cashChart_outflow}>
					<Outflow />
					<div>
						<small>Outflow</small>
						<p>₦14,624,221</p>
					</div>
				</article>
			</section>
		</div>
	);
};

export default CashChart;
