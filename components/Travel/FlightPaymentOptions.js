"use client"

import styles from "../../assets/styles/flight.module.css"
import { FaChevronDown } from "react-icons/fa"
import { useEffect, useState } from "react"
// import PaymentSuccessful from "./PaymentSuccessful"
import Input from "../Dashboard/Input"
import PrimaryBtn from "../Btn/Primary"
import PaymentSuccessful from "./PaymentSuccessful"
import functions from "@/utils/functions"
import { wallet } from "@/services/restService/wallet"
import OtpInput from "react-otp-input"
import formStyles from "@/assets/styles/auth-screens.module.css"
import PaymentFail from "./PaymentFail"
import Link from "next/link"
import WarningModal from "./WarningModal"

const FlightPaymentOptions = ({ makeFlightBooking, totalAmount }) => {
  const paymentOptions = ["My Passpoint Wallet", "Credit/Debit Card"]
  const [paymentOption, setPaymentOption] = useState(paymentOptions[0])
  const [paymentSuccessful, setPaymentSuccessful] = useState(false)
  const [paymentFailure, setPaymentFailure] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [warningModalVisible, setWarningModalVisible] = useState(false)
  const [walletAccount, setWalletAccount] = useState({})
  const [pins, setPins] = useState({
    pin: "",
  })

  const handlePinsChange = (e) => {
    const { name, value } = e.target
    setPins((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const makePayment = async (pin) => {
    setIsLoading(true)
    const promise = await makeFlightBooking(pin)
    if (promise === "success") {
      setPaymentSuccessful(true)
    } else {
      setPaymentFailure(true)
    }
    setIsLoading(false)
    // setDataLoading(false)
  }

  const getWallet = async () => {
    try {
      const response = await wallet.getWalletDetails()
      setWalletAccount({
        ...response.data.data.walletAccount["NGN"],
        pinCreated: response.data.data.pinCreated,
      })
    } catch (_err) {
      console.log(_err)
    } finally {
      // setDataLoading(false)
    }
  }

  const restartPayment = () => {
    setIsLoading(false)
    setPaymentFailure(false)
    setPaymentSuccessful(false)
    setPins({ pin: "" })
  }

  useEffect(() => {
    getWallet()
  }, [])

  useEffect(() => {
    if (walletAccount.pinCreated) {
      setWarningModalVisible(!walletAccount.pinCreated)
    }
  }, [walletAccount])

  return (
    <div className={`select-flight-wrapper ${styles.row__wrapper}`}>
      {warningModalVisible && (
        <WarningModal
          styles={styles}
          setModalVisible={setWarningModalVisible}
        />
      )}
      <button className={styles.row__header}>
        <div className="texts">
          <h3 className="capitalize"> Payment Options</h3>
          {/* <p>Manage your bookings here</p> */}
        </div>
        <FaChevronDown />
      </button>
      <div className={styles.payments__row}>
        <div className={styles.lhs}>
          {paymentOptions.map((option, index) => (
            <button
              key={option}
              disabled={index === 1}
              className={`${styles.payment__option_btn} ${
                paymentOption === option ? styles.active : ""
              }`}
              onClick={() => setPaymentOption(option)}
            >
              <div className="check"></div>
              {option}
            </button>
          ))}
        </div>
        <div className={styles.rhs}>
          {/* PAYMENT SUCCESSFUL */}
          {paymentOption === paymentOptions[0] && (
            <form onSubmit={(e) => e.preventDefault()}>
              {!paymentSuccessful && !paymentFailure && (
                <div>
                  <div className={styles.wallet__flex}>
                    <div className="balance">
                      <div>Wallet Balance</div>
                      <h2>
                        {functions.formatMoney(
                          walletAccount?.availableBalance,
                          "NGN"
                        )}
                      </h2>
                    </div>
                    <div className="balance">
                      <div>Booking Cost</div>
                      <h2>({functions.formatMoney(totalAmount, "NGN")})</h2>
                    </div>
                  </div>

                  <Input label={`Enter Wallet Pin`}>
                    <div className={formStyles.otp_input_four_wallet}>
                      <OtpInput
                        value={pins.pin}
                        onChange={(e) =>
                          handlePinsChange({
                            target: { name: "pin", value: e },
                          })
                        }
                        numInputs={4}
                        shouldAutoFocus={true}
                        inputType="password"
                        inputMode={null}
                        renderSeparator={<span />}
                        renderInput={(props) => <input {...props} />}
                      />
                    </div>
                  </Input>
                  <PrimaryBtn
                    loading={isLoading}
                    disabled={walletAccount?.availableBalance < totalAmount}
                    text={
                      walletAccount?.availableBalance < totalAmount
                        ? `Insufficient Funds`
                        : `Complete Booking`
                    }
                    onClick={() => makePayment(pins.pin)}
                  />
                  {walletAccount?.availableBalance < totalAmount && (
                    <Link
                      href="/wallet?add-money=true"
                      className={styles.wallet__link}
                    >
                      Top-up Wallet
                    </Link>
                  )}
                </div>
              )}
              {paymentSuccessful && !isLoading && <PaymentSuccessful />}
              {paymentFailure && !isLoading && (
                <PaymentFail restartPayment={restartPayment} />
              )}
            </form>
          )}
          {/* PAYMENT OPTIONS */}
          {paymentOption === paymentOptions[1] && (
            <form>
              <Input label="Cardholder Name" placeholder="John" name="name" />
              <Input
                label="Card Number"
                placeholder="**** **** **** ****"
                name="name"
              />
              <div className="form-triple-row">
                <Input
                  label="Card Expiry Month"
                  placeholder="John"
                  name="name"
                />
                <Input
                  label="Card Expiry Year"
                  placeholder="2025"
                  name="name"
                />
                <Input label="CVV" placeholder="123" name="name" />
              </div>
              <PrimaryBtn text="Pay ₦890,000" />
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default FlightPaymentOptions
