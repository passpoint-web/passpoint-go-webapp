
'use client'

import Link from "next/link"
import Search from "../Custom/Search"
import CustomSelect from '@/components/Custom/Select'
import styles from '../../assets/styles/table.module.css'

const CustomTable = ({ title, data, action = "/" }) => {
  return (
      <div className={`table-ctn ${styles.travel__dashboard_table}`}>
        <div className={styles.table__outer}>
          <div className={styles.table__header}>
            <div className="texts">
              <h3 className="text-capitalize"> {title} Booking History</h3>
              <p>Manage your {title} bookings here</p>
            </div>

            <Search
              id={'booking'}
              placeholder={'Search bookings'}
            />
            <CustomSelect
              id="status-type"
              selectOptions={[]}
              selectedOption={''}
              placeholder="Filter by Status"
            />
            <CustomSelect
              id="date-type"
              selectOptions={[]}
              selectedOption={''}
              placeholder="Filter by Date"
            />
          </div>
          <div className={styles.table__main}>
            <table>
              <tr className="table__header">
                <th>BOOKING ID</th>
                <th>SERVICE</th>
                <th>DATE &amp; TIME</th>
                <th>BOOKING STATUS</th>
                <th>AMOUNT</th>
                <th>PAYMENT STATUS</th>
                <th>ACTION</th>
              </tr>
              {[1, 2, 3, 4, 5].map(index => <tr key={index}>
                <td>
                  AH12345678
                </td>
                <td>
                  Flights
                </td>
                <td>
                  Value
                </td>
                <td>
                  Confirmed
                </td>
                <td>
                  ₦200,000
                </td>
                <td>
                  Paid
                </td>
                <td>
                  <Link className="secondary_btn outline_btn" href={action}>View Details</Link>
                </td>
              </tr>)}
            </table>
          </div>
          <div className={styles.table__pagination}>
            Showing 10 items out of 250 results found
          </div>
        </div>
      </div>
  )
}

export default CustomTable
