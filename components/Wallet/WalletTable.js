"use client"

import Link from "next/link"
import Search from "../Custom/Search"
import CustomSelect from "@/components/Custom/Select"
import styles from "../../assets/styles/table.module.css"
import functions from "@/utils/functions"

const WalletTable = ({ title, action = "/" }) => {
  const randomValue =()=> Math.floor(Math.random() * 10) + 1
  const {formatMoney} = functions
	return (
		<div className={`table-ctn ${styles.travel__dashboard_table}`}>
			<div className={styles.table__outer}>
				<div className={styles.table__header}>
					<div className="texts">
						<h3 className="capitalize"> Transaction History</h3>
						<p>Manage your transaction here</p>
					</div>

					<Search id={"booking"} placeholder={"Search bookings"} />
					<CustomSelect
						id="status-type"
						selectOptions={['Confirmed', 'Pending', 'Failed']}
						selectedOption={""}
						placeholder="Filter by Status"
					/>
					<CustomSelect
						id="date-type"
						selectOptions={[]}
						selectedOption={""}
						placeholder="Filter by Date"
					/>
				</div>
				<div className={styles.table__main}>
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
							{[1, 2, 3, 4, 5, 6, 7].map((index) => (
								<tr key={index}>
									<td>
                    <div className={styles.col}>
                      <h4>Daniel Russell</h4>
                      <p>1234567890</p>
                    </div>
                  </td>
									<td>GT Bank</td>
									<td className="text-bold">{formatMoney('200000', 'NGN')}</td>
									<td>
										{index % 2 == 0 ? (
											<>
												<div className="incoming-circle" /> Not yet paid
											</>
										) : (
											<>
												<div className="outgoing-circle" /> Paid
											</>
										)}
									</td>
                  <td>
										<div className="date-time">
											<div className="date">Feb 15, 2020</div>
											<div className="time">8:45 PM</div>
										</div>
									</td>
                  <td>
									
											<>
												<div className="pending-tag">Pending</div>
											</>
										
											<>
												<div className="completed-tag">Completed</div>
											</>
                     
                       <>
                          <div className="failed-tag">Failed</div>
                       </>
										
									</td>
									<td>
										<Link className="secondary_btn outline_btn" href={action}>
                    View Details
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className={styles.table__pagination}>
          Showing 10 items out of 250 results found
				</div>
			</div>
		</div>
	)
}

export default WalletTable
