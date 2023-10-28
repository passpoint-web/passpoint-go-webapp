import { useEffect, useState } from "react";
import ModalWrapper from "../Modal/ModalWrapper";
// import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/Dashboard/Input";
import functions from "@/utils/functions";
import OtpInput from "react-otp-input";
import styles from "./wallet.module.css";
import formStyles from "@/assets/styles/auth-screens.module.css";
import CustomSelect from "../Custom/Select";
import ActionFeedbackCard from "../ActionFeedbackCard";
import { wallet } from '@/services/restService/wallet'
import MoneyInput from "../Custom/MoneyInput";

const TransferModals = ({ onClose }) => {
	// const notify = useNotify();
	const { formatMoney, sortAlphabetically } = functions;
	const [ctaClicked, setCtaClicked] = useState(false);
	const [tranferPin, setTransferPin] = useState("");
	const [banks, setBanks] = useState([]);
	const [allFieldsValid, setAllFieldsValid] = useState(false);
	const [accountNameRetrieved, setAccountNameRetrieved] = useState(false);
	// const [isLoading, setIsLoading] = useState(false);
	const [currentLevel, setCurrentLevel] = useState('account')
	const [feedbackError, setFeedbackError] = useState('')
	const [accountOrPin, setAccountOrPin] = useState(false)
	const [getDataLoading, setGetDataLoading] = useState(false)
	const [bankDetail, setBankDetails] = useState({
		bankName: "",
		accountNumber: "",
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

	const handleFinalSubmit = async () => {
		try {
			const {
				bankName:{displayCode},
				accountNumber,
				accountName,
				amount,
				narration,
			} = bankDetail
			await wallet.accountTransfer({bankCode: displayCode, transactionCurrency: 'NGN', accountName, accountNumber: Number(accountNumber), amount: Number(amount),  channel: '3', narration, pin: tranferPin})
		} catch (_err) {
			console.log(_err)
		} finally {
			//
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
			console.log(_err.response.data)
		} finally {
			setGetDataLoading(false)
			//
		}
	}

	const accountEnquiry = async() => {
		try {
			setGetDataLoading(true)
			const {accountNumber, bankName: {displayCode}} = bankDetail
			const response = await wallet.acountEnquiry({
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
	}

	useEffect(() => {
		const {
			bankName,
			accountNumber,
			accountName,
			amount,
			narration
		} = bankDetail
		const conditionsMet =
      bankName &&
      accountNumber &&
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

	useEffect(()=>{
		const {accountNumber, bankName} = bankDetail
		if (accountNumber.length === 10 && bankName)  {
			accountEnquiry()
		}
	},[bankDetail.accountNumber, bankDetail.bankName])


	const GetBanksFlow = () => (
		<>
			<Input
				id="bank"
				label="Select Bank"
				error={ctaClicked && !bankDetail.bankName}
				errorMsg="Bank name is required"
			>
				<CustomSelect
					placeholder={getDataLoading && !banks.length ? 'Loading...' : 'Select Bank'}
					selectOptions={banks}
					disabled={banks.length === 0}
					objKey={'name'}
					selectedOption={bankDetail.bankName}
					fieldError={ctaClicked && !bankDetail.bankName}
					emitSelect={(option) => handleChange("bankName", option)}
				/>
			</Input>
			{/* {feedbackError} */}
			<Input
				label="Account Number"
				// className="uppercase"
				id="accountNumber"
				name="accountNumber"
				placeholder="Enter Account Number here"
				error={(ctaClicked && !bankDetail.accountNumber) || feedbackError.toLowerCase().includes('number')}
				value={bankDetail.accountNumber}
				onChange={(e) => e.target.value.length <= 10 ? handleChange("accountNumber", e.target.value) : null}
				errorMsg={feedbackError.toLowerCase().includes('number')? 'Account number is not valid' : 'Account number is required'}
			/>
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
				<div
					className={styles.transferPin_details}>
					<label>Bank Name</label>
					<div>
						<p>
							{bankDetail.bankName.name}
						</p>
					</div>
				</div>
				<div
					className={styles.transferPin_details}>
					<label>Account Name</label>
					<div>
						<p>
							{bankDetail.accountName}
						</p>
					</div>
				</div>
				<div
					className={styles.transferPin_details}>
					<label>Account Number</label>
					<div>
						<p>
							{bankDetail.accountNumber}
						</p>
					</div>
				</div>
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
							{formatMoney('20', 'NGN')}
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
				<div style={{ width: "75%", margin: "0 auto" }}>
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
				</div>
			</section>
		</>
	);

	return (
		<ModalWrapper
			ctaDisabled={currentLevel === 'account' ? !allFieldsValid : tranferPin.length !== 4}
			ctaBtnType={accountOrPin ? 'md' : 'sd'}
			ctaBtnText={currentLevel === 'account' ? 'Continue' : currentLevel === 'pin' ? 'Confirm' : currentLevel === 'success' ? 'Go Back' : currentLevel === 'failure' ? 'Try Again' : ''}
			heading={accountOrPin ? 'Transfer Money' : ''}
			topClose={accountOrPin}
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
								success: true,
								title: 'Transfer Successful',
								value: `Your transfer of ${formatMoney(bankDetail.amount, 'NGN')} to ${bankDetail.accountName} was successful and they will receive it promptly`
							}}/> : 	currentLevel === 'failure' ?
								<ActionFeedbackCard
									content={{
										success: false,
										title: 'Transfer Failed',
										value: `Your transfer of ${formatMoney(bankDetail.amount, 'NGN')} to ${bankDetail.accountName} failed, Please try again`
									}} /> : <></>
				}
			</form>
		</ModalWrapper>
	);
};


export default TransferModals;

