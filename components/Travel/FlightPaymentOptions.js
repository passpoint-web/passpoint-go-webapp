"use client"

import styles from "../../assets/styles/flight.module.css"
import { FaChevronDown } from "react-icons/fa"
import { useState } from "react"
// import PaymentSuccessful from "./PaymentSuccessful"
import Input from "../Dashboard/Input"
import PrimaryBtn from "../Btn/Primary"
import PaymentSuccessful from "./PaymentSuccessful"
import functions from "@/utils/functions"

const FlightPaymentOptions = ({
  makeFlightBooking,
  selectedFlight,
  totalAmount,
}) => {
  const paymentOptions = ["My Passpoint Wallet", "Credit/Debit Card"]
  const [paymentOption, setPaymentOption] = useState(paymentOptions[0])
  const [paymentSuccessful, setPaymentSuccessful] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const makePayment = async () => {
    setIsLoading(true)
    await makeFlightBooking({amount: totalAmount, ref: '1234'})
    setPaymentSuccessful(true)
    setIsLoading(false)
  }

  return (
    <div className={`select-flight-wrapper ${styles.row__wrapper}`}>
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
            <form>
              {!paymentSuccessful && (
                <PrimaryBtn
                  loading={isLoading}
                  text={`Charge Wallet - ${functions.formatMoney(
                    totalAmount,
                    selectedFlight.currency
                  )}`}
                  onClick={() => makePayment()}
                />
              )}
              {paymentSuccessful && !isLoading && <PaymentSuccessful />}
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
