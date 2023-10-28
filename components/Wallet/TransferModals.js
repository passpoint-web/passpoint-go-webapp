import { useEffect, useState } from "react";
import ModalWrapper from "../Modal/ModalWrapper";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/Dashboard/Input";
import functions from "@/utils/functions";
import OtpInput from "react-otp-input";
import styles from "./wallet.module.css";
import formStyles from "@/assets/styles/auth-screens.module.css";
import CustomSelect from "../Custom/Select";
import ActionFeedbackCard from "../ActionFeedbackCard";

const TransferModals = ({ handlePinCreation, onClose }) => {
	// const notify = useNotify();
	const { formatMoney } = functions;
	const [ctaClicked, setCtaClicked] = useState(false);
	const [tranferPin, setTransferPin] = useState("");
	const [allFieldsValid, setAllFieldsValid] = useState(false);
	// const [isLoading, setIsLoading] = useState(false);
	const [currentLevel, setCurrentLevel] = useState('success')
	const [feedbackError, setFeedbackError] = useState("");
	const [accountOrPin, setAccountOrPin] = useState(false)
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
			return
		case 'pin':
			return;
		case 'success':
			onClose()
			break;
		case 'failure':
			setCurrentLevel('account');
		}
	}

	useEffect(() => {
		const conditionsMet =
      bankDetail.bankName &&
      bankDetail.accountNumber &&
      bankDetail.accountName &&
      bankDetail.amount &&
      bankDetail.narration;
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

	const handlePinsChange = (e) => {
		const { name, value } = e.target;
		setPins((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	const GetBanksFlow = () => (
		<>
			<Input
				id="bank"
				label="Select Bank"
				error={ctaClicked && !bankDetail.bankName}
				errorMsg="Bank name is required"
			>
				<CustomSelect
					selectOptions={[
						"Access Bank",
						"First Bank",
						"GT Bank",
						"United Bank Africa",
						"Zenith Bank",
					]}
					selectedOption={bankDetail.bankName}
					fieldError={ctaClicked && !bankDetail.bankName}
					emitSelect={(option) => handleChange("bankName", option)}
				/>
			</Input>
			<Input
				label="Account Number"
				id="accountNumber"
				name="accountNumber"
				placeholder="Enter Account Number here"
				error={ctaClicked && !bankDetail.accountNumber}
				value={bankDetail.accountNumber}
				onChange={(e) => handleChange("accountNumber", e.target.value)}
				errorMsg="Account number is required"
			/>
			<>
				{bankDetail.accountNumber.length === 10 ? (
					<>
						<Input
							disabled
							label="Account Name"
							id="accountName"
							name="accountName"
							placeholder="John Doe"
							// error={ctaClicked && !bankDetail.accountName}
							value={bankDetail.accountName}
							//   onChange={(e) => handleChange("accountName", e.target.value)}
						/>
						<Input
							label="Amount"
							id="amount"
							name="amount"
							placeholder="Enter amount here"
							error={ctaClicked && !bankDetail.amount}
							value={bankDetail.amount}
							onChange={(e) => handleChange("amount", e.target.value)}
							errorMsg="Account number is required"
						/>
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
					</>
				) : null}
			</>
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
							{bankDetail.bankName}
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
								onChange={(e) => setTransferPin(e.target.value)}
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

