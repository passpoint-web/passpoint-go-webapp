import { useEffect, useState } from "react";
import ModalWrapper from "../Modal/ModalWrapper";
// import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/Dashboard/Input";
import functions from "@/utils/functions";
import OtpInput from "react-otp-input";
// import styles from "./wallet.module.css";
import formStyles from "@/assets/styles/auth-screens.module.css";
import ActionFeedbackCard from "../ActionFeedbackCard";
import { wallet } from '@/services/restService/wallet'
import MoneyInput from "../Custom/MoneyInput";
import AccountTypeDropDown from "./AccountTypeDropDown";
import TertiaryBtn from "../Btn/Tertiary";
import CreatePinModal from "../Modal/CreatePin";
import SearchSelect from "../Dashboard/SearchSelect";

const TransferModals = ({ onClose, styles, updateWalletState }) => {
	// const notify = useNotify();
	const { formatMoney, sortAlphabetically } = functions;
	const [accountType, setAccountType] = useState({name: 'Account Number', description: 'NUBAN'})
	const [ctaClicked, setCtaClicked] = useState(false);
	const [tranferPin, setTransferPin] = useState("");
	const [banks, setBanks] = useState([]);
	const [allFieldsValid, setAllFieldsValid] = useState(false);
	const [accountNameRetrieved, setAccountNameRetrieved] = useState(false);
	// const [isLoading, setIsLoading] = useState(false);
	const [currentLevel, setCurrentLevel] = useState('account') // account, pin, success, failure, reset pin
	const [feedbackError, setFeedbackError] = useState('')
	const [statusMessage, setStatusMessage] = useState('')
	const [accountOrPin, setAccountOrPin] = useState(false)
	const [getDataLoading, setGetDataLoading] = useState(false)
	const [accountTranferLoading, setAccountTranferLoading] = useState(false)
	const [reference, setReference] = useState('')
	const [pinResetLoading, setPinResetLoading] = useState(false)
	const [bankDetail, setBankDetails] = useState({
		bankName: "",
		accountNumber: "",
		walletID: "",
		accountName: "",
		amount: "",
		narration: "",
	});

	const handleChange = (name, value) => {
		setBankDetails((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// eslint-disable-next-line no-unused-vars
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(bankDetail);
		setCtaClicked(true);
		if (!allFieldsValid) {
			return;
		}
	};

	const handleModalCta = () => {
		switch (currentLevel) {
		case 'account':
			setCurrentLevel('pin');
			break;
		case 'pin':
			handleFinalSubmit();
			break;
		case 'success':
			onClose()
			break;
		case 'failure':
			setCurrentLevel('account');
		}
	}

	const initiatePinReset = async (e) => {
		e.preventDefault()
		// setCurrentModal('transfer')
		setPinResetLoading(true)
		try {
			const response = await wallet.initiatePin(true)
			const {reference} = response.data
			if (reference) {
				setReference(reference)
				setCurrentLevel('reset pin')
			} else {
				// setCurrentModal('transfer')
			}
		} catch (_err) {
			const {responseMessage = undefined, message = undefined } = _err.response?.data || _err;
			setFeedbackError(responseMessage || message)
			// console.log(responseMessage || message)
			// if (responseMessage === 'Pin has already been set') {
				// setCurrentModal('transfer')
			// }
		} finally {
			setPinResetLoading(false)
		}
	}

	const handleFinalSubmit = async () => {
		if (accountType.name === 'Account Number') {
			setAccountTranferLoading(true)
			try {
				const {
					bankName:{displayCode},
					accountNumber,
					accountName,
					amount,
					narration,
				} = bankDetail
				const response = await wallet.accountTransfer(
					{
						bankCode: displayCode,
						transactionCurrency: 'NGN',
						accountName, accountNumber,
						amount: Number(amount),
						channel: '3', narration,
						pin: tranferPin
					}
				)
				// console.log(response.data.responseMessage)
				setStatusMessage(response.data.responseMessage)
				setCurrentLevel('success')
			} catch (_err) {
				// console.log(_err.response.data.responseMessage)
				setStatusMessage(_err.response.data.responseMessage)
				setCurrentLevel('failure')
				// console.log(_err)
			} finally {
				setAccountTranferLoading(false)
				updateWalletState()
				//
			}
		} else {
			setAccountTranferLoading(true)
			try {
				const {
					walletID,
					accountName,
					amount,
					narration,
				} = bankDetail
				const response = await wallet.accountTransfer(
					{
						bankCode: '000000',
						transactionCurrency: 'NGN',
						accountName,
						amount: Number(amount),
						accountId: walletID,
						channel: '3',
						narration,
						pin: tranferPin
					}
				)
				setStatusMessage(response.data.responseMessage)
				// console.log(response)
				setCurrentLevel('success')
			} catch (_err) {
				setCurrentLevel('failure')
				// console.log(_err)
			} finally {
				setAccountTranferLoading(false)
				updateWalletState()
				//
			}
		}
	}

	const getBanks = async() => {
		try {
			setGetDataLoading(true)
			const response = await wallet.getBanks()
			const {data} = response.data
			if (data) {
				const sortedBanks = sortAlphabetically(data, 'name')
				setBanks(sortedBanks)
			}
		} catch (_err) {
			// console.log(_err.response.data)
		} finally {
			setGetDataLoading(false)
			//
		}
	}

	const accountEnquiry = async() => {
		if (accountType.name === 'Account Number') {
			try {
				setGetDataLoading(true)
				const {accountNumber, bankName: {displayCode}} = bankDetail
				const response = await wallet.accountEnquiry({
					bankCode: displayCode,
					accountNumber,
					countryCode: 'NG'
				})
				setFeedbackError('')
				const {accountName} = response.data.data
				setBankDetails((prev)=>({
					...prev,
					accountName
				}))
				setAccountNameRetrieved(true)
			} catch (_err) {
				const {responseMessage = undefined, message = undefined } = _err.response?.data || _err;
				setFeedbackError(responseMessage || message)
				if (responseMessage?.toLowerCase()?.includes('number')) {
					setBankDetails((prev)=>({
						...prev,
						accountName: ''
					}))
				}
			} finally {
				setGetDataLoading(false)
			}
		} else {
			try {
				setGetDataLoading(true)
				const {walletID} = bankDetail
				const response = await wallet.passpointWalletEnquiry({
					walletId: walletID,
					currency: 'NGN'
				})
				// console.log(response.data)
				setFeedbackError('')
				const {accountName} = response.data.data
				setBankDetails((prev)=>({
					...prev,
					accountName
				}))
				setAccountNameRetrieved(true)
			} catch (_err) {
				const {responseMessage = undefined, message = undefined } = _err.response?.data || _err;
				setFeedbackError(responseMessage || message)
				if (responseMessage?.toLowerCase()?.includes('number')) {
					setBankDetails((prev)=>({
						...prev,
						accountName: ''
					}))
				}
			} finally {
				setGetDataLoading(false)
			}
		}
	}

	useEffect(() => {
		const {
			bankName,
			accountNumber,
			walletID,
			accountName,
			amount,
			narration
		} = bankDetail
		const conditionsMet =
      (accountType.name === 'Account Number' ? bankName : true) &&
      (accountType.name === 'Account Number' ? accountNumber : walletID) &&
      accountName &&
      amount &&
      narration
		if (conditionsMet) {
			setAllFieldsValid(true);
		} else {
			setAllFieldsValid(false);
		}
	}, [bankDetail]);

	useEffect(()=>{
		if (['account', 'pin'].includes(currentLevel)) {
			setAccountOrPin(true)
		} else {
			setAccountOrPin(false)
		}
	},[currentLevel])

	useEffect(()=>{
		getBanks()
	},[])

	// useEffect(()=>{
	// 	setAccountNameRetrieved(false)
	// 	setBankDetails((prev)=>({
	// 		...prev,
	// 		accountName: ''
	// 	}))
	// },[accountType])

	useEffect(()=>{
		const {accountNumber, bankName, walletID} = bankDetail
		if (accountNumber.length === 10 && bankName)  {
			accountEnquiry()
		}
		if (walletID)  {
			accountEnquiry()
		}
	},[bankDetail.accountNumber, bankDetail.walletID, bankDetail.bankName])


	const GetBanksFlow = () => (
		<>
			<div style={{marginBottom: 10}}>
				<AccountTypeDropDown selectedOption={accountType}
					emitSelect={(e)=>setAccountType(e)} />
			</div>
			{/* wallet id || account number */}
			{accountType.name === 'Account Number' ?
				<>
					<SearchSelect
						id="bank"
						label="Select Bank"
						error={ctaClicked && !bankDetail.bankName}
						errorMsg="Bank name is required"
						selectPlaceholder={getDataLoading && !banks.length ? 'Loading...' : 'Select Bank'}
						selectOptions={banks}
						selectDisabled={banks.length === 0}
						objKey={'name'}
						selectedOption={bankDetail.bankName}
						fieldError={ctaClicked && !bankDetail.bankName}
						emitSelect={(option) => handleChange("bankName", option)}
					/>

					<Input
						type="number"
						label='Account Number'
						id="accountNumber"
						name="accountNumber"
						placeholder="Enter Account Number here"
						error={(ctaClicked && !bankDetail.accountNumber) || feedbackError.toLowerCase().includes('number')}
						value={bankDetail.accountNumber}
						onChange={(e) => e.target.value.length <= 10 ? handleChange("accountNumber", e.target.value) : null}
						errorMsg={feedbackError.toLowerCase().includes('number')? 'Account number is not valid' : 'Account number is required'}
					/></> :
				<Input
					type="email"
					label='Wallet ID'
					id="walletID"
					name="walletID"
					placeholder="Enter Passpoint's Wallet ID here"
					error={(ctaClicked && !bankDetail.walletID) || feedbackError.toLowerCase().includes('number')}
					value={bankDetail.walletID}
					onChange={(e) => handleChange("walletID", e.target.value)}
					errorMsg={feedbackError.toLowerCase().includes('number')? 'Wallet ID is not valid' : 'Wallet ID is required'}
				/>}
				{accountNameRetrieved ?
				<>
					<Input
						disabled
						label="Account Name"
						id="accountName"
						name="accountName"
						placeholder={getDataLoading ? 'Loading...' : 'Account Name'}
						// error={ctaClicked && !bankDetail.accountName}
						value={bankDetail.accountName}
						//   onChange={(e) => handleChange("accountName", e.target.value)}
					/>
					{/* <Input
						label="Amount"
						id="amount"
						name="amount"
						placeholder="Enter amount here"
						error={ctaClicked && !bankDetail.amount}
						value={bankDetail.amount}
						onChange={(e) => handleChange("amount", e.target.value)}
						errorMsg="Account number is required"
					/> */}
					<Input
						label="Amount"
						id="amount"
						name="amount"
						error={ctaClicked && Number(bankDetail.amount) === 0}
						errorMsg='Amount is required'
					>
						<MoneyInput
							id='amount'
							placeholder={'Enter amount'}
							currency={'NGN'}
							value={bankDetail.amount}
							onValueChange={(e)=> handleChange("amount", e)}
						/>
					</Input>
					<Input
						label="Narration"
						id="narration"
						name="narration"
						placeholder="Enter brief narration"
						error={ctaClicked && !bankDetail.narration}
						value={bankDetail.narration}
						onChange={(e) => handleChange("narration", e.target.value)}
						errorMsg="narration is required"
					/>
				</> : <></>}
		</>
	)

	const TransferPin = () => (
		<>
			<section className={styles.transferPin}>
				{
					accountType.name === 'Account Number' ?
						<div
							className={styles.transferPin_details}>
							<label>Bank Name</label>
							<div>
								<p>
									{bankDetail.bankName.name}
								</p>
							</div>
						</div> : <></>
				}
				<div
					className={styles.transferPin_details}>
					<label>Account Name</label>
					<div>
						<p>
							{bankDetail.accountName}
						</p>
					</div>
				</div>
				{
					accountType.name === 'Account Number' ?
						<div
							className={styles.transferPin_details}>
							<label>Account Number</label>
							<div>
								<p>
									{bankDetail.accountNumber}
								</p>
							</div>
						</div> :
						<div
							className={styles.transferPin_details}>
							<label>Wallet ID</label>
							<div>
								<p>
									{bankDetail.walletID}
								</p>
							</div>
						</div>
				}
				<div
					className={styles.transferPin_details}>
					<label>Amount</label>
					<div>
						<p className={`${styles.skyBlueCss}`}>
							{formatMoney(bankDetail.amount, 'NGN')}
						</p>
					</div>
				</div>
				<div
					className={styles.transferPin_details}>
					<label>Transfer Fee</label>
					<div>
						<p className={`${styles.skyBlueCss}`}>
							{formatMoney('0', 'NGN')}
						</p>
					</div>
				</div>
				<div
					className={styles.transferPin_details}>
					<label>Narration</label>
					<div>
						<p>
							{bankDetail.narration}
						</p>
					</div>
				</div>

			</section>
			<section className={styles.tranferPin_pin}>
				<div style={{}}>
					<Input label={"Enter Pin"}
						label_center={true}>
						<div className={formStyles.otp_input_four}>
							<OtpInput
								value={tranferPin}
								onChange={(e) => setTransferPin(e)}
								numInputs={4}
								shouldAutoFocus={true}
								inputType="number"
								inputMode={null}
								renderSeparator={<span />}
								renderInput={(props) => <input {...props} />}
							/>
						</div>
					</Input>
					<p>Forgot your PIN? <TertiaryBtn text={!pinResetLoading ? 'Reset PIN' : 'Loading...'} disabled={pinResetLoading} onClick={(e)=>initiatePinReset(e)}/></p>
				</div>
			</section>
		</>
	);

	return (
		<>
		{currentLevel === 'reset pin' ?
		<CreatePinModal handlePinCreation={()=>setCurrentLevel('pin')}
		reference={reference}
		onClose={()=>setCurrentLevel('pin')} /> : 
		<ModalWrapper
			ctaDisabled={currentLevel === 'account' ? !allFieldsValid : tranferPin.length !== 4}
			ctaBtnType={accountOrPin ? 'md' : 'sd'}
			ctaBtnText={currentLevel === 'account' ? 'Continue' : currentLevel === 'pin' ? 'Confirm' : currentLevel === 'success' ? 'Go Back' : currentLevel === 'failure' ? 'Try Again' : ''}
			heading={accountOrPin ? 'Transfer Money' : ''}
			topClose={accountOrPin}
			loading={accountTranferLoading}
			subHeading={accountOrPin ? 'Kindly provide details below' : ''}
			onClose={() => currentLevel === 'pin' ? setCurrentLevel('account') : onClose()}
			bottomCancelNeeded={accountOrPin}
			handleCta={handleModalCta}
		>
			<form style={{ minHeight: 250 }}>
				{currentLevel === 'account' ?
					GetBanksFlow()
					: currentLevel === 'pin' ?
					TransferPin() :
						currentLevel === 'success' ?
							<ActionFeedbackCard content={{
								status: 'success',
								title: 'Transfer Successful',
								// value: `Your transfer of ${formatMoney(bankDetail.amount, 'NGN')} to ${bankDetail.accountName} was successful and they will receive it promptly`
								value: statusMessage
							}}/> : 	currentLevel === 'failure' ?
								<ActionFeedbackCard
									content={{
										status: 'failure',
										title: 'Transfer Failed',
										value: statusMessage
									}} /> : <></>
				}
			</form>
		</ModalWrapper>

		}
			
		</>
	);
};


export default TransferModals;

