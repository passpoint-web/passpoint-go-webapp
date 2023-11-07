"use client";

// import Link from "next/link";
// import Search from "../Custom/Search";
// import CustomSelect from "@/components/Custom/Select";
import tableStyles from "../../assets/styles/table.module.css";
import functions from "@/utils/functions";
import { detailedDate, timeFromDate } from "@/utils/date-formats";
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
import { numericalDateDashReversed } from "@/utils/date-formats";
import Pagination from "../Tables/Pagination";
import Select from "../Dashboard/Select";

const WalletTable = ({wallet,  styles }) => {
	const { formatMoney } = functions;
	const [transactions, setTransactions] = useState([])
	const [showTransactionModal, setShowTransactionModal] = useState(false)
	const [currentTransaction, setCurrentTransaction] = useState({})
	const transactionTypes = [
		'Incoming',
		'Outgoing'
	]

	const [transactionType, setTransactionType] = useState(null)

	const [pagination, setPagination] = useState({
		currentPage: 2,
		totalPages: 0,
		limit: 10,
		totalData: 0,
		pageDataLength: 0,
		startDate: '2023-10-15',
		endDate: numericalDateDashReversed(new Date())
	})
	const getTransactions = async (

		pageNumber,
		currency = 'NGN' ,
		startDate,
		endDate,
		pageSize,
		type
	) => {
		const filters = {
			pageNumber,
			currency,
			startDate,
			endDate,
			pageSize
		}
		try {
			const response = await wallet.transactions({data: filters, type: type==='Incoming' ? 'collection' : type==='Outgoing' ? 'payout' : 'all'})
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
			//
		}
	}

	const handleCurrentTransaction = (val) => {
		setCurrentTransaction(val)
		setShowTransactionModal(true)
	}

	const handleEntry = (val) => {
		getTransactions(1, 'NGN', pagination.startDate, pagination.endDate, val, transactionType)
	}
	const handleTransactionType = (val)=> {
		setTransactionType(val)
		getTransactions(1, 'NGN', pagination.startDate, pagination.endDate, pagination.limit, val)
	}

	const setPage = (val) => {
		getTransactions(val, 'NGN', pagination.startDate, pagination.endDate, pagination.limit, transactionType)
	}
	useEffect(()=>{
		getTransactions(pagination.currentPage, 'NGN', pagination.startDate, pagination.endDate, pagination.limit, transactionType)
	},[])

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
				<Select
					placeholder='Transaction Type'
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
				</div>
		</div>
	)

	return (
		<>
			{showTransactionModal ? <WalletTransactionModal onClose={()=>setShowTransactionModal(false)}
				transaction={currentTransaction}
				styles={styles} /> : <></>}
			<div className={`table-ctn ${tableStyles.travel__dashboard_table}`}>
				<div className={tableStyles.table__outer}>
					<div className={tableStyles.table__header}>
						<div className="texts">
							<h3 className="capitalize"> Transaction History</h3>
							<p>Manage your transaction here</p>
						</div>
						{Filters()}
					</div>
					<div className={tableStyles.table__main}>
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
											<div className={tableStyles.col}>
												<h4>{data.beneficiaryAccountName.length > 20 ? `${data.beneficiaryAccountName.substring(0, 18)}...` : data.beneficiaryAccountName}</h4>
												<div className={tableStyles.accountNum}
													style={{display: 'flex', gap: 10}}>
													<p>{data.beneficiaryWalletId || data.beneficiaryAccountNumber}</p>
													<CopyValue color="#009ec4"
														value={data.beneficiaryWalletId || data.beneficiaryAccountNumber} />
												</div>
											</div>
										</td>
										<td className={tableStyles.td_3}>{data.beneficiaryBankName}</td>
										<td className={`${tableStyles.td_3} text-bold`}>
											{formatMoney(data.amount, data.currency)}
										</td>
										<td className={tableStyles.td_2}>
											{data.transactionCategory ==='PAYOUT' ?
												<>
													<span className="outgoing-circle" /> Outgoing
												</> :
												<>
													<span className="incoming-circle" /> Incoming
												</>
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
						</table>
					</div>
					<Pagination tableStyles={tableStyles}
						handleEntry={(val)=>handleEntry(val)}
						setPage={(val)=>setPage(val)}
						pagination={pagination} />
				</div>
			</div>
		</>
	);
};

export default WalletTable;
