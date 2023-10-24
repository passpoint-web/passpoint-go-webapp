"use client";
import Link from "next/link";
import Search from "../Custom/Search";
import CustomSelect from "@/components/Custom/Select";
import styles from "../../assets/styles/table.module.css";
import { useEffect, useState } from "react";
import { travel } from "@/services/restService";
import { useNotify } from "@/utils/hooks";
import functions from "@/utils/functions";

const FlightTable = ({ title }) => {
  const { formatMoney } = functions;
  const notify = useNotify();
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(10);
  const getFlightBookings = async () => {
    try {
      const response = await travel.getFlightBookings({ page, pageSize });
      console.log(response.data.data);
      const { content } = response.data.data;
      console.log(content);
      if (content) {
        setData(content);
      }
    } catch (_err) {
      const { message } = _err.response?.data || _err;
      notify("error", message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getFlightBookings();
  }, []);
  return (
    <div className={`table-ctn ${styles.travel__dashboard_table}`}>
      <div className={styles.table__outer}>
        <div className={styles.table__header}>
          <div className="texts">
            <h3 className="capitalize"> {title} Booking History</h3>
            <p>Manage your {title} bookings here</p>
          </div>

          <Search id={"booking"} placeholder={"Search bookings"} />
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
                  <td className="text-bold text-blue">{c.reference}</td>
                  <td>Flights</td>
                  <td>
                    {"--"}
                    <div className="date-time">
                      {/* <div className="date">Feb 15, 2020</div> */}
                      {/* <div className="time">8:45 PM</div> */}
                    </div>
                  </td>
                  <td>
                    {"--"}
                    {/* <div className="success-tag">Confirmed</div> */}
                    {/* <div className="pending-tag">Pending</div> */}
                  </td>
                  <td className="text-bold">
                    {formatMoney(c.amount, c.currency)}
                  </td>
                  <td>
                    {"--"}
                    {/* <div className="pending-circle" /> Not yet paid */}

                    {/* <div className="success-circle" /> Paid */}
                  </td>
                  <td>
                    <Link
                      className="secondary_btn outline_btn"
                      href={`./flights?id=${c.id}`}
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
          Showing 10 items out of 250 results found
        </div>
      </div>
    </div>
  );
};

export default FlightTable;
