"use client"
import Link from "next/link"
import Search from "../Custom/Search"
import CustomSelect from "@/components/Custom/Select"
import styles from "../../assets/styles/table.module.css"
import { useEffect, useState } from "react"
import { travel } from "@/services/restService"
import { useNotify } from "@/utils/hooks"
import functions from "@/utils/functions"

const FlightTable = ({ title, setFlightDetails }) => {
  const { formatMoney } = functions
  const notify = useNotify()
  const [data, setData] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(100)
  const getFlightBookings = async () => {
    try {
      const response = await travel.getFlightBookings({ page, pageSize })
      const { content } = response.data.data
      if (content) {
        setData(content)
      }
    } catch (_err) {
      const { message } = _err.response?.data || _err
      notify("error", message)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getFlightBookings()
  }, [])
  return (
    <div className={`table-ctn ${styles.travel__dashboard_table}`}>
      <div className={styles.table__outer}>
        <div className={styles.table__header}>
          <div className="texts">
            <h3 className="capitalize"> {title} Booking History</h3>
            <p>Manage your {title} bookings here</p>
          </div>

          <Search id={"booking"} placeholder={"Search Booking ID"} />
          <CustomSelect
            id="status-type"
            selectOptions={["Confirmed", "Pending", "Failed"]}
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
                <th>BOOKING ID</th>
                <th>SERVICE</th>
                <th>DATE &amp; TIME</th>
                <th>BOOKING STATUS</th>
                <th>AMOUNT</th>
                <th>PAYMENT STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {data.map((c, i) => (
                <tr key={i}>
                  <td className="text-bold text-blue">
                    {c.reference || "No Reference"}
                  </td>
                  <td>Flights</td>
                  <td>
                    <div className="date-time">
                      <div className="date">
                        {functions.formatTimestamp(c.createdDate).substring(4)},{" "}
                        {functions.formatCustomTime(c.createdDate)}
                      </div>
                      {/* <div className="time">8:45 PM</div> */}
                    </div>
                  </td>
                  <td>
                    {c.status.toLowerCase() === "success" && (
                      <div className="success-tag">Success</div>
                    )}
                    {c.status.toLowerCase() === "pending" && (
                      <div className="pending-tag">Pending</div>
                    )}
                  </td>
                  <td className="text-bold">
                    {formatMoney(c.amount, c.currency)}
                  </td>
                  <td>
                    {c.amount ? (
                      <>
                        <div className="success-circle" /> Paid
                      </>
                    ) : (
                      <>
                        <div className="pending-circle" /> Not yet paid
                      </>
                    )}
                  </td>
                  <td>
                    <Link
                      className="secondary_btn outline_btn"
                      href={`./flights?id=${c.reference}`}
                      onClick={() => setFlightDetails(c)}
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.table__pagination}>
          Showing {data?.length} items out of {data?.length} results found
        </div>
      </div>
    </div>
  )
}

export default FlightTable
