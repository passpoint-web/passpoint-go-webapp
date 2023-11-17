'use client'
import ActionFeedbackCard from "../ActionFeedbackCard";
import FullScreenLoader from "../Modal/FullScreenLoader";
import ModalWrapper from "../Modal/ModalWrapper";
import BalanceCard from "./BalanceCard";
import CreateWallet from "./CreateWallet";
import functions from "@/utils/functions";
// import CashChart from "./CashChart";
// import { InflowOutflowChart } from "./InflowOutflowChart";
// import VirtualAccountCard from "./VirtualAccountCard";
import WalletTable from "./WalletTable";
import styles from "./wallet.module.css";
import { wallet } from '@/services/restService/wallet'
import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { saveWalletState, getWalletState, saveBanks } from "@/services/localService";
// import RefreshBtn from "../Btn/RefreshBtn";

const Wallet = () => {
	const { sortAlphabetically } = functions;
	const [walletState, setWalletState] = useState('no-wallet') // no-wallet, pending, created
	const [walletDetails, setWalletDetails] = useState({})
	const [walletAccount, setWalletAccount] = useState({})
	const [dataLoading, setDataLoading] = useState(true)
	const [balanceLoading, setBalanceLoading] = useState(true)
	const [updateKey, setUpdateKey] = useState(new Date().getTime())
	const [updateBalanceKey, setUpdateBalanceKey] = useState(new Date().getTime())
	const [showPendingModal, setShowPendingModal] = useState(true)

	const getWallet = async (loading) => {
		setDataLoading(loading)
		setBalanceLoading(true)
		try {
			const response = await wallet.getWalletDetails()
			const {data} = response.data
			setWalletDetails(data)
			setWalletAccount(data.walletAccount['NGN'])
			// eslint-disable-next-line no-unused-vars
			if (Object.keys(data.walletAccount).length) {
				const accountNumber = data.walletAccount['NGN']?.accountNumber
			// console.log(data)
			// console.log(accountNumber)
			if (accountNumber) {
				// console.log('yo')
				setWalletState('created')
				// saveWalletState('created')
			}else if (!accountNumber) {
				setWalletState('pending')
				// saveWalletState('pending')
				setShowPendingModal(true)
			} else {
				setWalletState('no-wallet')
			}
			}
		} catch (_err) {
			console.log(_err)
		} finally {
			setDataLoading(false)
			setBalanceLoading(false)
		}
	}

	const getBanksAndCache = async() => {
		try {
			const response = await wallet.getBanks()
			const {data} = response.data
			if (data) {
				const sortedBanks = sortAlphabetically(data, 'name')
				saveBanks(sortedBanks)
			}
		} catch (_err) {
			// console.log(_err.response.data)
		} finally {
			//
		}
	}

	const updateWalletState = () => {
		setUpdateKey(new Date().getTime())
		getWallet(false)
	}

	const updateBalanceState = () => {
		setUpdateBalanceKey(new Date().getTime())
		getWallet(false)
	}
	
	useEffect(()=>{
		getWallet(false)
		getBanksAndCache()
	},[updateKey])

	useEffect(function refreshData () {
		const interval = setInterval(()=>{
			// if (!balanceLoading) {
				setUpdateKey(new Date().getTime())
			// }
		},45000)
		return () => clearInterval(interval);
	},[updateKey])

	useEffect(()=>{
		getWallet(false)
	},[updateBalanceKey])

	useEffect(()=>{
		// setWalletState(getWalletState())
		getWallet(true)
	},[])

	// useEffect(()=>{
		// console.log(walletState)
	// },[])

	const WalletProcessingModal = () => (
		<ModalWrapper 
		bottomCancelNeeded={false} 
		ctaBtnText="Go Home" 
		onClose={()=>setShowPendingModal(false)} 
		handleCta={()=>setShowPendingModal(false)} 
		ctaBtnType="sd">
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
							balanceLoading={balanceLoading}
							walletDetails={walletDetails}
							walletAccount={walletAccount}
							updateWalletState={()=>updateWalletState(true)}
							updateBalanceState={()=>updateBalanceState(true)}
							styles={styles} />
						{/* <VirtualAccountCard styles={styles} /> */}
						{/* <RefreshBtn text={'Refresh'} refreshing={balanceLoading} onClick={()=>updateWalletState()} /> */}
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
				(!dataLoading ? <CreateWallet wallet={wallet} styles={styles} /> : <></>)
			}
		</div>
	)
}
export default Wallet;
