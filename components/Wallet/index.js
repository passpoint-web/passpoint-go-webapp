'use client'
// import ActionFeedbackCard from "../ActionFeedbackCard";
import FullScreenLoader from "../Modal/FullScreenLoader";
// import ModalWrapper from "../Modal/ModalWrapper";
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
import CreatePinModal from "../Modal/CreatePin";
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
	const [reference, setReference] = useState('')

	const getWallet = async (loading) => {
		setDataLoading(loading)
		setBalanceLoading(true)
		try {
			const response = await wallet.getWalletDetails()
			const {data} = response.data
			// console.log(data)
			setWalletDetails(data)
			setWalletAccount(data.walletAccount['NGN'])
			if (Object.keys(data.walletAccount).length) {
				const accountNumber = data.walletAccount['NGN']?.accountNumber
				if (accountNumber) {
					setWalletState('pending')
				} else {
					// console.log('no-wallet')
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

	const initiatePinCreation = async() =>{
		setDataLoading(true)
		try {
			const response = await wallet.initiatePin()
			setReference(response.data.reference)
		} catch (_err) {
			console.log(_err)
		}
		finally {
			setDataLoading(false)
		}
	}

	const updateBalanceState = () => {
		setUpdateBalanceKey(new Date().getTime())
		getWallet(false)
	}
	
	useEffect(()=>{
		getWallet(false)
		getBanksAndCache()
	},[updateKey])

	useEffect(()=>{
		if (walletState==='pending' && !walletDetails.pinCreated) {
			initiatePinCreation()
		}
	},[walletState])

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

	useEffect(()=>{
		console.log(walletState)
	},[walletState])

	// useEffect(()=>{
		// console.log(walletState)
	// },[])

	// const WalletProcessing = () => (
	// 		<div className={styles.wallet_processing}>
	// 			<ActionFeedbackCard
	// 			content={{
	// 				title: 'Wallet Creation is Processing',
	// 				value: 'Please check back in few minutes',
	// 				status: 'pending',
	// 			}}
	// 		/>
	// 		</div>
	// )
	return (
		<div className={styles.wallet_page}>
			{dataLoading ? <FullScreenLoader /> : <></>}
			{walletState === 'pending' ?
			<CreatePinModal handlePinCreation={''}
			reference={reference}
			onClose={''} /> : 
			// <WalletProcessing /> : 
			walletState === 'created' ?
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
				(!dataLoading ? <CreateWallet wallet={wallet} styles={styles} setWalletState={(val)=>setWalletState(val)} /> : <></>)
			}
		</div>
	)
}
export default Wallet;
