'use client'
import ActionFeedbackCard from "../ActionFeedbackCard";
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
// import { useNotify } from "@/utils/hooks";
// eslint-disable-next-line no-unused-vars
import { saveBanks, getBanks } from "@/services/localService";
import CreatePinModal from "../Modal/CreatePin";
// import RefreshBtn from "../Btn/RefreshBtn";

const Wallet = () => {
	// const notify = useNotify();
	const { sortAlphabetically } = functions;
	const [walletState, setWalletState] = useState('') // no-wallet, pending, created
	const [walletDetails, setWalletDetails] = useState({})
	const [walletAccount, setWalletAccount] = useState({})
	const [walletBalance, setWalletBalance] = useState({})
	const [dataLoading, setDataLoading] = useState(true)
	const [balanceLoading, setBalanceLoading] = useState(true)
	const [updateKey, setUpdateKey] = useState(new Date().getTime())
	const [updateBalanceKey, setUpdateBalanceKey] = useState(new Date().getTime())
	const [reference, setReference] = useState(undefined)
	const [pinCreated, setPinCreated] = useState(null)
	// const [vaCreated, setVaCreated] = useState(false)

	const getWallet = async (loading) => {
		setDataLoading(loading)
		setBalanceLoading(true)
		try {
			const response = await wallet.getWalletDetails()
			const {data} = response.data
			// console.log(data)
				const {pinCreated} = data
				const {vaCreated} = data
				setPinCreated(!!pinCreated)
			if (Object.keys(data.walletAccount).length) {
				const accountNumber = data.walletAccount['NGN']?.accountNumber
				setPinCreated(!!pinCreated)
				if (!vaCreated && !accountNumber) {
					setWalletState('no-wallet')
				} else if (vaCreated && !accountNumber) {
					setWalletState('pending')
				} else if (vaCreated && accountNumber) {
					setWalletState('created')
				}
				setWalletDetails(data)
				setWalletAccount(data.walletAccount['NGN'])
			} else if (!vaCreated) {
					setWalletState('no-wallet')
				} else if (vaCreated) {
					setWalletState('pending')
				}
			
		} catch (_err) {
			const {responseMessage = undefined } = _err.response?.data || _err
			if (responseMessage?.toLowerCase()?.includes('wallet')) {
				setWalletState('no-wallet')
			}
		} finally {
			setDataLoading(false)
			setBalanceLoading(false)
		}
	}

	const getWalletBalanceInNGN = async () => {
		setBalanceLoading(true)
		try {
			const response = await wallet.getWalletBalance('NGN')
			const {data} = response.data
			setWalletBalance(data?.find(w=>w.currency==='NGN'))
		} catch (_err) {
			// console.log(_err)
		} finally {
			setBalanceLoading(false)
		}
	}

	const getBanksAndCache = async() => {
		if (!getBanks()?.length) {
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
	}

	const updateWalletState = () => {
		setUpdateKey(new Date().getTime())
		getWallet(false)
		getWalletBalanceInNGN()
	}

	const initiatePinCreation = async() =>{
		setDataLoading(true)
		try {
			const response = await wallet.initiatePin()
			setReference(response.data.reference)
		} catch (_err) {
			// console.log(_err)
		}
		finally {
			setDataLoading(false)
		}
	}
	const handleWalletCreatedActions = (val) => {
		setWalletState(val)
		setPinCreated(false)
	}

	const updateBalanceState = () => {
		setUpdateBalanceKey(new Date().getTime())
		getWallet(false)
		getWalletBalanceInNGN()
	}

	const handlePinCreation = () => {
		setReference(undefined)
		setPinCreated(true)
		getWallet(false)
		getWalletBalanceInNGN()
	}

	useEffect(()=>{
		getWallet(false)
		getWalletBalanceInNGN()
		getBanksAndCache()
	},[updateKey])

	useEffect(()=>{
		if (walletState !== 'no-wallet' && pinCreated === false && !reference) {
			initiatePinCreation()
		}
	},[walletState, pinCreated, reference])

	useEffect(function refreshData () {
		const interval = setInterval(()=>{
			setUpdateKey(new Date().getTime())
		},45000)
		return () => clearInterval(interval);
	},[updateKey])

	useEffect(()=>{
		getWallet(false)
		getWalletBalanceInNGN()
	},[updateBalanceKey])

	// useEffect(()=>{
	// 	console.log(reference)
	// },[reference])

	const WalletProcessing = () => (
		<div className={styles.wallet_processing}>
			<ActionFeedbackCard
				content={{
					title: 'Wallet Creation is Processing',
					value: 'Please check back in few minutes',
					status: 'pending',
				}}
			/>
		</div>
	)

	const WalletContent = () => (
		<>
			<div className={styles.top}>
				<BalanceCard wallet={wallet}
					dataLoading={dataLoading}
					walletBalance={walletBalance}
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
		</>
	)
	return (
		<div className={styles.wallet_page}>
			{
				pinCreated === false && reference ?
					<CreatePinModal handlePinCreation={()=>handlePinCreation()}
						topClose={false}
						cancelBtnDisabled={true}
						reference={reference}
						onClose={''} /> : <></>
			}
			{
				walletState === 'pending' || walletState === 'no-wallet' ?
					<div className={styles.create_wallet}>
						<h3>Wallet</h3>
						<h4>Manage your wallet here</h4>
						{dataLoading ?
							<FullScreenLoader />
							:
							walletState === 'pending' ?
								WalletProcessing() :
								walletState === 'no-wallet' ?
									<CreateWallet wallet={wallet}
										styles={styles}
										setWalletState={(val)=>handleWalletCreatedActions(val)} /> :
									<></>
						}
					</div>
					:
					walletState === 'created' ?
						WalletContent() :
						<div className={styles.create_wallet}>
							<h3>Wallet</h3>
							<h4>Manage your wallet here</h4>
							<FullScreenLoader />
						</div>
			}
		</div>

	)
}
export default Wallet;
