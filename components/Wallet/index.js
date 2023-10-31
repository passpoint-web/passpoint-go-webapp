'use client'
import FullScreenLoader from "../Modal/FullScreenLoader";
import BalanceCard from "./BalanceCard";
import CreateWallet from "./CreateWallet";
// import CashChart from "./CashChart";
// import { InflowOutflowChart } from "./InflowOutflowChart";
import VirtualAccountCard from "./VirtualAccountCard";
import WalletTable from "./WalletTable";
import styles from "./wallet.module.css";
import { wallet } from '@/services/restService/wallet'
import { useState, useEffect } from "react";

const Wallet = () => {
	const [walletCreated, setWalletCreated] = useState(false)
	const [walletDetails, setWalletDetails] = useState({})
	const [walletAccount, setWalletAccount] = useState({})
	const [dataLoading, setDataLoading] = useState(true)

	const getWallet = async () => {
		try {
			const response = await wallet.getWalletDetails()
			const {data} = response.data
			// console.log(data.walletAccount['NGN'])
			setWalletDetails(data)
			setWalletAccount(data.walletAccount['NGN'])
			const {accountNumber} = data.walletAccount['NGN']
			if (accountNumber) {
				setWalletCreated(true)
			}
		} catch (_err) {
			// console.log(_err)
		} finally {
			setDataLoading(false)
		}
	}
	useEffect(()=>{
		getWallet()
	},[])
	return (
		<div className={styles.wallet_page}>
			{dataLoading ? <FullScreenLoader /> : <></>}
			{walletCreated ?
				<>
					<div className={styles.top}>
						<BalanceCard wallet={wallet}
							dataLoading={dataLoading}
							walletDetails={walletDetails}
							walletAccount={walletAccount}
							styles={styles} />
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
						<WalletTable wallet={wallet}
							styles={styles} />
					</div>
				</> :
				<CreateWallet wallet={wallet} styles={styles} />
			}
		</div>
	)
}
export default Wallet;
