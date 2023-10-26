"use client";

<<<<<<< HEAD
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Search from "../Custom/Search";
import CustomSelect from "@/components/Custom/Select";
import tableStyles from "../../assets/styles/table.module.css";
import functions from "@/utils/functions";
import formStyles from "@/assets/styles/auth-screens.module.css";
import { useEffect, useState } from "react";
import ModalWrapper from "../Modal/ModalWrapper";
import Input from "../Dashboard/Input";
import FileUpload from "../FileUpload";
import ActionFeedbackCard from "../ActionFeedbackCard";
=======
import Link from "next/link"
import { useRouter, useSearchParams } from 'next/navigation'
import Search from "../Custom/Search"
import CustomSelect from "@/components/Custom/Select"
import tableStyles from "../../assets/styles/table.module.css"
import functions from "@/utils/functions"
import formStyles from '@/assets/styles/auth-screens.module.css'
import { useEffect, useState } from "react"
import ModalWrapper from "../Modal/ModalWrapper"
import Input from "../Dashboard/Input"
import Button from "../Btn/Button"
import FileUpload from "../FileUpload"
import ActionFeedbackCard from "../ActionFeedbackCard"
>>>>>>> d71ba410cfd3b9e75066bab8acc13845fbd910b8

const WalletTable = ({ title, action = "/", styles }) => {
  const { formatMoney, createUrl } = functions;
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [ctaClicked, setCtaClicked] = useState(false);
  const [transactionModal, setTransactionModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const transactionReportIssues = [
    "Frauduluent Activity",
    "Billing Descrepancy",
  ];
  const [modalContent, setModalContent] = useState({
    heading: "",
    subHeading: "",
  });
  const defineModalContents = (level) => {
    setTransactionModal(level);
    switch (level) {
      case "transaction":
        setModalContent({
          heading: "Transaction Details",
          subHeading: "See all the details about your transaction",
          ctaText: "Share",
          secText: "Report",
          secNegative: true,
          ctaBtnColor: "#009EC4",
          bottomCancelNeeded: true,
          bottomSecAction: true,
          handleBottomSecAction: () => {
            handleModalFlow("report");
          },
          handleModalCta: () => {
            console.log("shared");
          },
        });
        break;
      case "report":
        setModalContent({
          heading: "Report Transaction",
          subHeading: "Tell us anything you think went wrong",
          ctaText: "Submit",
          secText: "Back",
          bottomCancelNeeded: true,
          bottomSecAction: true,
          handleBottomSecAction: () => {
            handleModalFlow("transaction");
          },
          handleModalCta: () => {
            handleModalFlow("report-success");
          },
        });
        break;
      case "report-success":
        setModalContent({
          heading: "",
          subHeading: "",
          ctaText: "Return to Dashboard",
          bottomCancelNeeded: false,
          handleModalCta: () => {
            handleModalFlow();
          },
          // hasBottomActions: false
        });
    }
  };

  const handleModalFlow = (val) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (val) {
      newParams.set("transactionModal", val);
    } else {
      newParams.delete("transactionModal");
      newParams.delete("transactionId");
    }
    replace(createUrl("/dashboard/wallet", newParams));
  };

  // const handleModalCta = () => {}

  const handleBottomSecAction = () => {};

  const handleIssueSelect = () => {};

  useEffect(() => {
    defineModalContents(searchParams.get("transactionModal"));
  }, [searchParams.get("transactionModal")]);

  const TransactionDetails = () => (
    <div className={styles.modal__wallet_details_section}>
      <div className={styles.row}>
        <div className={styles.label}>Amount</div>
        <div className={styles.value}>
          <span className="text-blue uppercase">
            {formatMoney("2000000", "NGN")}
          </span>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Service fee</div>
        <div className={styles.value}>{formatMoney("100", "NGN")}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Date & Time</div>
        <div className={styles.value}>
          <span>
            Oct 15, 2023, <span>8:45 PM</span>
          </span>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Transaction ID</div>
        <div className={styles.value}>
          <span>TX1234567890</span>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Beneficiary Name</div>
        <div className={styles.value}>
          <span>XYZ123</span>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Beneficiary Account</div>
        <div className={styles.value}>
          <span>0123456789</span>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Beneficiary Institution</div>
        <div className={styles.value}>
          <span>GT Bank</span>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Transaction Type</div>
        <div className={styles.value}>
          <span className="incoming-circle" /> Incoming
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Transaction Method</div>
        <div className={styles.value}>
          <span>Bank Transfer</span>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Narration</div>
        <div className={styles.value}>
          <span>Flight Payment</span>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Booking Status</div>
        <div className={styles.value}>
          <div className="success-tag">Confirmed</div>
          <div className="pending-tag">Pending</div>
          <div className="failed-tag">Failed</div>
        </div>
      </div>
    </div>
  );

<<<<<<< HEAD
  const ReportTransactionContent = () => (
    <form className={formStyles.form}>
      <Input
        id="selectIssueType"
        label="Issue Type"
        placeholder="Select Issue Type"
        error={ctaClicked}
        errorMsg="Atleast one social media link is required"
      >
        <CustomSelect
          fieldError={false}
          selectOptions={transactionReportIssues}
          emitSelect={(s) => handleIssueSelect(s)}
        />
      </Input>
      <Input label="Description" error={false} errorMsg={""} id="description">
        <textarea
          placeholder="Tell us about this transaction"
          id="businessDesc"
          name="businessDesc"
          value={""}
          onChange={""}
        />
      </Input>
      <FileUpload
        subTitle="Add an Image that best describes your report (optional)"
        base64={""}
        handlefileUpload={(e) => setBusinessLogo(e)}
        error={ctaClicked}
        errorMsg="Business Logo is required"
      />
    </form>
  );
=======
	const ReportTransactionContent = () => (
		<form className={formStyles.form}>
			<Input
				id='selectIssueType'
				label='Issue Type'
				placeholder="Select Issue Type"
				error={ctaClicked}
				errorMsg='Atleast one social media link is required'
			>
				<CustomSelect
					fieldError={false}
					selectOptions={transactionReportIssues}
					emitSelect={(s) => handleIssueSelect(s)}
				/>
			</Input>
			<Input
				label="Description"
				error={false}
				errorMsg={''}
				id="description"
			>
				<textarea
					placeholder="Tell us about this transaction"
					id="businessDesc"
					name="businessDesc"
					value={''}
					onChange={''}
				/>
			</Input>
			<FileUpload
				subTitle='Add an Image that best describes your report (optional)'
				base64={''}
				handlefileUpload={(e)=>setBusinessLogo(e)}
				error={ctaClicked}
				errorMsg='Business Logo is required'
			/>
		</form>
	)
>>>>>>> d71ba410cfd3b9e75066bab8acc13845fbd910b8

  const TransactionModals = () => (
    <ModalWrapper
      loading={isLoading}
      onClose={() => handleModalFlow()}
      ctaBtnType="sd"
      handleCta={modalContent.handleModalCta}
      heading={modalContent.heading}
      subHeading={modalContent.subHeading}
      ctaBtnText={modalContent.ctaText}
      ctaBtnColor={modalContent.ctaBtnColor}
      bottomCancelNeeded={modalContent.bottomCancelNeeded}
      secNegative={modalContent.secNegative}
      cancelBtnText={modalContent.secText}
      bottomSecAction={modalContent.bottomSecAction}
      handleBottomSecAction={modalContent.handleBottomSecAction}
    >
      <div className={styles.modal__wallet_details}>
        {searchParams.get("transactionModal") === "transaction" ? (
          <TransactionDetails />
        ) : searchParams.get("transactionModal") === "report" ? (
          <ReportTransactionContent />
        ) : searchParams.get("transactionModal") === "report-success" ? (
          <ActionFeedbackCard
            content={{
              success: true,
              title: "Your Report has been received",
              value:
                "Your case ID is 1234567890 , We have received your report and investigation will commence immediately, We are deeply sorry for any inconveniences.",
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </ModalWrapper>
  );

  return (
    <>
      {searchParams.get("transactionModal") ? <TransactionModals /> : <></>}
      <div className={`table-ctn ${tableStyles.travel__dashboard_table}`}>
        <div className={tableStyles.table__outer}>
          <div className={tableStyles.table__header}>
            <div className="texts">
              <h3 className="capitalize"> Transaction History</h3>
              <p>Manage your transaction here</p>
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
                {[1, 2, 3, 4, 5, 6, 7].map((index, id) => (
                  <tr key={index}>
                    <td>
                      <div className={tableStyles.col}>
                        <h4>Daniel Russell</h4>
                        <p>1234567890</p>
                      </div>
                    </td>
                    <td>GT Bank</td>
                    <td className="text-bold">
                      {formatMoney("200000", "NGN")}
                    </td>
                    <td>
                      {index % 2 == 0 ? (
                        <>
                          <div className="incoming-circle" /> Incoming
                        </>
                      ) : (
                        <>
                          <div className="outgoing-circle" /> Outcoming
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
                      {/* <>
												<div className="pending-tag">Pending</div>
											</>

											<>
												<div className="completed-tag">Completed</div>
											</> */}

                      <>
                        <div className="failed-tag">Failed</div>
                      </>
                    </td>
                    <td>
                      <Link
                        className="secondary_btn outline_btn"
                        href={`/dashboard/wallet?transactionModal=transaction&transactionId=${id}`}
                      >
                        View Details
                      </Link>
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

<<<<<<< HEAD
export default WalletTable;
=======
										</td>
										<td>
											{/* <Link className="secondary_btn outline_btn"
												href={`/dashboard/wallet?transactionModal=transaction&transactionId=${id}`}>
                    			View Details
											</Link> */}
											<Button className='outline_btn secondary_btn'
												text='View Details'
												onClick={()=>handleModalFlow('transaction')}
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
	)
}

export default WalletTable
>>>>>>> d71ba410cfd3b9e75066bab8acc13845fbd910b8
