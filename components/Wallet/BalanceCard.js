
'use client'
import functions from '@/utils/functions'
// import Button from '../Btn/Button'
import BorderIconBtn from '../Btn/BorderIconBtn'
import {useRouter,  useSearchParams } from 'next/navigation'
import AddMoneyModal from './AddMoneyModal'
import CopyValue from '../CopyValue'
import { AlertIcon, AddMoneyIcon, WithdrawMoneyIcon } from '@/constants/icons'
import CreatePinModal from '../Modal/CreatePin'
import { useEffect } from 'react'
import { wallet } from '@/services/restService/wallet'

const BalanceCard = ({styles}) => {
	const createWallet = async () => {
		try {
			const response = await wallet.createWallet({
				"currency":"NGN"
			})
		} catch (_err) {
			console.log(_err)

		} finally {}
	}
	const getWallet = async () => {
		try {
			const response = await wallet.getWalletDetails()
			console.log(response)
		} catch (_err) {
			console.log(_err)

		} finally {}
	}
	useEffect(()=>{
		// createWallet()
		// getWallet()
	},[])
	const {formatMoney, createUrl} = functions
	const {replace} = useRouter()

	const searchParams = useSearchParams()
	const handleAddMoneyModal = (val) => {
		const newParams = new URLSearchParams(searchParams.toString());
		if (val) {
			newParams.set('addMoneyModal', val)
		} else {
			newParams.delete('addMoneyModal')
		}
		replace(createUrl('/dashboard/wallet', newParams))
	}

	const handleWithdrawModal = (query, val) => {
		const newParams = new URLSearchParams(searchParams.toString());
		if (query === 'createPinModal') {
			if (val) {
				newParams.set('createPinModal', val)
			} else {
				newParams.delete('createPinModal')
			}
		} else if (query === 'transferModal') {
			if (val) {
				newParams.set('transferModal', val)
			} else {
				newParams.delete('transferModal')
			}
		}
		replace(createUrl('/dashboard/wallet', newParams))
	}

	return (
		<>
			{searchParams.get('createPinModal') ? <CreatePinModal /> : <></>}
			{searchParams.get('addMoneyModal') === 'true' ? <AddMoneyModal styles={styles} /> : <></>}
			<div className={styles.balance_card}>
				<div className={styles.lhs}>
					<h4>Available Balance</h4>
					<h1>
						{formatMoney('1750000', 'NGN')}
					</h1>
					<div className={styles.btn_sec}>
						<BorderIconBtn
							bdColor='#fff'
							classProps='border i sd'
							onClick={()=>handleAddMoneyModal(true)}
						>
							<AddMoneyIcon />
            Add money
						</BorderIconBtn>
						<BorderIconBtn
							bgColor='#fff'
							classProps='no-border i sd'
							styleProps={{color: '#009EC4'}}
							onClick={()=>handleWithdrawModal('createPinModal', 'password')}
						>
							<WithdrawMoneyIcon /> Withdraw
						</BorderIconBtn>
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
							<h3>Josh Travels</h3>
						</div>
						<div>
							<h4>Account Number</h4>
							<div style={{display: 'flex', gap: 10, alignItems: 'center'}}>
								<h3>1234567890</h3>
								<CopyValue value='1234567890' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default BalanceCard
