'use client'
import ActionFeedbackCard from "../ActionFeedbackCard";
import FullScreenLoader from "../Modal/FullScreenLoader";
import ModalWrapper from "../Modal/ModalWrapper";
import BalanceCard from "./BalanceCard";
import CreateWallet from "./CreateWallet";
// import CashChart from "./CashChart";
// import { InflowOutflowChart } from "./InflowOutflowChart";
// import VirtualAccountCard from "./VirtualAccountCard";
import WalletTable from "./WalletTable";
import styles from "./wallet.module.css";
import { wallet } from '@/services/restService/wallet'
import { useState, useEffect } from "react";

const Wallet = () => {
	const [walletState, setWalletState] = useState('') // no-wallet, pending, created
	const [walletDetails, setWalletDetails] = useState({})
	const [walletAccount, setWalletAccount] = useState({})
	const [dataLoading, setDataLoading] = useState(true)
	const [showPendingModal, setShowPendingModal] = useState(true)

	const getWallet = async () => {
		try {
			const response = await wallet.getWalletDetails()
			const {data} = response.data
			// console.log(data.walletAccount['NGN'])
			setWalletDetails(data)
			setWalletAccount(data.walletAccount['NGN'])
			// eslint-disable-next-line no-unused-vars
			const {vaCreated} = data
			const {accountNumber} = data.walletAccount['NGN']
			if (accountNumber) {
				setWalletState('created')
			}else if (!accountNumber) {
				setWalletState('pending')
				setShowPendingModal(true)
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

	const WalletProcessingModal = () => (
		<ModalWrapper bottomCancelNeeded={false} ctaBtnText="Go Home" handleCta={()=>setShowPendingModal(false)} ctaBtnType="sd">
			<ActionFeedbackCard
				content={{
					title: 'Wallet Creation is Processing',
					value: 'Please check back in few minutes',
					status: 'pending',
				}}
			/>
		</ModalWrapper>
	)
	return (
		<div className={styles.wallet_page}>
			{dataLoading ? <FullScreenLoader /> : <></>}
			{walletState === 'pending' && showPendingModal ? <WalletProcessingModal /> : <></>}
			{walletState === 'created' ?
				<>
					<div className={styles.top}>
						<BalanceCard wallet={wallet}
							dataLoading={dataLoading}
							walletDetails={walletDetails}
							walletAccount={walletAccount}
							styles={styles} />
						{/* <VirtualAccountCard styles={styles} /> */}
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
