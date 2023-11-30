"use client"
import Search from "../Custom/Search"
import styles from "../../assets/styles/table.module.css"
import { useEffect, useState } from "react"
// eslint-disable-next-line no-unused-vars
import { travel } from "@/services/restService"
import { useNotify } from "@/utils/hooks"
import { numericalDateDashReversed } from "@/utils/date-formats";
import functions from "@/utils/functions"
// import Pagination from "./Pagination"
import Pagination from "../Tables/Pagination/WalletPagination";
// import Loader from "../Btn/Loader"
import { getCredentials } from "@/services/localService"
import FWLoader from "../FWLoader"
import Input from "../Dashboard/Input"
import FlightDetailsModal from "../Travel/FlightDetailsModal"
import Button from "../Btn/Button"
import { payment } from "@/services/restService/payment"
// eslint-disable-next-line no-unused-vars
import { duration } from "moment"

const FlightTable = ({ title, modalStyles }) => {
  const { formatMoney } = functions
  // eslint-disable-next-line no-unused-vars
  const user = getCredentials()
  const notify = useNotify()
  const [data, setData] = useState([])
  // const [paginationData, setPaginationData] = useState({})
  const [pagination, setPagination] = useState({
		currentPage: 1,
		totalPages: 0,
		limit: 10,
		totalData: 0,
		pageDataLength: 0,
		startDate: '2023-09-01',
		endDate: numericalDateDashReversed(new Date())
	})

  const [flightDetails, setFlightDetails] = useState({})
  const [flightDetailVisible, setFlightDetailVisible] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [searchParam, setSearchParam] = useState("")
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false)
  // eslint-disable-next-line no-unused-vars
  // const [getDataLoading, setGetDataLoading] = useState(true)

  const getFlightBookings = async (
    pageNumber,
		startDate,
		endDate,
		pageSize
    ) => {
    let filters = {
			pageNumber,
			startDate,
			endDate,
			pageSize
		}
    // remove undefined filters
		if (filters.startDate === '') {
			delete filters.startDate
		}
		if (filters.endDate === '') {
			delete filters.endDate
		}
    try {
      setIsLoading(true)
      const response = await payment.billPaymentHistory({
        service: "flight",
        data: filters
      })
      // console.log(response)
      const {data} = response.data
			const {
				currentPage,
				pageCount,
				pageSize,
				totalCount
			} = response.data
      // set pagination from data gotten
      setPagination((prev)=>({
				...prev,
				currentPage,
				totalPages: pageCount,
				limit: pageSize,
				pageDataLength: data.length || 0,
				totalData: totalCount
			}))
      // set table data
      setData(
      data.map((booking) => {
          const data = booking?.metadata
          const outbound = data?.passengers?.at(0)?.departureLeg?.at(0)
          const inbound = data?.passengers?.at(0)?.returnLeg?.at(0)

          // Get duration for inbound and outbound
          const outboundTime =
            (new Date(outbound?.arrivalTime).getTime() -
              new Date(outbound?.departureTime).getTime()) /
            1000 /
            60
          if (outbound) outbound.duration = outboundTime
          const inboundTime =
            (new Date(inbound?.arrivalTime).getTime() -
              new Date(inbound?.departureTime).getTime()) /
            1000 /
            60
          if (inbound) inbound.duration = inboundTime

          return {
            ...booking,
            ...data,
            outbound,
            inbound,
          }
        })
      )
    } catch (_err) {
      const { message } = _err.response?.data || _err
      notify("error", message)
    } finally {
      setIsLoading(false)
      // setGetDataLoading(false)
    }
  }

  const handleFlightDetails = (f) => {
    setFlightDetails(f)
    setFlightDetailVisible(true)
  }
  const handleEntry = (val) => {
    getFlightBookings(pagination.currentPage, pagination.startDate, pagination.endDate, val)
	}

  const setPage = (val) => {
		getFlightBookings(val, pagination.startDate, pagination.endDate, pagination.limit)
	}
 

  useEffect(() => {
    getFlightBookings(pagination.currentPage, pagination.startDate, pagination.endDate, pagination.limit)
  }, [searchParam])
  return (
    <>
      {flightDetailVisible ? (
        <FlightDetailsModal
          closeModal={() => setFlightDetailVisible(false)}
          styles={modalStyles}
          flightDetails={flightDetails}
        />
      ) : (
        <></>
      )}
      <div className={`table-ctn ${styles.travel__dashboard_table}`}>
        <div className={styles.table__outer}>
          <div className={styles.table__header}>
            <div className="texts">
              <h3 className="capitalize"> {title} Booking History</h3>
              <p>Manage your {title} bookings here</p>
            </div>

            {/* <Loader size={60} /> */}
            <Input>
              <Search
                id={"booking"}
                placeholder={"Search Booking ID"}
                search={searchParam}
                searchItem={setSearchParam}
              />
            </Input>
            {/* <CustomSelect
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
          /> */}
          </div>
          <div className={styles.table__main}>
            {isLoading && <FWLoader />}
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
                      {c.bookingReference || "No Reference"}
                    </td>
                    <td>{c.serviceType}</td>
                    <td>
                      <div className="date-time">
                        <div className="date">
                          {functions
                            .formatTimestamp(c.dateCreated)
                            .substring(4)}
                          , {functions.formatCustomTime(c.dateCreated)}
                        </div>
                        {/* <div className="time">8:45 PM</div> */}
                      </div>
                    </td>
                    <td>
                      <div
                        className={`${
                          c.pnrStatus?.toLowerCase() || "pending"
                        }-tag`}
                      >
                        {c.pnrStatus?.toLowerCase() || "Pending"}
                      </div>
                    </td>
                    <td className="text-bold">
                      {formatMoney(c.totalAmount, c.currency)}
                    </td>
                    <td>
                      {c.transactionStatus === "SUCCESSFUL" ? (
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
                      {/* <Se */}
                      {/* <Link
                      className="secondary_btn outline_btn"
                      href={`./flights?id=${c.reference}`}
                      onClick={() => setFlightDetails(c)}
                    >
                      View Details
                    </Link> */}
                      <Button
                        className="secondary_btn outline_btn"
                        text="View Details"
                        onClick={() => handleFlightDetails(c)}
                        // href={`/dashboard/wallet?transactionModal=transaction&transactionId=${id}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <Pagination
            tableStyles={styles}
            pagination={paginationData}
            currentPage={page + 1}
            handlePaginationEvent={handlePaginationEvent}
          /> */}
          <Pagination tableStyles={styles}
							handleEntry={(val)=>handleEntry(val)}
							setPage={(val)=>setPage(val)}
							pagination={pagination} />
          {/* <div className={styles.table__pagination}>
          Showing {data?.length} items out of {data?.length} results found
        </div> */}
        </div>
      </div>
    </>
  )
}

export default FlightTable
