"use client";

import CustomSelect from "@/components/Custom/Select";
import functions from "@/utils/functions";
import { useEffect, useState } from "react";
import ModalWrapper from "../Modal/ModalWrapper";
import Input from "../Dashboard/Input";
import formStyles from '@/assets/styles/auth-screens.module.css'
import FileUpload from "../FileUpload";
import { detailedDate, timeFromDate } from "@/utils/date-formats";
import ActionFeedbackCard from "../ActionFeedbackCard";

const WalletTransactionModal = ({onClose, styles, transaction}) => {
	const { formatMoney } = functions;
	const [currentLevel, setCurrentLevel] = useState('transaction')
	// const [errorMsg, setErrorMsg] = useState("");
	// eslint-disable-next-line no-unused-vars
	const [ctaClicked, setCtaClicked] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [isLoading, setIsLoading] = useState(false);
	const transactionReportIssues = [
		"Frauduluent Activity",
		"Billing Descrepancy",
	];
	const [modalContent, setModalContent] = useState({
		heading: "",
		subHeading: "",
	});

	useEffect(()=>{
		defineModalContents(currentLevel)
	},[currentLevel])

	const handleIssueSelect = () => {};

	const defineModalContents = (level) => {
		switch (level) {
		case "transaction":
			setModalContent({
				heading: "Transaction Details",
				subHeading: "See all the details about your transaction",
				ctaText: "Share",
				secText: "Report",
				secNegative: true,
				ctaBtnColor: "#009EC4",
				bottomCancelNeeded: true,
				bottomSecAction: true,
				handleBottomSecAction: () => {
					setCurrentLevel("report");
				},
				handleModalCta: () => {
					console.log("shared");
				},
			});
			break;
		case "report":
			setModalContent({
				heading: "Report Transaction",
				subHeading: "Tell us anything you think went wrong",
				ctaText: "Submit",
				secText: "Back",
				bottomCancelNeeded: true,
				bottomSecAction: true,
				handleBottomSecAction: () => {
					setCurrentLevel("transaction");
				},
				handleModalCta: () => {
					setCurrentLevel("report-success");
				},
			});
			break;
		case "report-success":
			setModalContent({
				heading: "",
				subHeading: "",
				ctaText: "Return to Dashboard",
				bottomCancelNeeded: false,
				handleModalCta: () => {
					onClose();
				},
				// hasBottomActions: false
			});
		}
	};

	const TransactionDetails = () => (
		<div className={styles.modal__wallet_details_section}>
			<div className={styles.row}>
				<div className={styles.label}>Amount</div>
				<div className={styles.value}>
					<span className="text-blue uppercase">
						{formatMoney(transaction.amount, transaction.currency)}
					</span>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.label}>Service fee</div>
				<div className={styles.value}>{formatMoney(transaction.fee, transaction.currency)}</div>
			</div>
			<div className={styles.row}>
				<div className={styles.label}>Date & Time</div>
				<div className={styles.value}>
					<span>
						{detailedDate(transaction.dateCreated)},
						<span>
							{timeFromDate(transaction.dateCreated)}
						</span>
					</span>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.label}>Transaction ID</div>
				<div className={styles.value}>
					<span>{transaction.transactionId}</span>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.label}>Beneficiary Name</div>
				<div className={styles.value}>
					<span>{transaction.beneficiaryAccountName}</span>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.label}>Beneficiary Account</div>
				<div className={styles.value}>
					<span>{transaction.beneficiaryAccountNumber}</span>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.label}>Beneficiary Institution</div>
				<div className={styles.value}>
					<span>{transaction.beneficiaryBankName}</span>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.label}>Transaction Type</div>
				<div className={styles.value}>
					{transaction.transactionCategory ==='PAYOUT' ?
						<>
							<div className="outgoing-circle" /> Outgoing
						</> :
						<>
							<div className="incoming-circle" /> Incoming
						</>
					}
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.label}>Transaction Method</div>
				<div className={styles.value}>
					<span>Bank Transfer</span>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.label}>Narration</div>
				<div className={styles.value}>
					<span>{transaction.narration}</span>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.label}>Booking Status</div>
				<div className={styles.value}>
					{ transaction.finalResponseMessage.toLowerCase().includes('pending') ?
						<div className="pending-tag">Pending</div> :
						transaction.finalResponseMessage.toLowerCase().includes('success') ?
							<div className="completed-tag">Completed</div> :
							transaction.finalResponseMessage.toLowerCase().includes('failed') ?
								<div className="failed-tag">Failed</div> : <></>
					}
				</div>
			</div>
		</div>
	);

	const ReportTransactionContent = () => (
		<form className={formStyles.form}>
			<Input
				id="selectIssueType"
				label="Issue Type"
				placeholder="Select Issue Type"
				error={ctaClicked}
				errorMsg="Atleast one social media link is required"
			>
				<CustomSelect
					fieldError={false}
					selectOptions={transactionReportIssues}
					emitSelect={(s) => handleIssueSelect(s)}
				/>
			</Input>
			<Input label="Description"
				error={false}
				errorMsg={""}
				id="description">
				<textarea
					placeholder="Tell us about this transaction"
					id="businessDesc"
					name="businessDesc"
					value={""}
					onChange={""}
				/>
			</Input>
			<FileUpload
				subTitle="Add an Image that best describes your report (optional)"
				base64={""}
				error={ctaClicked}
				errorMsg="Business Logo is required"
			/>
		</form>
	);
	return (
		<ModalWrapper
			loading={isLoading}
			onClose={() => onClose()}
			ctaBtnType="sd"
			handleCta={modalContent.handleModalCta}
			heading={modalContent.heading}
			subHeading={modalContent.subHeading}
			ctaBtnText={modalContent.ctaText}
			ctaBtnColor={modalContent.ctaBtnColor}
			bottomCancelNeeded={modalContent.bottomCancelNeeded}
			secNegative={modalContent.secNegative}
			cancelBtnText={modalContent.secText}
			bottomSecAction={modalContent.bottomSecAction}
			handleBottomSecAction={modalContent.handleBottomSecAction}
		>
			<div className={styles.modal__wallet_details}>
				{currentLevel === "transaction" ? (
					<TransactionDetails />
				) : currentLevel === "report" ? (
					<ReportTransactionContent />
				) : currentLevel === "report-success" ? (
					<ActionFeedbackCard
						content={{
							success: true,
							title: "Your Report has been received",
							value:
                "Your case ID is 1234567890 , We have received your report and investigation will commence immediately, We are deeply sorry for any inconveniences.",
						}}
					/>
				) : (
					<></>
				)}
			</div>
		</ModalWrapper>
	)
}

export default WalletTransactionModal
