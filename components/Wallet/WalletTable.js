"use client";

import Link from "next/link";
import Search from "../Custom/Search";
import CustomSelect from "@/components/Custom/Select";
import tableStyles from "../../assets/styles/table.module.css";
import functions from "@/utils/functions";
import { detailedDate, timeFromDate } from "@/utils/date-formats";
import WalletTransactionModal from "./WalletTransactionModal";
import { useEffect, useState } from "react";
import ngBanks from "@/utils/ng-banks";
import Button from "../Btn/Button";
import CopyValue from "../CopyValue";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import Input from "../Dashboard/Input";
import DateFilter from "../Tables/DateFilter";
import Input from "../Dashboard/Input";

const WalletTable = ({wallet,  styles }) => {
	const { formatMoney } = functions;
	const [transactions, setTransactions] = useState([])
	const [showTransactionModal, setShowTransactionModal] = useState(false)
	const [currentTransaction, setCurrentTransaction] = useState({})
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	const getTransactions = async () => {
		try {
			const filters = {
				"startDate":"2023-10-15",
				"endDate":"2023-10-30",
				"currency":"NGN",
				"pageNumber":"1",
				"pageSize":""
			}
			const response = await wallet.transactions(filters)
			const {data} = response.data
			const transactions = data.map((e)=>{
				const bankName = ngBanks().find(f=>f.displayCode == e.beneficiaryBankCode)?.name || 'Passpoint Wallet'
				e.beneficiaryBankName = bankName
				return e
			})
			setTransactions(transactions)
			// console.log(transactions[0])
		} catch (_err) {
			console.log(_err)
		} finally {
			//
		}
	}

	const handleCurrentTransaction = (val) => {
		setCurrentTransaction(val)
		setShowTransactionModal(true)
	}

	useEffect(()=>{
		getTransactions()
	},[])
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
											{ data.finalResponseMessage.toLowerCase().includes('pending') ?
												<div className="pending-tag">Pending</div> :
												data.finalResponseMessage.toLowerCase().includes('success') ?
													<div className="completed-tag">Completed</div> :
													data.finalResponseMessage.toLowerCase().includes('failed') ?
														<div className="failed-tag">Failed</div> : <></>
											}
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
					<div className={tableStyles.table__pagination}>
            Showing 10 items out of 250 results found
					</div>
				</div>
			</div>
		</>
	);
};

export default WalletTable;
