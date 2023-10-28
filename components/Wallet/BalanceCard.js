"use client";
import functions from "@/utils/functions";
// import Button from '../Btn/Button'
import BorderIconBtn from '../Btn/BorderIconBtn'
import {useRouter,  useSearchParams } from 'next/navigation'
import AddMoneyModal from './AddMoneyModal'
import TransferModals from './TransferModals'
import CopyValue from '../CopyValue'
import { AlertIcon, AddMoneyIcon, WithdrawMoneyIcon } from '@/constants/icons'
import CreatePinModal from '../Modal/CreatePin'
import { useEffect, useState } from 'react'
import { wallet } from '@/services/restService/wallet'

const BalanceCard = ({styles}) => {
	const [walletDetails, setWalletDetails] = useState({})
	const [walletAccount, setWalletAccount] = useState({})
	const [dataLoading, setDataLoading] = useState(true)
	const [reference, setReference] = useState('')
	const [initiateTransfer, setInitiateTransfer] = useState(false)
	const [transferModal, setTransferModal] = useState(false)
	const [currentModal, setCurrentModal] = useState(null)
	const [getDataLoading, setGetDataLoading] = useState(false)
	const createWallet = async () => {
		try {
			const response = await wallet.createWallet({
				currency: "NGN"
			})
		} catch (_err) {
			console.log(_err)

		} finally {}
	}
	const getWallet = async () => {
		try {
			const response = await wallet.getWalletDetails()
			const {data} = response.data
			console.log(data.walletAccount['NGN'])
			setWalletDetails(data)
			setWalletAccount(data.walletAccount['NGN'])
		} catch (_err) {
			console.log(_err)

		} finally {
			setDataLoading(false)
		}
	}

	const initiatePinForTransfer = async () => {

		setCurrentModal('tranfer')
		// setGetDataLoading(true)
		// try {
		// 	const response = await wallet.initiatePin()
		// 	// console.log(response.data)
		// 	const {reference} = response.data
		// 	if (reference) {
		// 		setReference(reference)
		// 		setCurrentModal('create pin')
		// 	} else {
		// 		setCurrentModal('transfer')
		// 	}
		// } catch (_err) {
		// 	handleModals('createPinModal')
		// 	console.log(_err)
		// } finally {
		// 	setGetDataLoading(false)
		// }
	}
	useEffect(()=>{
		// createWallet()
		getWallet()
	},[])

	const {formatMoney, createUrl} = functions
	const {replace} = useRouter()

	const searchParams = useSearchParams();

	const handleAddMoneyModal = (val) => {
		const newParams = new URLSearchParams(searchParams.toString());
		if (val) {
			newParams.set("addMoneyModal", val);
		} else {
			newParams.delete("addMoneyModal");
		}
		replace(createUrl("/dashboard/wallet", newParams));
	};

	const handleModals = (query, val) => {
		console.log(query, val);
		const newParams = new URLSearchParams(searchParams.toString());
		if (val) {
			newParams.set(query, val);
		} else {
			newParams.delete(query);
		}
		replace(createUrl("/dashboard/wallet", newParams));
	};

	useEffect(() => {
		// console.log(searchParams)
	}, [searchParams]);
	useEffect(() => {
		console.log(searchParams.get("createPinModal"));
	}, [searchParams.get("createPinModal")]);

	return (
		<>
			{
				currentModal === 'create pin' ?
					<CreatePinModal handlePinCreation={()=>setCurrentModal('tranfer')}
						reference={reference}
						onClose={()=>setCurrentModal(null)} /> :
					currentModal === 'add money' ?
						<AddMoneyModal walletAccount={walletAccount}
							styles={styles}
							onClose={()=>setCurrentModal(null)}/> :
						currentModal === 'tranfer' ?
							<TransferModals styles={styles}
								onClose={()=>setCurrentModal(null)} /> :
							<></>
			}
			{
				!dataLoading ? <div className={styles.balance_card}>
					<div className={styles.lhs}>
						<h4>Available Balance</h4>
						<h1>
							{formatMoney(walletAccount.availableBalance, 'NGN')}
						</h1>
						<div className={styles.btn_sec}>
							<BorderIconBtn
								bdColor='#fff'
								classProps='border i sd'
								onClick={()=>setCurrentModal('add money')}
								icon={<AddMoneyIcon />}
								text='Add money' />
							<BorderIconBtn
								bgColor='#fff'
								classProps='no-border i sd'
								styleProps={{color: '#009EC4'}}
								loading={getDataLoading}
								onClick={()=>initiatePinForTransfer()}
								icon={<WithdrawMoneyIcon />}
								text='Withdraw'
							/>
						</div>
					</div>
					<div className={styles.rhs}>
						<div className={styles.top}>
							<BorderIconBtn
								classProps='no-border i sd'
							>
								<AlertIcon /> Set Alert
							</BorderIconBtn>
						</div>
						<div className={styles.account}>
							<div>
								<h4>Account Name</h4>
								<h3>{walletAccount.accountName}</h3>
							</div>
							<div>
								<h4>{walletAccount.bankName}</h4>
								<div style={{display: 'flex', gap: 10, alignItems: 'center'}}>
									<h3>{walletAccount.accountNumber}</h3>
									<CopyValue value={walletAccount.accountNumber} />
								</div>
							</div>
						</div>
					</div>
				</div> : <div className={styles.balance_card}>
					<div className={styles.lhs}>
						<h4>Available Balance</h4>
						<h1>
							--
						</h1>
						<div className={styles.btn_sec}>
							<BorderIconBtn
								bdColor='#fff'
								classProps='border i sd'
								icon={<AddMoneyIcon />}
								disabled={true}
								text='Add money' />
							<BorderIconBtn
								bgColor='#fff'
								disabled={true}
								classProps='no-border i sd'
								styleProps={{color: '#009EC4'}}
								icon={<WithdrawMoneyIcon />}
								text='Withdraw'
							/>
						</div>
					</div>
					<div className={styles.rhs}>
						<div className={styles.top}>
							<BorderIconBtn
								classProps='no-border i sd'
							>
								<AlertIcon /> Set Alert
							</BorderIconBtn>
						</div>
						<div className={styles.account}>
							<div>
								<h4>Account Name</h4>
								<h3>--</h3>
							</div>
							<div>
								<h4>--</h4>
								<div style={{display: 'flex', gap: 10, alignItems: 'center'}}>
									<h3>--</h3>
								</div>
							</div>
						</div>
					</div>
				</div>
			}
		</>
	)
}

export default BalanceCard;
