"use client";
// import Button from '../Btn/Button'
import BorderIconBtn from '../Btn/BorderIconBtn'
import { useRouter, useSearchParams } from 'next/navigation'
import AddMoneyModal from './AddMoneyModal'
import TransferModals from './TransferModals'
import CopyValue from '../CopyValue'
import { AddMoneyIcon, WithdrawMoneyIcon } from '@/constants/icons'
import CreatePinModal from '../Modal/CreatePin'
import { useEffect, useState } from 'react'
import functions from "@/utils/functions";
import { EyeClose, EyeOpen } from '@/constants/icons'
import RefreshBtn from '../Btn/RefreshBtn';

const BalanceCard = ({ dataLoading, balanceLoading, walletAccount, wallet, styles, updateWalletState, updateBalanceState}) => {
	const searchParams = useSearchParams()
	const {replace} = useRouter()
	const {formatMoney, maskValue} = functions
	const [showBalance, setShowBalance] = useState(true)
	const [reference, setReference] = useState('')
	// const [feedbackError, setFeedbackError] = useState('')
	const [currentModal, setCurrentModal] = useState('tranfer')
	const [pinCheckLoading, setPinCheckLoading] = useState(false)

	const initiatePinForTransfer = async () => {
		setPinCheckLoading(true)
		try {
			const response = await wallet.initiatePin()
			const {reference} = response.data
			if (reference) {
				setReference(reference)
				setCurrentModal('create pin')
			} else {
				setCurrentModal('transfer')
			}
		} catch (_err) {
			const {responseMessage = undefined } = _err.response?.data || _err;
			// setFeedbackError(responseMessage || message)
			if (responseMessage === 'Pin has already been set') {
				setCurrentModal('transfer')
			}
		} finally {
			setPinCheckLoading(false)
		}
	}

	const closeAddMoneyModal = () => {
		setCurrentModal(null)
		replace('/dashboard/wallet')
	}

	useEffect(()=>{
		if (searchParams.get('add-money')==='true') {
			setCurrentModal('add money')
		}
	},[searchParams.get('add-money')])

	return (
		<>
			{
				currentModal === 'create pin' ?
					<CreatePinModal handlePinCreation={()=>setCurrentModal('transfer')}
						reference={reference}
						onClose={()=>setCurrentModal(null)} /> :
					currentModal === 'add money' ?
						<AddMoneyModal walletAccount={walletAccount}
							styles={styles}
							onClose={()=>closeAddMoneyModal()}
						/> :
						currentModal === 'transfer' ?
							<TransferModals styles={styles}
								onClose={()=>setCurrentModal(null)}
								updateWalletState={()=>updateWalletState()} /> :
							<></>
			}
			{
				!dataLoading ? <div className={`${styles.balance_card} wallet_balance_card`}>
					<div className={styles.lhs}>
						<div className={styles.available_balance}>
							<h4>Available Balance</h4>
							<div className={styles.balance}>
								<h1 className={!showBalance ? styles.hide_balance : ''}>
									{showBalance ? formatMoney(walletAccount.availableBalance, 'NGN') : maskValue(walletAccount.availableBalance)}
								</h1>
								<div className={styles.card_action}>
								<button onClick={()=>setShowBalance(!showBalance)}>
									{!showBalance ? <EyeOpen /> : <EyeClose />}
								</button>
								{/* <RefreshBtn refreshing={balanceLoading} onClick={()=>updateBalanceState()} /> */}
								</div>
							</div>
						</div>
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
								loading={pinCheckLoading}
								onClick={()=>initiatePinForTransfer()}
								icon={<WithdrawMoneyIcon />}
								text='Withdraw'
							/>
						</div>
					</div>
					<div className={styles.rhs}>
						{/* <div className={styles.top}>
							<BorderIconBtn
								classProps='no-border i sd'
							>
								<AlertIcon /> Set Alert
							</BorderIconBtn>
						</div> */}
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
						{/* <div className={styles.top}>
							<BorderIconBtn
								classProps='no-border i sd'
							>
								<AlertIcon /> Set Alert
							</BorderIconBtn>
						</div> */}
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
