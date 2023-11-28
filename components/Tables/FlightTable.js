"use client"
import Search from "../Custom/Search"
import styles from "../../assets/styles/table.module.css"
import { useEffect, useState } from "react"
import { travel } from "@/services/restService"
import { useNotify } from "@/utils/hooks"
import functions from "@/utils/functions"
import Pagination from "./Pagination"
// import Loader from "../Btn/Loader"
import { getCredentials } from "@/services/localService"
import FWLoader from "../FWLoader"
import Input from "../Dashboard/Input"
import FlightDetailsModal from "../Travel/FlightDetailsModal"
import Button from "../Btn/Button"
import { payment } from "@/services/restService/payment"

const FlightTable = ({title, modalStyles}) => {
  const { formatMoney } = functions
  const user = getCredentials()
  const notify = useNotify()
  const [data, setData] = useState([])
  const [paginationData, setPaginationData] = useState({})
  const [flightDetails, setFlightDetails] = useState({})
  const [flightDetailVisible, setFlightDetailVisible] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [searchParam, setSearchParam] = useState("")
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [getDataLoading, setGetDataLoading] = useState(true)
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(10)
  const getFlightBookings = async (goToPage) => {
    try {
      setIsLoading(true)
      // const response = await travel.getFlightBookings({
      //   email: user.email,
      //   page: goToPage,
      //   pageSize,
      //   searchParam,
      // })
      const response = await payment.billPaymentHistory({
        service: 'flight',
        data: {
          "startDate":"2023-10-15",
          "endDate": '2023-11-30',
          pageNumber: 1,
          pageSize
        }
      })
      console.log(response)
      // const { content } = response.data.data
      // if (content) {
      //   setData(content)
      // }

      // Compile Pagination Data
      // const tempPaginationData = {
      //   ...response.data.data,
      //   pageSize,
      //   currentPage: page + 1,
      // }
      // delete tempPaginationData.content
      // setPaginationData(tempPaginationData)
      // setIsLoading(false)
    } catch (_err) {
      const { message } = _err.response?.data || _err
      notify("error", message)
    } finally {
      setIsLoading(false)
      setGetDataLoading(false)
    }
  }

  const handleFlightDetails = (f) => {
    setFlightDetails(f)
    setFlightDetailVisible(true)
  }

  const handlePaginationEvent = (symbol) => {
    const currentPage = symbol === "+" ? page + 1 : page - 1
    setPage(currentPage)
    getFlightBookings(currentPage)
  }

  useEffect(() => {
    getFlightBookings(page)
  }, [searchParam])
  return (

  <>
    {flightDetailVisible ? (
      <FlightDetailsModal
      closeModal={()=>setFlightDetailVisible(false)}
        styles={modalStyles}
        flightDetails={flightDetails}
      />
    ) : <></>}
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
                    <div className={`${c.status.toLowerCase()}-tag`}>
                      {c.status.toLowerCase()}
                    </div>
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
												onClick={()=>handleFlightDetails(c)}
												// href={`/dashboard/wallet?transactionModal=transaction&transactionId=${id}`}
											/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          tableStyles={styles}
          pagination={paginationData}
          currentPage={page + 1}
          handlePaginationEvent={handlePaginationEvent}
        />
        {/* <div className={styles.table__pagination}>
          Showing {data?.length} items out of {data?.length} results found
        </div> */}
      </div>
    </div>
    </>
  )
}

export default FlightTable
