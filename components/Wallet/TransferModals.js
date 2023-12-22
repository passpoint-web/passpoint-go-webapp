import { useEffect, useState } from "react"
import ModalWrapper from "../Modal/ModalWrapper"
// import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/Dashboard/Input"
import functions from "@/utils/functions"
import OtpInput from "react-otp-input"
// import styles from "./wallet.module.css";
import formStyles from "@/assets/styles/auth-screens.module.css"
import ActionFeedbackCard from "../ActionFeedbackCard"
import { wallet } from "@/services/restService/wallet"
import MoneyInput from "../Custom/MoneyInput"
// import AccountTypeDropDown from "./AccountTypeDropDown";
import TertiaryBtn from "../Btn/Tertiary"
import SearchSelect from "../Dashboard/SearchSelect"
import { getBanks as getCachedBanks } from "@/services/localService"
import {
  BankIcon,
  BlueCheckIcon,
  GreenCheckIcon,
  PasspointIcon,
} from "@/constants/icons"
import Select from "../Dashboard/Select"
import { Spinner } from "@chakra-ui/react"
import { useNotify } from "@/utils/hooks"

const TransferModals = ({
  currencies,
  walletAccounts,
  onClose,
  styles,
  updateWalletState,
}) => {
  const notify = useNotify()
  const { formatMoney, sortAlphabetically } = functions
  const accountTypes = [
    { name: "Account Number", description: "NUBAN" },
    { name: "Wallet ID", description: "Passpoint Wallet ID" },
  ]
  const [accountType, setAccountType] = useState({
    name: "Account Number",
    description: "NUBAN",
  })
  const [ctaClicked, setCtaClicked] = useState(false)
  const [transferPin, setTransferPin] = useState("")
  const [banks, setBanks] = useState([])
  const [allFieldsValid, setAllFieldsValid] = useState(false)
  const [accountNameRetrieved, setAccountNameRetrieved] = useState(false)
  // const [isLoading, setIsLoading] = useState(false);
  const [currentLevel, setCurrentLevel] = useState("select-mode") // select-mode, account, wallet, pin, wallet-pin, success, failure, reset pin
  const [mode, setMode] = useState("") // bank, account
  const [feedbackError, setFeedbackError] = useState("")
  const [statusMessage, setStatusMessage] = useState("")
  const [accountOrPin, setAccountOrPin] = useState(false)
  const [getDataLoading, setGetDataLoading] = useState(false)
  const [balanceLoading, setBalanceLoading] = useState(false)
  const [feesLoading, setFeesLoading] = useState(false)
  const [accountTransferLoading, setAccountTransferLoading] = useState(false)
  const [reference, setReference] = useState("")
  const [pinResetLoading, setPinResetLoading] = useState(false)
  const [bankDetail, setBankDetails] = useState({
    bankName: "",
    accountNumber: "",
    walletID: "",
    accountName: "",
    amount: "",
    narration: "",
  })
  const [walletBalance, setWalletBalance] = useState(0)
  const [toWallet, setToWallet] = useState("")
  const [toWalletAmount, setToWalletAmount] = useState(0)
  const [fromWallet, setFromWallet] = useState("")
  const [fromWalletAmount, setFromWalletAmount] = useState(0)
  const [exchangeRate, setExchangeRate] = useState(null)
  const [fees, setFees] = useState(0)

  const handleChange = (name, value) => {
    setBankDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // eslint-disable-next-line no-unused-vars
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(bankDetail)
    setCtaClicked(true)
    if (!allFieldsValid) {
      return
    }
  }

  const handleModalCta = () => {
    switch (currentLevel) {
      case "account":
        setCurrentLevel("pin")
        break
      case "wallet":
        setCurrentLevel("wallet-pin")
        break
      case "pin":
        handleFinalSubmitBank()
        break
      case "wallet-pin":
        handleFinalSubmitWallet()
        break
      case "success":
        onClose()
        break
      case "failure":
        setCurrentLevel("account")
    }
  }

  const initiatePinReset = async (e) => {
    e.preventDefault()
    // setCurrentModal('transfer')
    setPinResetLoading(true)
    try {
      const response = await wallet.initiatePin(true)
      const { reference } = response.data
      if (reference) {
        setReference(reference)
        setCurrentLevel("reset pin")
      } else {
        // setCurrentModal('transfer')
      }
    } catch (_err) {
      const { responseMessage = undefined, message = undefined } =
        _err.response?.data || _err
      setFeedbackError(responseMessage || message)
      // console.log(responseMessage || message)
      // if (responseMessage === 'Pin has already been set') {
      // setCurrentModal('transfer')
      // }
    } finally {
      setPinResetLoading(false)
    }
  }

  const handleFinalSubmitBank = async () => {
    if (accountType.name === "Account Number") {
      setAccountTransferLoading(true)
      try {
        const {
          bankName: { displayCode },
          accountNumber,
          accountName,
          amount,
          narration,
        } = bankDetail
        const response = await wallet.accountTransfer({
          bankCode: displayCode,
          transactionCurrency: "NGN",
          accountName,
          accountNumber,
          amount: Number(amount),
          channel: "3",
          narration,
          pin: transferPin,
        })
        // console.log(response.data.responseMessage)
        setStatusMessage(response.data.responseMessage)
        setCurrentLevel("success")
      } catch (_err) {
        // console.log(_err.response.data.responseMessage)
        setStatusMessage(_err.response.data.responseMessage)
        setCurrentLevel("failure")
        // console.log(_err)
      } finally {
        setAccountTransferLoading(false)
        updateWalletState()
        //
      }
    } else {
      setAccountTransferLoading(true)
      try {
        const { walletID, accountName, amount, narration } = bankDetail
        const response = await wallet.accountTransfer({
          bankCode: "000000",
          transactionCurrency: "NGN",
          accountName,
          amount: Number(amount),
          accountId: walletID,
          channel: "3",
          narration,
          pin: transferPin,
        })
        setStatusMessage(response.data.responseMessage)
        // console.log(response)
        setCurrentLevel("success")
      } catch (_err) {
        setCurrentLevel("failure")
        // console.log(_err)
      } finally {
        setAccountTransferLoading(false)
        updateWalletState()
        //
      }
    }
  }

  const handleFinalSubmitWallet = async () => {
    setAccountTransferLoading(true)
    try {
      const response = await wallet.convertFunds({
        amount: exchangeRate?.srcAmount,
        pin: transferPin,
        srcCurrency: fromWallet.substring(0, 3),
        destCurrency: toWallet.substring(0, 3),
        narration: "CONVERT_FUNDS",
      })
      console.log(response.data)
      setStatusMessage(response.data.responseMessage)
      // console.log(response)
      setCurrentLevel("success")
    } catch (err) {
      setStatusMessage(err.response?.data?.responseMessage)
      notify("error", err.response?.data?.responseMessage)
      // setCurrentLevel("failure")
    } finally {
      setAccountTransferLoading(false)
      updateWalletState()
      //
    }
  }

  const getBanks = async () => {
    try {
      setGetDataLoading(true)
      const response = await wallet.getBanks()
      const { data } = response.data
      if (data) {
        const sortedBanks = sortAlphabetically(data, "name")
        setBanks(sortedBanks)
      }
    } catch (_err) {
      // console.log(_err.response.data)
    } finally {
      setGetDataLoading(false)
      //
    }
  }

  const accountEnquiry = async () => {
    if (accountType.name === "Account Number") {
      try {
        setGetDataLoading(true)
        const {
          accountNumber,
          bankName: { displayCode },
        } = bankDetail
        const response = await wallet.accountEnquiry({
          bankCode: displayCode,
          accountNumber,
          countryCode: "NG",
        })
        setFeedbackError("")
        const { accountName } = response.data.data
        setBankDetails((prev) => ({
          ...prev,
          accountName,
        }))
        setAccountNameRetrieved(true)
      } catch (_err) {
        const { responseMessage = undefined, message = undefined } =
          _err.response?.data || _err
        setFeedbackError(responseMessage || message)
        if (responseMessage?.toLowerCase()?.includes("number")) {
          setBankDetails((prev) => ({
            ...prev,
            accountName: "",
          }))
        }
      } finally {
        setGetDataLoading(false)
      }
    } else {
      try {
        setGetDataLoading(true)
        const { walletID } = bankDetail
        const response = await wallet.passpointWalletEnquiry({
          walletId: walletID,
          currency: "NGN",
        })
        // console.log(response.data)
        setFeedbackError("")
        const { accountName } = response.data.data
        setBankDetails((prev) => ({
          ...prev,
          accountName,
        }))
        setAccountNameRetrieved(true)
      } catch (_err) {
        const { responseMessage = undefined, message = undefined } =
          _err.response?.data || _err
        setFeedbackError(responseMessage || message)
        if (responseMessage?.toLowerCase()?.includes("number")) {
          setBankDetails((prev) => ({
            ...prev,
            accountName: "",
          }))
        }
      } finally {
        setGetDataLoading(false)
      }
    }
  }

  const getWalletBalance = async () => {
    const selectedCurrency = fromWallet?.substring(0, 3)
    setBalanceLoading(true)
    try {
      const response = await wallet.getWalletBalance(selectedCurrency)
      const { data } = response.data
      setWalletBalance(
        data?.find((w) => w.currency === selectedCurrency)?.availableBalance
      )
    } catch (_err) {
      // console.log(_err)
    } finally {
      setBalanceLoading(false)
    }
  }

  const getExchangeRateOrFees = async () => {
    setFeesLoading(true)
    try {
      const response = await wallet.getExchangeRateOrFees({
        srcCurrency: fromWallet.substring(0, 3),
        destCurrency: toWallet.substring(0, 3),
        amount: fromWalletAmount,
      })
      const { data } = response.data
      setFees(data.fee)
      setExchangeRate(data)
      setToWalletAmount(data?.destAmount)
    } catch (err) {
      console.log(err)
      notify("error", err?.response?.data?.responseMessage)
      setToWalletAmount(0)
      setFees(0)
      setExchangeRate({})
    } finally {
      setFeesLoading(false)
    }
  }

  useEffect(() => {
    if (currentLevel === "wallet") {
      const conditionsMet =
        fromWallet &&
        fromWalletAmount &&
        toWallet &&
        toWalletAmount &&
        Number(fromWalletAmount || 0) <= Number(walletBalance)

      setAllFieldsValid(conditionsMet)
    } else {
      const conditionsMet =
        (accountType.name === "Account Number" ? bankDetail?.bankName : true) &&
        (accountType.name === "Account Number"
          ? bankDetail?.accountNumber
          : bankDetail?.walletID) &&
        bankDetail?.accountName &&
        bankDetail?.amount &&
        bankDetail?.narration

      setAllFieldsValid(conditionsMet)
    }
  }, [bankDetail, fromWallet, toWallet, fromWalletAmount, toWalletAmount])

  useEffect(() => {
    if (
      ["account", "pin", "wallet-pin", "select-mode", "wallet"].includes(
        currentLevel
      )
    ) {
      setAccountOrPin(true)
    } else {
      setAccountOrPin(false)
    }
  }, [currentLevel])

  useEffect(() => {
    setBanks(getCachedBanks())
    getBanks()
  }, [])

  useEffect(() => {
    getWalletBalance()
  }, [fromWallet])

  useEffect(() => {
    if (toWallet && fromWallet && fromWalletAmount) {
      getExchangeRateOrFees()
    }
  }, [toWallet, fromWallet, fromWalletAmount])

  useEffect(() => {
    const { accountNumber, bankName, walletID } = bankDetail
    if (accountNumber.length === 10 && bankName) {
      accountEnquiry()
    }
    if (walletID) {
      accountEnquiry()
    }
  }, [bankDetail.accountNumber, bankDetail.walletID, bankDetail.bankName])

  const GetBanksFlow = () => (
    <>
      {/* <Tab tabs={accountTypes} objKey={'name'} /> */}
      {/* wallet id || account number */}
      {accountType.name === "Account Number" ? (
        <>
          <SearchSelect
            id="bank"
            label="Select Bank"
            error={ctaClicked && !bankDetail.bankName}
            errorMsg="Bank name is required"
            selectPlaceholder={
              getDataLoading && !banks.length ? "Loading..." : "Select Bank"
            }
            selectOptions={banks}
            selectDisabled={banks.length === 0}
            objKey={"name"}
            selectedOption={bankDetail.bankName}
            fieldError={ctaClicked && !bankDetail.bankName}
            emitSelect={(option) => handleChange("bankName", option)}
          />

          <Input
            type="number"
            label="Account Number"
            id="accountNumber"
            name="accountNumber"
            placeholder="Enter Account Number here"
            error={
              (ctaClicked && !bankDetail.accountNumber) ||
              feedbackError.toLowerCase().includes("number")
            }
            value={bankDetail.accountNumber}
            onChange={(e) =>
              e.target.value.length <= 10
                ? handleChange("accountNumber", e.target.value)
                : null
            }
            errorMsg={
              feedbackError.toLowerCase().includes("number")
                ? "Account number is not valid"
                : "Account number is required"
            }
          />
        </>
      ) : (
        <Input
          type="email"
          label="Wallet ID"
          id="walletID"
          name="walletID"
          placeholder="Enter Passpoint's Wallet ID here"
          error={
            (ctaClicked && !bankDetail.walletID) ||
            feedbackError.toLowerCase().includes("number")
          }
          value={bankDetail.walletID}
          onChange={(e) => handleChange("walletID", e.target.value)}
          errorMsg={
            feedbackError.toLowerCase().includes("number")
              ? "Wallet ID is not valid"
              : "Wallet ID is required"
          }
        />
      )}
      {accountNameRetrieved ? (
        <>
          <Input
            disabled
            label="Account Name"
            id="accountName"
            name="accountName"
            placeholder={getDataLoading ? "Loading..." : "Account Name"}
            // error={ctaClicked && !bankDetail.accountName}
            value={bankDetail.accountName}
            //   onChange={(e) => handleChange("accountName", e.target.value)}
          />
          {/* <Input
						label="Amount"
						id="amount"
						name="amount"
						placeholder="Enter amount here"
						error={ctaClicked && !bankDetail.amount}
						value={bankDetail.amount}
						onChange={(e) => handleChange("amount", e.target.value)}
						errorMsg="Account number is required"
					/> */}
          <Input
            label="Amount"
            id="amount"
            name="amount"
            error={ctaClicked && Number(bankDetail.amount) === 0}
            errorMsg="Amount is required"
          >
            <MoneyInput
              id="amount"
              placeholder={"Enter amount"}
              currency={"NGN"}
              value={bankDetail.amount}
              onValueChange={(e) => handleChange("amount", e)}
            />
          </Input>
          <Input
            label="Narration"
            id="narration"
            name="narration"
            placeholder="Enter brief narration"
            error={ctaClicked && !bankDetail.narration}
            value={bankDetail.narration}
            onChange={(e) => handleChange("narration", e.target.value)}
            errorMsg="narration is required"
          />
        </>
      ) : (
        <></>
      )}
    </>
  )

  const GetWalletsFlow = () => (
    <div className="pb-6">
      <Select
        label="From my"
        styleProps={{
          dropdown: {
            height: 100,
          },
        }}
        selectOptions={currencies?.map((c) => `${c} Wallet`)}
        selectedOption={fromWallet}
        noShadow
        countries
        emitSelect={(option) => setFromWallet(option)}
      />
      <Input
        label="I want to send"
        id="amount"
        name="amount"
        errorMsg="Amount is required"
      >
        <MoneyInput
          id="from-wallet"
          placeholder={"Enter amount"}
          currency={fromWallet.substring(0, 3)}
          value={fromWalletAmount}
          onValueChange={(e) => setFromWalletAmount(e)}
        />
      </Input>
      {fromWallet && (
        <div className="flex justify-between items-center mb-6">
          {Number(walletBalance) >= Number(fromWalletAmount || 0) ? (
            <div className="success-tag flex justify-between gap-2 text-bold">
              <GreenCheckIcon /> Wallet Balance:{" "}
              {functions.formatMoney(walletBalance, fromWallet.substring(0, 3))}
            </div>
          ) : (
            <div className="pending-tag flex justify-between gap-2 text-bold">
              Wallet Balance:{" "}
              {functions.formatMoney(walletBalance, fromWallet.substring(0, 3))}
            </div>
          )}
          {balanceLoading && <Spinner size="sm" />}
        </div>
      )}
      <Select
        label="To my"
        styleProps={{
          dropdown: {
            height: 100,
          },
        }}
        selectOptions={currencies?.map((c) => `${c} Wallet`)}
        selectedOption={toWallet}
        noShadow
        countries
        emitSelect={(option) => setToWallet(option)}
      />
      {toWallet && (
        <Input
          label="I will receive"
          id="amount"
          name="amount"
          loading={feesLoading}
          disabled
        >
          <MoneyInput
            id="to-wallet"
            placeholder={"Amount to be received"}
            currency={toWallet.substring(0, 3)}
            value={toWalletAmount}
            disabled
            onValueChange={(e) => setFromWalletAmount(e)}
          />
        </Input>
      )}
      {exchangeRate?.rate && (
        <Input label="Exchange Rate" id="amount" name="amount">
          <div className="stylish-box px-5 py-6 flex align-top justify-between">
            <div className="lhs">
              <h5 className="mb-3 text-bold">
                {formatMoney(1, fromWallet.substring(0, 3), 1)} ~{" "}
                {formatMoney(
                  1 / exchangeRate?.rate,
                  toWallet.substring(0, 3),
                  3
                )}
              </h5>
              <h5 className="text-bold">
                {formatMoney(1, toWallet.substring(0, 3), 1)} ~{" "}
                {formatMoney(exchangeRate?.rate, fromWallet.substring(0, 3))}
              </h5>
            </div>
            <div className="rhs">
              <p className="text text-gray-400">Service fee</p>
              <h5 className="text-bold">
                {formatMoney(fees, exchangeRate?.srcCurrency)}
              </h5>
            </div>
          </div>
        </Input>
      )}
    </div>
  )

  const SelectTransferMode = () => {
    return (
      <div className={styles.transfer__btns}>
        <button onClick={() => setCurrentLevel("account")}>
          <div className={styles.check__svg}>
            <BlueCheckIcon />
          </div>
          <BankIcon />
          <h5 className="text-bold mt-4 text-xl">Bank Account</h5>
          <p>Transfer funds to your local bank account</p>
        </button>
        <button onClick={() => setCurrentLevel("wallet")}>
          <div className={styles.check__svg}>
            <BlueCheckIcon />
          </div>
          <PasspointIcon />
          <h5 className="text-bold mt-4 text-xl">My Passpoint Wallet</h5>
          <p>Transfer from one Passpoint wallet to another</p>
        </button>
      </div>
    )
  }

  const TransferPin = () => (
    <>
      <section className={styles.transferPin}>
        {accountType.name === "Account Number" ? (
          <div className={styles.transferPin_details}>
            <label>Bank Name</label>
            <div>
              <p>{bankDetail.bankName.name}</p>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className={styles.transferPin_details}>
          <label>Account Name</label>
          <div>
            <p>{bankDetail.accountName}</p>
          </div>
        </div>
        {accountType.name === "Account Number" ? (
          <div className={styles.transferPin_details}>
            <label>Account Number</label>
            <div>
              <p>{bankDetail.accountNumber}</p>
            </div>
          </div>
        ) : (
          <div className={styles.transferPin_details}>
            <label>Wallet ID</label>
            <div>
              <p>{bankDetail.walletID}</p>
            </div>
          </div>
        )}
        <div className={styles.transferPin_details}>
          <label>Amount</label>
          <div>
            <p className={`${styles.skyBlueCss}`}>
              {formatMoney(bankDetail.amount, "NGN")}
            </p>
          </div>
        </div>
        <div className={styles.transferPin_details}>
          <label>Transfer Fee</label>
          <div>
            <p className={`${styles.skyBlueCss}`}>{formatMoney("0", "NGN")}</p>
          </div>
        </div>
        <div className={styles.transferPin_details}>
          <label>Narration</label>
          <div>
            <p>{bankDetail.narration}</p>
          </div>
        </div>
      </section>
      <section className={styles.transferPin_pin}>
        <div style={{}}>
          <Input label={"Enter Pin"} label_center={true}>
            <div className={formStyles.otp_input_four}>
              <OtpInput
                value={transferPin}
                onChange={(e) => setTransferPin(e)}
                numInputs={4}
                shouldAutoFocus={true}
                inputType="number"
                inputMode={null}
                renderSeparator={<span />}
                renderInput={(props) => <input {...props} />}
              />
            </div>
          </Input>
          <p>
            Forgot your PIN?{" "}
            <TertiaryBtn
              text={!pinResetLoading ? "Reset PIN" : "Loading..."}
              disabled={pinResetLoading}
              onClick={(e) => initiatePinReset(e)}
            />
          </p>
        </div>
      </section>
    </>
  )

  const TransferWalletPin = () => (
    <>
      <section className={styles.transferPin}>
        <div className={styles.transferPin_details}>
          <label>Source Wallet</label>
          <div>
            <p className="flex align-items-center gap-2 text-bold">
              <img
                className="currency-img mt-0.5"
                src={`https://asset.mypasspoint.com/img/payoutCurrency/${fromWallet.substring(
                  0,
                  3
                )}.png`}
                alt=""
              />
              {fromWallet}
            </p>
          </div>
        </div>
        <div className={styles.transferPin_details}>
          <label>Amount Sent</label>
          <div>
            <p className={`${styles.skyBlueCss}`}>
              {formatMoney(fromWalletAmount, fromWallet?.substring(0, 3))}
            </p>
          </div>
        </div>
        <div className={styles.transferPin_details}>
          <label>Recipient Wallet</label>
          <div>
            <p className="flex align-items-center gap-2 text-bold">
              <img
                className="currency-img mt-0.5"
                src={`https://asset.mypasspoint.com/img/payoutCurrency/${toWallet.substring(
                  0,
                  3
                )}.png`}
                alt=""
              />
              {toWallet}
            </p>
          </div>
        </div>
        <div className={styles.transferPin_details}>
          <label>Amount to be received</label>
          <div>
            <p className={`${styles.skyBlueCss}`}>
              {formatMoney(toWalletAmount, toWallet?.substring(0, 3))}
            </p>
          </div>
        </div>
        <div className={styles.transferPin_details}>
          <label>Service fee</label>
          <div>
            <p className={`${styles.skyBlueCss}`}>{formatMoney(fees, "NGN")}</p>
          </div>
        </div>
      </section>
      <section className={styles.transferPin_pin}>
        <div className="mt-6 w-[300px] mx-auto">
          <Input label={"Enter Pin"} label_center={true}>
            <div className={formStyles.otp_input_four}>
              <OtpInput
                value={transferPin}
                onChange={(e) => setTransferPin(e)}
                numInputs={4}
                shouldAutoFocus={true}
                inputType="number"
                inputMode={null}
                renderSeparator={<span />}
                renderInput={(props) => <input {...props} />}
              />
            </div>
          </Input>
          <p>
            Forgot your PIN?{" "}
            <TertiaryBtn
              text={!pinResetLoading ? "Reset PIN" : "Loading..."}
              disabled={pinResetLoading}
              onClick={(e) => initiatePinReset(e)}
            />
          </p>
        </div>
      </section>
    </>
  )

  return (
    <ModalWrapper
      ctaDisabled={
        currentLevel === "account" || currentLevel === "wallet"
          ? !allFieldsValid
          : transferPin.length !== 4
      }
      ctaBtnType={accountOrPin ? "md" : "sd"}
      ctaBtnText={
        currentLevel === "account"
          ? "Continue"
          : currentLevel === "wallet"
          ? "Continue"
          : currentLevel === "pin"
          ? "Confirm"
          : currentLevel === "wallet-pin"
          ? "Confirm"
          : currentLevel === "success"
          ? "Go Back"
          : currentLevel === "failure"
          ? "Try Again"
          : ""
      }
      heading={accountOrPin ? "Transfer Money" : ""}
      topClose={accountOrPin}
      loading={accountTransferLoading}
      subHeading={accountOrPin ? "Kindly provide details below" : ""}
      onClose={() =>
        currentLevel === "pin"
          ? setCurrentLevel("account")
          : currentLevel === "select-mode"
          ? onClose()
          : setCurrentLevel("select-mode")
      }
      bottomCancelNeeded={accountOrPin}
      handleCta={handleModalCta}
    >
      <form style={{ minHeight: 250 }}>
        {currentLevel === "select-mode" ? (
          SelectTransferMode()
        ) : currentLevel === "account" ? (
          GetBanksFlow()
        ) : currentLevel === "wallet" ? (
          GetWalletsFlow()
        ) : currentLevel === "pin" ? (
          TransferPin()
        ) : currentLevel === "wallet-pin" ? (
          TransferWalletPin()
        ) : currentLevel === "success" ? (
          <ActionFeedbackCard
            content={{
              status: "success",
              title: "Transfer Successful",
              // value: `Your transfer of ${formatMoney(bankDetail.amount, 'NGN')} to ${bankDetail.accountName} was successful and they will receive it promptly`
              value: statusMessage,
            }}
          />
        ) : currentLevel === "failure" ? (
          <ActionFeedbackCard
            content={{
              status: "failure",
              title: "Transfer Failed",
              value: statusMessage,
            }}
          />
        ) : (
          <></>
        )}
      </form>
    </ModalWrapper>
  )
}

export default TransferModals
