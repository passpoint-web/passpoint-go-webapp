"use client";

// import Link from "next/link";
// import Search from "../Custom/Search";
// import CustomSelect from "@/components/Custom/Select";
import tableStyles from "../../assets/styles/table.module.css";
import functions from "@/utils/functions";
import { detailedDate, timeFromDate, numericalDateDashReversed } from "@/utils/date-formats";
import WalletTransactionModal from "./WalletTransactionModal";
import { useEffect, useState } from "react";
// import ngBanks from "@/utils/ng-banks";
import Button from "../Btn/Button";
import CopyValue from "../CopyValue";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import Input from "../Dashboard/Input";
// import DateFilter from "../Tables/DateFilter";
// import Input from "../Dashboard/Input";
import Pagination from "../Tables/Pagination/WalletPagination";
import Select from "../Dashboard/Select";
import TableLoader from "../Tables/Loader";
// import Tab from "../Tab";

const WalletTable = ({wallet,  styles, updateKey }) => {
	const { formatMoney } = functions;
	const [transactions, setTransactions] = useState([])
	const [getDataLoading, setGetDataLoading] = useState(true)
	const [showTransactionModal, setShowTransactionModal] = useState(false)
	const [currentTransaction, setCurrentTransaction] = useState({})
	const transactionTypes = [
		'All',
		'Incoming',
		'Outgoing',
		'Payment'
	]

	// const [activeTab, setActiveTab] = useState('Wallet')

	// const tabs = ['Wallet', 'Payments']

	const [transactionType, setTransactionType] = useState(null)

	const [pagination, setPagination] = useState({
		currentPage: 1,
		totalPages: 0,
		limit: 10,
		totalData: 0,
		pageDataLength: 0,
		startDate: '2023-09-01',
		endDate: numericalDateDashReversed(new Date())
	})
	// eslint-disable-next-line no-unused-vars
	const getAllTransactions = async (
		pageNumber,
		currency = 'NGN' ,
		startDate,
		endDate,
		pageSize,
		type
	) => {
		let filters = {
			pageNumber,
			currency,
			startDate,
			endDate,
			pageSize
		}

		if (filters.startDate === '') {
			delete filters.startDate
		}
		if (filters.endDate === '') {
			delete filters.endDate
		}
		try {
			const response = await wallet.allTransactions({data: filters, type: type==='Incoming' ? 'collection' : type==='Outgoing' ? 'payout' : type==='Payment' ? 'billpayment' : 'all'})
			const {data} = response.data
			const {
				currentPage,
				pageCount,
				pageSize,
				totalCount
			} = response.data
			setPagination((prev)=>({
				...prev,
				currentPage,
				totalPages: pageCount,
				limit: pageSize,
				pageDataLength: data.length || 0,
				totalData: totalCount
			}))
			setTransactions(data)
		} catch (_err) {
			// console.log(_err)
		} finally {
			setGetDataLoading(false)
			//
		}
	}

	const handleCurrentTransaction = (val) => {
		setCurrentTransaction(val)
		setShowTransactionModal(true)
	}

	const handleEntry = (val) => {
		// getTransactions(1, 'NGN', pagination.startDate, pagination.endDate, val, transactionType, false)
		getAllTransactions(1, 'NGN', pagination.startDate, pagination.endDate, val, transactionType, false)
	}
	const handleTransactionType = (val)=> {
		setTransactionType(val)
		console.log(val)
		// getTransactions(1, 'NGN', pagination.startDate, pagination.endDate, pagination.limit, val, false)
		getAllTransactions(1, 'NGN', pagination.startDate, pagination.endDate, pagination.limit, val, false)
	}

	const setPage = (val) => {
		// getTransactions(val, 'NGN', pagination.startDate, pagination.endDate, pagination.limit, transactionType, false)
		getAllTransactions(val, 'NGN', pagination.startDate, pagination.endDate, pagination.limit, transactionType, false)
	}

	// useEffect(()=>{
	// 	getTransactions(pagination.currentPage, 'NGN', pagination.startDate, pagination.endDate, pagination.limit, transactionType, true)
	// },[])

	useEffect(()=>{
		// getTransactions(pagination.currentPage, 'NGN', pagination.startDate, pagination.endDate, pagination.limit, transactionType, true)
		getAllTransactions(pagination.currentPage, 'NGN', pagination.startDate, pagination.endDate, pagination.limit, transactionType, true)
	},[updateKey])

	// useEffect(()=>{
	// 	if (activeTab === 'Wallet') {
	// 		getTransactions(pagination.currentPage, 'NGN', pagination.startDate, pagination.endDate, pagination.limit, transactionType)
	// 	} else {
	// 		getServicesTransactions(pagination.currentPage, 'NGN', pagination.startDate, pagination.endDate, pagination.limit, 'all')
	// 	}
	// },[activeTab])

	const Filters = () => (
		<div className={tableStyles.filters}>

			{/* <Search id={"booking"}
							placeholder={"Search bookings"} />
						<CustomSelect
							id="status-type"
							selectOptions={["Confirmed", "Pending", "Failed"]}
							selectedOption={""}
							placeholder="Filter by Status"
						/>
							<DatePicker selected={startDate}
								onChange={(date) => setStartDate(date)} />
						<CustomSelect
							id="date-type"
							selectOptions={[]}
							selectedOption={""}
							placeholder="Filter by Date"
						/> */}
			<div style={{width: 200, maxWidth: 250}}>
				{
					// activeTab === 'Wallet' ?
					<Select
						placeholder='Transaction Type'
						// selectDisabled={activeTab === 'Payments'}
						selectPlaceHolder='Transaction Type'
						styleProps={{
							option: {
								height: 40
							},
							dropdown: {
								height: 100
							}
						}}
						selectOptions={transactionTypes}
						selectedOption={transactionType}
						emitSelect={(val)=>handleTransactionType(val)}
					/>
				// : <></>
				}
			</div>
		</div>
	)

	return (
		<>
			{showTransactionModal ? <WalletTransactionModal onClose={()=>setShowTransactionModal(false)}
				transaction={currentTransaction}
				styles={styles} tableStyles={tableStyles} /> : <></>}

			<div className={tableStyles.table_container}>
				{/* <Tab tabStyle={{marginLeft: 20}} setActiveTab={(tab)=>setActiveTab(tab)} activeTab={activeTab} tabs={tabs} /> */}
				<div className={`table-ctn ${tableStyles.wallet}`}>
					<div className={tableStyles.table__outer}>
						<div className={tableStyles.table__header}>
							<div className={tableStyles.top}>
								<div className="texts">
									<h3 className="capitalize"> Transaction History</h3>
									<p>Manage your
										{/* {activeTab} */}
									transaction here</p>
								</div>
								{Filters()}
							</div>
						</div>
						<div className={tableStyles.table__main}>
							{!getDataLoading ?
								<table>
									<thead>
										<tr className="table__header">

											<th>BENEFICIARY DETAILS</th>
											<th>BENEFICIARY BANK</th>

											<th>AMOUNT</th>
											<th>TYPE</th>
											<th>DATE &amp; TIME</th>
											<th>STATUS</th>
											<th>ACTION</th>
										</tr>
									</thead>
									<tbody>
										{transactions.map((data, id) => (
											<tr key={id}>
												<td className={tableStyles.td_4}>
													{
														<div className={tableStyles.col}>
															<h4>{data.beneficiaryAccountName?.length > 20 ? `${data.beneficiaryAccountName.substring(0, 18)}...` : data.beneficiaryAccountName}</h4>
															{
																data.beneficiaryAccountNumber !== 'PFL0000000' ?
																	<div className={tableStyles.accountNum}
																		style={{display: 'flex', gap: 10}}>
																		<p>{data.beneficiaryWalletId || data.beneficiaryAccountNumber}</p>
																		<CopyValue color="#009ec4"
																			value={data.beneficiaryWalletId || data.beneficiaryAccountNumber} />

																	</div>
																	:<></>
															}
														</div>
													}
												</td>
												<td className={tableStyles.td_3}>{data.beneficiaryBankName }</td>

												<td className={`${tableStyles.td_3} text-bold`}>
													{formatMoney(data.amount, data.currency)}
												</td>
												<td className={tableStyles.td_2}>
													{data.transactionCategory ==='PAYOUT' ?
														<>
															<span className="outgoing-circle" /> Outgoing
														</> : data.transactionCategory ==='COLLECTION' ?
															<>
																<span className="incoming-circle" /> Incoming
															</>
															: data.transactionCategory ==='BILL_PAYMENT' ?
																<>
																	<span className="payment-circle" /> Payment
																</> : <></>
													}
												</td>
												<td className={tableStyles.td_3}>
													<div className="date-time">
														<div className="date">
															{detailedDate(data.dateCreated)}
														</div>
														<div className="time">
															{timeFromDate(data.dateCreated)}
														</div>
													</div>
												</td>
												<td className={tableStyles.td_2}>
													{ <div className={`${data.transactionStatus?.toLowerCase()}-tag`}>{data.transactionStatus}</div>}
												</td>
												<td className={tableStyles.td_3}>
													<Button
														className="secondary_btn outline_btn"
														text="View Details"
														onClick={()=>handleCurrentTransaction(data)}
														// href={`/dashboard/wallet?transactionModal=transaction&transactionId=${id}`}
													/>
												</td>
											</tr>
										))}
									</tbody>
								</table> :
								<TableLoader rowLength={7} />
							}
						</div>
						<Pagination tableStyles={tableStyles}
							handleEntry={(val)=>handleEntry(val)}
							setPage={(val)=>setPage(val)}
							pagination={pagination} />
					</div>
				</div>
			</div>
		</>
	);
};

export default WalletTable;
