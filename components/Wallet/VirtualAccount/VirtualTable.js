"use client";
import Link from "next/link";
import styles from "../../../assets/styles/table.module.css";
import Search from "@/components/Custom/Search";
import CustomSelect from "@/components/Custom/Select";

const VirtualTable = ({ title, action = "/" }) => {
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
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
                <tr key={index}>
                  <td className="text-bold text-blue">AH12345678</td>
                  <td>Flights</td>
                  <td>
                    <div className="date-time">
                      <div className="date">Feb 15, 2020</div>
                      <div className="time">8:45 PM</div>
                    </div>
                  </td>
                  <td>
                    {index % 3 == 0 ? (
                      <>
                        <div className="pending-tag">Pending</div>
                      </>
                    ) : (
                      <>
                        <div className="success-tag">Confirmed</div>
                      </>
                    )}
                  </td>
                  <td className="text-bold">₦200,000</td>
                  <td>
                    {index % 2 == 0 ? (
                      <>
                        <div className="pending-circle" /> Not yet paid
                      </>
                    ) : (
                      <>
                        <div className="success-circle" /> Paid
                      </>
                    )}
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
  );
};

export default VirtualTable;
