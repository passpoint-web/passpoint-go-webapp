import BalanceCard from "./BalanceCard";
// import CashChart from "./CashChart";
// import { InflowOutflowChart } from "./InflowOutflowChart";
import VirtualAccountCard from "./VirtualAccountCard";
import WalletTable from "./WalletTable";
import styles from "./wallet.module.css";
const Wallet = () => {
	return (
		<div className={styles.wallet_page}>
			<div className={styles.top}>
				<BalanceCard styles={styles} />
				<VirtualAccountCard styles={styles} />
			</div>
			{/* <div className={styles.wallet_chart}>
				<section className={styles.chart_1}>
					<CashChart styles={styles} />
				</section>
				<section className={styles.chart_2}>
					<InflowOutflowChart styles={styles} />
				</section>
			</div> */}
			<div className={styles.bottom}>
				<WalletTable styles={styles} />
			</div>
		</div>
	)
}
export default Wallet;
