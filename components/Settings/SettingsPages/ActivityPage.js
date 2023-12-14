"use client";
import styles from "@/components/Settings/settings.module.css";
import { accountProfile } from "@/services/restService";
import { useNotify } from "@/utils/hooks";
import { useEffect, useState } from "react";

const Activity = () => {
	const notify = useNotify();
	const [loading, setLoading] = useState(true);
	const [activities, setActivies] = useState([]);

	const getActivities = async () => {
		try {
			const response = await accountProfile.getAccountActivity();
			setActivies(response.data.data);
		} catch (error) {
			notify("error", "Could not retrieve account actiavities");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getActivities();
	}, []);

	return (
		<div className={styles.activity_page}>
			<h1>Account Activity</h1>
			<div className={styles.border_box}>
				{loading ? (
					<>
						<table className={styles.table}>
							<thead>
								<tr className={styles.table_header}>
									<td className={styles.td_3}>
										<div className={styles.th_content}>Date & time</div>
									</td>
									<td className={styles.td_3}>
										<div className={styles.th_content}>Activity</div>
									</td>
								</tr>
							</thead>
						</table>

						{Array(4)
							.fill(undefined)
							.map((item, i) => (
								<SkeletonLoader {...item}
									key={i} />
							))}
					</>
				) : (
					<table className={styles.table}>
						<thead>
							<tr className={styles.table_header}>
								<td className={styles.td_3}>
									<div className={styles.th_content}>Date & time</div>
								</td>
								<td className={styles.td_3}>
									<div className={styles.th_content}>Activity</div>
								</td>
							</tr>
						</thead>
						<tbody>
							{activities?.map((a, id) => (
								<tr key={id}
									className={styles.table_row}>
									<td className={styles.td_3}>
										<div className={styles.td_content}>{a.date}</div>
									</td>
									<td className={styles.td_3}>
										<div className={styles.td_content}>{a.title}</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};

export default Activity;


const SkeletonLoader = () => {
	return (
		<div className={styles.skeletonLoader}>
			<div className={styles.line}></div>
		</div>
	);
};
