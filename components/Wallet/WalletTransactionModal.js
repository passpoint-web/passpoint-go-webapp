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
import CopyValue from "../CopyValue";
import Tab from "../Tab";
// import FlightTimeline from "../Travel/FlightTimeline";

const WalletTransactionModal = ({onClose, tableStyles, styles, transaction}) => {
	const { formatMoney } = functions;
	const [currentLevel, setCurrentLevel] = useState('transaction')
	// const [errorMsg, setErrorMsg] = useState("");
	// eslint-disable-next-line no-unused-vars
	const [ctaClicked, setCtaClicked] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [isLoading, setIsLoading] = useState(false);
	const [activeTab, setActiveTab] = useState('General Info')
	const [metadata, setMetadata] = useState({})
	// eslint-disable-next-line no-unused-vars
	const [passengers, setPassengers] = useState([])
	const tabs = [
		'General Info',
		'Service Details'
	]
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

	useEffect(()=>{
		console.log(transaction)
		setMetadata(transaction?.metadata || {})
		setPassengers(transaction?.metadata?.passengers)
	},[transaction])

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

	// const FlightTimeline = () => (

// airlineLogo
// airlineName
// arrivalCode
// arrivalTime
// cabinType
// departureCode
// departureTime
// flightNumber
{/* <></> */}
	// )

	// flight service details
	// const FlightInfo = () => (
	// 	<div className={styles.fc__row_one}>
	// 	<div className={styles.fc__airline}>
	// 		<div
	// 			style={{
	// 				// backgroundImage: `url(${outbound?.at(0)?.airline_details?.logo})`,
	// 			}}
	// 		></div>
	// 		{/* <h6>{outbound?.[0]?.airline_details?.name}</h6> */}
	// 	</div>
	// 	{/* <FlightTimeline data={data} isOutbound /> */}
	// </div>
	// )
	const FlightServiceDetails = () => (
		<div className={styles.modal__wallet_details_section}>
		<div className={styles.row}>
			<div className={styles.label}>Service Type</div>
			<div className={`${styles.value} capitalize`}>
				<span>
					{metadata?.serviceType}
				</span>
			</div>
		</div>
		<div className={styles.row}>
			<div className={styles.label}>Amount</div>
			<div className={styles.value}>
				<span className="text-blue uppercase">
					{formatMoney(transaction.amount, transaction.currency)}
				</span>
			</div>
		</div>
		<div className={styles.row}>
			<div className={styles.label}>Booking Status</div>
			<div className={styles.value}>
				{<div className={`${transaction.transactionStatus?.toLowerCase()}-tag`}>{transaction.transactionStatus}</div>}
			</div>
		</div>
		<div className={styles.row}>
			<div className={styles.label}>Date Issued</div>
			<div className={styles.value}>
				<span>
					{detailedDate(metadata?.dateFlightIssued)}
				</span>
			</div>
		</div>
		<div className={styles.row}>
			<div className={styles.label}>Ticket Status</div>
			<div className={styles.value}>
				<span className={`${metadata?.ticketStatus}-tag`}>
					{metadata?.ticketStatus}
				</span>
			</div>
		</div>
		<div className={styles.row}>
			<div className={styles.label}>PNR</div>
			<div className={styles.value}>
				<span>
					{metadata?.pnr}
				</span>
			</div>
		</div>
		<div className={styles.row}>
			<div className={styles.label}>Biller Reference</div>
			<div className={styles.value}>
				<span>
					{metadata?.billerRef}
				</span>
			</div>
		</div>
		{/* <FlightInfo /> */}
		<div className={tableStyles.table_container}>
			{/* <Tab tabStyle={{marginLeft: 20}} setActiveTab={(tab)=>setActiveTab(tab)} activeTab={activeTab} tabs={tabs} /> */}
			<div className={`table-ctn ${tableStyles.wallet}`}>
				<div className={tableStyles.table__outer}>
					<div className={tableStyles.table__header}>
						<div className={tableStyles.top}>
							<div className="texts">
								<h3 className="capitalize"> Passenger Details</h3>
							</div>
						</div>
					</div>
					<div className={tableStyles.table__main}>
							<table>
								<thead>
									<tr className="table__header">
										<th className={tableStyles.td_3}>FULL NAME</th>
										<th className={tableStyles.td_3}>EMAIL</th>
										<th className={tableStyles.td_3}>PHONE</th>
										<th className={tableStyles.td_3}>TYPE-GENDER</th>
										<th className={tableStyles.td_3}>DOB</th>
										<th className={tableStyles.td_3}>TICKET NUMBER</th>
									</tr>
								</thead>
								<tbody>
									{passengers?.map((data, id) => (
										<tr key={id}>
											<td className={tableStyles.td_3}>{data.firstName} {data.lastName}</td>
											<td className={tableStyles.td_3}>{data.email}</td>
											<td className={tableStyles.td_3}>{data.phoneNumber}</td>
											<td className={`${tableStyles.td_3} uppercase`}>{data.passengerType} - {data.gender}</td>
											<td className={tableStyles.td_3}>{detailedDate(data.dateOfBirth)}</td>
											<td className={tableStyles.td_3}>{data.ticketNumber}</td>
										</tr>
									))}
								</tbody>
							</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	)

	const TransactionDetails = () => (
		<>
		{
			transaction.transactionCategory === 'BILL_PAYMENT' ? <Tab tabs={tabs} activeTab={activeTab} setActiveTab={(e)=>setActiveTab(e)} /> : <></>
		}
		{ activeTab === 'General Info' ?
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
				<div className={styles.value}>{formatMoney(transaction.charges, transaction.currency)}</div>
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
					{transaction.transactionId}
				</div>
			</div>
			{transaction.transactionCategory !== 'BILL_PAYMENT' ?
				<>
					<div className={styles.row}>
						<div className={styles.label}>Beneficiary Name</div>
						<div className={styles.value}>
							<span>{transaction.beneficiaryAccountName}</span>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>{transaction.beneficiaryWalletId ? 'Beneficiary Wallet ID' : 'Beneficiary Account'}</div>
						<div className={styles.value}
							style={{display: 'flex', gap: 10, alignItems: 'center'}}>
							<span>{transaction.beneficiaryWalletId || transaction.beneficiaryAccountNumber}</span>
							<CopyValue color="#009ec4"
								value={transaction.beneficiaryWalletId || transaction.beneficiaryAccountNumber} />
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>Beneficiary Institution</div>
						<div className={styles.value}>
							<span>{transaction.beneficiaryBankName}</span>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>Sender Details</div>
						<div className={styles.value}>
							<span>{transaction.senderAccountName} / {transaction.senderAccountNumber} / {transaction.senderBankName}</span>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>Sender Account Name</div>
						<div className={styles.value}>
							<span>{transaction.senderAccountName}</span>
						</div>
					</div>
				</> :
				<>
					<div className={styles.row}>
						<div className={styles.label}>Payment Ref</div>
						<div className={styles.value}>
							<span>{transaction.paymentRef}</span>
						</div>
					</div>
				</>
			}
			<div className={styles.row}>
				<div className={styles.label}>Transaction Type</div>
				<div className={styles.value}>
					{transaction.transactionCategory ==='PAYOUT' ?
						<>
							<div className="outgoing-circle" /> Outgoing
						</> : transaction.transactionCategory ==='COLLECTION' ?
							<>
								<div className="incoming-circle" /> Incoming
							</> : transaction.transactionCategory ==='BILL_PAYMENT' ?
								<>
									<div className="payment-circle" /> Payment
								</> : <></>
					}
				</div>
			</div>
			{ transaction.transactionCategory === 'BILL_PAYMENT' ?
				<div className={styles.row}>
					<div className={styles.label}>Service Type</div>
					<div className={`${styles.value} capitalize`}>
						<span>{metadata?.serviceType}</span>
					</div>
				</div> : <></>
			}
			<div className={styles.row}>
				<div className={styles.label}>Transaction Method</div>
				<div className={styles.value}>
					<span>Bank Transfer</span>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.label}>Narration</div>
				<div className={styles.value}>
					{transaction.narration}
				</div>
			</div>
		</div> :
	<FlightServiceDetails />
		}
		</>
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

	// MAIN
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
			width={'700px'}
			bottomCancelNeeded={modalContent.bottomCancelNeeded}
			secNegative={modalContent.secNegative}
			hasBottomActions={false}
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
							status: 'success',
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
