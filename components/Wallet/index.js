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
// eslint-disable-next-line no-unused-vars
import { saveWalletState, getWalletState } from "@/services/localService";

const Wallet = () => {
	const [walletState, setWalletState] = useState('created') // no-wallet, pending, created
	const [walletDetails, setWalletDetails] = useState({})
	const [walletAccount, setWalletAccount] = useState({})
	const [dataLoading, setDataLoading] = useState(true)
	const [updateKey, setUpdateKey] = useState(new Date().getTime())
	const [showPendingModal, setShowPendingModal] = useState(true)

	const getWallet = async (loading) => {
		setDataLoading(loading)
		try {
			const response = await wallet.getWalletDetails()
			const {data} = response.data
			setWalletDetails(data)
			setWalletAccount(data.walletAccount['NGN'])
			// eslint-disable-next-line no-unused-vars
			const {accountNumber} = data.walletAccount['NGN']
			if (accountNumber) {
				setWalletState('created')
				// saveWalletState('created')
			}else if (!accountNumber) {
				setWalletState('pending')
				// saveWalletState('pending')
				setShowPendingModal(true)
			}
		} catch (_err) {
			console.log(_err)
		} finally {
			setDataLoading(false)
		}
	}

	const updateWalletState = () => {
		console.log('updated')
		setUpdateKey(new Date().getTime())
		getWallet(false)
	}
	
	useEffect(()=>{
		console.log(updateKey)
		getWallet(false)
	},[updateKey])

	useEffect(()=>{
		// setWalletState(getWalletState())
		getWallet(true)
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
							updateWalletState={()=>updateWalletState(true)}
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
							updateKey={updateKey}
							styles={styles} />
					</div>
				</> :
				<CreateWallet wallet={wallet} styles={styles} />
			}
		</div>
	)
}
export default Wallet;
