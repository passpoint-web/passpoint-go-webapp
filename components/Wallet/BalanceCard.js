"use client"
import Button from "../Btn/Button"
import BorderIconBtn from "../Btn/BorderIconBtn"
import { useRouter, useSearchParams } from "next/navigation"
import AddMoneyModal from "./AddMoneyModal"
import TransferModals from "./TransferModals"
import CopyValue from "../Copy/CopyValue"
import { AddMoneyIcon, WithdrawMoneyIcon } from "@/constants/icons"
import CreatePinModal from "../Modal/CreatePin"
import { useNotify } from "@/utils/hooks"
import { useEffect, useState } from "react"
import functions from "@/utils/functions"
import { EyeClose, EyeOpen } from "@/constants/icons"
import Select from "../Dashboard/Select"

const BalanceCard = ({
  dataLoading,
  walletBalance,
  walletDetails,
  walletAccount,
  wallet,
  styles,
  updateWalletState,
  onUpdateCurrency,
  currencies,
}) => {
  const notify = useNotify()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const { formatMoney, maskValue } = functions
  const [showBalance, setShowBalance] = useState(true)
  const [pinResetLoading, setPinResetLoading] = useState(false)
  const [reference, setReference] = useState("")
  const [currentModal, setCurrentModal] = useState(null)
  const [selectedCurrency, setSelectedCurrency] = useState("NGN Wallet")

  const initiatePinReset = async (e, boo) => {
    e.preventDefault()
    setPinResetLoading(true)
    try {
      const response = await wallet.initiatePin(boo)
      const { reference } = response.data
      setReference(reference)
      setCurrentModal("create pin")
    } catch (_err) {
      const { responseMessage = undefined, message = undefined } =
        _err.response?.data || _err
      if (responseMessage || message) {
        notify("error", responseMessage || message)
      }
    } finally {
      setPinResetLoading(false)
    }
  }

  const closeAddMoneyModal = () => {
    setCurrentModal(null)
    replace("/wallet")
  }

  const updateCurrency = (currency) => {
    setSelectedCurrency(currency)
    onUpdateCurrency(currency?.substring(0, 3))
  }

  useEffect(() => {
    if (searchParams.get("add-money") === "true") {
      setCurrentModal("add money")
    }
  }, [searchParams.get("add-money")])

  return (
    <>
      {currentModal === "create pin" ? (
        <CreatePinModal
          handlePinCreation={() => setCurrentModal(null)}
          reference={reference}
          pinCreated={walletDetails.pinCreated}
          onClose={() => setCurrentModal(null)}
        />
      ) : currentModal === "add money" ? (
        <AddMoneyModal
          walletAccount={walletAccount}
          styles={styles}
          onClose={() => closeAddMoneyModal()}
        />
      ) : currentModal === "transfer" ? (
        <TransferModals
          styles={styles}
          currencies={Object.keys(walletDetails?.walletAccount)}
          walletAccounts={walletDetails.walletAccount}
          onClose={() => setCurrentModal(null)}
          updateWalletState={() => updateWalletState()}
        />
      ) : (
        <></>
      )}
      {!dataLoading ? (
        <div
          className={`${styles.balance_card} wallet_balance_card ${
            styles[selectedCurrency?.slice(0, 3)]
          }`}
        >
          <div className={styles.lhs}>
            <div className={styles.balance_ctn}>
              <div className={styles.available_balance}>
                <div className="dropdown-ctn max-w-[180px]">
                  <Select
                    label=""
                    id="class"
                    styleProps={{
                      dropdown: {
                        height: 250,
                      },
                    }}
                    selectOptions={currencies?.map((c) => `${c.code} Wallet`)}
                    selectedOption={selectedCurrency}
                    noShadow
                    countries
                    emitSelect={(option) => updateCurrency(option)}
                  />
                </div>
                {/* <Select
                  height={50}
                  width={250}
                  color="#000000"
                  focusBorderColor="#FFF"
                  variant="filled"
                  textColor="#000000"
                  iconColor="#000000"
                >
                  {currencies?.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency} Wallet
                    </option>
                  ))}
                </Select> */}
                <h4 className="mt-4">Available Balance</h4>
                <div className={styles.balance}>
                  <h1 className={!showBalance ? styles.hide_balance : ""}>
                    {showBalance
                      ? formatMoney(
                          walletBalance?.availableBalance,
                          walletBalance?.currency
                        )
                      : maskValue(walletAccount?.availableBalance)}
                  </h1>
                  <div className={styles.card_action}>
                    <button onClick={() => setShowBalance(!showBalance)}>
                      {!showBalance ? <EyeOpen /> : <EyeClose />}
                    </button>
                    {/* <RefreshBtn refreshing={balanceLoading} onClick={()=>updateBalanceState()} /> */}
                  </div>
                </div>
              </div>
              {/* <div className={styles.ledger_balance}>
							<h4>Ledger Balance</h4>
							<div className={styles.balance}>
								<h3 className={!showBalance ? styles.hide_balance : ''}>
									{showBalance ? formatMoney(walletAccount.ledgerBalance, 'NGN') : maskValue(walletAccount.availableBalance)}
								</h3>
							</div>
						</div> */}
            </div>
            <div className={styles.btn_sec}>
              <BorderIconBtn
                bdColor="#fff"
                classProps="border i sd"
                onClick={() => setCurrentModal("add money")}
                icon={<AddMoneyIcon />}
                text="Add money"
              />
              <BorderIconBtn
                bgColor="#fff"
                classProps="no-border i sd"
                styleProps={{ color: "#000" }}
                // loading={pinCheckLoading}
                onClick={() => setCurrentModal("transfer")}
                icon={<WithdrawMoneyIcon />}
                text="Transfer"
              />
            </div>
          </div>
          <div className={styles.rhs}>
            {/* <div className={styles.top}>
							<BorderIconBtn
								classProps='no-border i sd'
							>
								<AlertIcon /> Set Alert
							</BorderIconBtn>
						</div> */}
            <div className={styles.account}>
              <div>
                <h4>Account Name</h4>
                <h3>{walletAccount.accountName}</h3>
              </div>
              <div className="mb-8">
                <h4>{walletAccount.bankName}</h4>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <h3>{walletAccount.accountNumber}</h3>
                  <CopyValue value={walletAccount.accountNumber} />
                </div>
              </div>
              <Button
                className={`${styles.reset_pin} tertiary pt-6`}
                onClick={(e) => initiatePinReset(e, true)}
                text={
                  walletDetails.pinCreated && !pinResetLoading
                    ? "Reset Pin"
                    : !walletDetails.pinCreated && !pinResetLoading
                    ? "Set Pin"
                    : "Loading..."
                }
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.balance_card}>
          <div className={styles.lhs}>
            <h4>Available Balance</h4>
            <h1>--</h1>
            <div className={styles.btn_sec}>
              <BorderIconBtn
                bdColor="#fff"
                classProps="border i sd"
                icon={<AddMoneyIcon />}
                disabled={true}
                text="Add money"
              />
              <BorderIconBtn
                bgColor="#fff"
                disabled={true}
                classProps="no-border i sd"
                styleProps={{ color: "#009EC4" }}
                icon={<WithdrawMoneyIcon />}
                text="Withdraw"
              />
            </div>
          </div>
          <div className={styles.rhs}>
            {/* <div className={styles.top}>
							<BorderIconBtn
								classProps='no-border i sd'
							>
								<AlertIcon /> Set Alert
							</BorderIconBtn>
						</div> */}
            <div className={styles.account}>
              <div>
                <h4>Account Name</h4>
                <h3>--</h3>
              </div>
              <div>
                <h4>--</h4>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <h3>--</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BalanceCard
