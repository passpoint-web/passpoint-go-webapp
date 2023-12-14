"use client";
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

export function InflowOutflowChart({ styles }) {
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
				label: "inflow",
				data: dataValues,
				backgroundColor: "#009EC4",
				borderColor: "rgba(0,0,0,0)",
				borderWidth: 1,
				barThickness: 9,
				borderRadius: 2,
			},
			{
				label: "outflow",
				data: dataValues,
				backgroundColor: "#FF3B2D",
				borderColor: "rgba(0,0,0,0)",
				borderWidth: 1,
				barThickness: 9,
				borderRadius: 2,
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
		<main className={styles.inOutFlow}>
			<div className={styles.inOutFlow_content}>
				<h3>Inflow vs Outflow</h3>
				<div className={styles.inOutFlow_label}>
					<article>
						<small></small>
						<p>Inflow</p>
					</article>
					<article>
						<small></small>
						<p>Outflow</p>
					</article>
				</div>
			</div>
			<div>
				<Bar options={options}
					data={data}
					height={275} />
			</div>
		</main>
	);
}
