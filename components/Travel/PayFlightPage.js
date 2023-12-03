"use client"

import { getSelectedFlight } from "@/services/localService"
import { travel } from "@/services/restService"
import { wallet } from "@/services/restService/wallet"
import { useEffect, useState } from "react"
// import FlightPageHeader from "./FlightPageHeader"
import FlightPassengers from "./FlightPassengers"
import FlightPaymentOptions from "./FlightPaymentOptions"
import SelectedFlight from "./SelectedFlight"
import { useNotify } from "@/utils/hooks"
import { payment } from "@/services/restService/payment"

const PayFlightPage = ({ styles }) => {
  const notify = useNotify()
  const selectedFlight = getSelectedFlight()
  const [passengers, setPassengers] = useState([])
  const [sortedPassengers, setSortedPassengers] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [priceConfirmed, setPriceConfirmed] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [totalAmount, setTotalAmount] = useState(0)
  const [documentsRequired, setDocumentsRequired] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [bookingRef, setBookingRef] = useState(null)
  // const [feedbackError, setFeedbackError] = useState('')
  const [bookingLoading, setBookingLoading] = useState(false)

  // eslint-disable-next-line no-unused-vars
  const sortPassengersData = async (command) => {
    const tempPassengers = []
    passengers.forEach((passenger) => {
      const tempPassenger = { ...passenger }
      tempPassenger.title = passenger.gender === "male" ? "mr" : "miss"
      tempPassenger.phone_number = `+234${tempPassenger?.phone_number?.substring(
        1
      )}`
      if (documentsRequired) {
        tempPassenger.documents = {
          number: passenger.passport_no,
          issuing_date: passenger.passport_issue,
          expiry_date: passenger.passport_expiry,
          issuing_country: "NG",
          nationality_country: "NG",
          document_type: "passport",
          holder: true,
        }
      }
      delete tempPassenger.id
      delete tempPassenger.passport_no
      delete tempPassenger.passport_issue
      delete tempPassenger.passport_expiry
      tempPassengers.push(tempPassenger)
    })
    setSortedPassengers(tempPassengers)
    if (totalAmount === 0) {
      await confirmFlightPrice()
    }
    if (command === "OPEN-PAYMENT-OPTIONS") {
      setPriceConfirmed(true)
    }
  }

  const confirmFlightPrice = async () => {
    setBookingLoading(true)
    const promise = await travel.confirmFlightPrice({
      flightId: selectedFlight?.id,
    })
    setTotalAmount(promise.data.data.amount)
    setDocumentsRequired(promise.data.data.document_required)
  }

  const makeFlightBooking = async (pin) => {
    // Sort Passengers data again to remove documents if necessary
    await sortPassengersData()

    // Create Booking
    try {
      const bookingPromise = await payment.createFlightBooking({
        flightId: selectedFlight?.id,
        passengers: sortedPassengers,
      })
      console.log(bookingPromise)
      // console.log(bookingPromise.data.data.billerRef)
      const { billerRef } = bookingPromise?.data?.data || undefined
      if (billerRef) {
        setBookingRef(billerRef)
        // Charge Wallet for Booking just created
        const response = await chargeWallet(pin, billerRef)
        return response
      }
    } catch (_err) {
      const { responseMessage = undefined, message = undefined } =
        _err.response?.data || _err
      if (responseMessage || message) {
        notify("error", responseMessage || message)
      }
      setBookingLoading(false)
      return {
        type: "failure",
        message:
          responseMessage ||
          message ||
          "Something went wring, Please try again or contact admin",
      }
    } finally {
      //
    }
  }

  const chargeWallet = async (pin, ref) => {
    try {
      const walletPromise = await wallet.payBills({
        amount: totalAmount.toString(),
        narration: `Wallet Payment for Booking ${ref}`,
        pin,
        transactionCurrency: "NGN",
        paymentDetails: {
          billerReference: ref,
          serviceType: "flight",
        },
      })

      if (
        walletPromise.data.responseDescription?.toLowerCase() === "successful"
      ) {
        return { type: "success", message: walletPromise.data.responseMessage }
      }
      setBookingLoading(false)
    } catch (_err) {
      const { responseMessage = undefined, message = undefined } =
        _err.response?.data || _err
      if (responseMessage || message) {
        notify("error", responseMessage || message)
      }
      setBookingLoading(false)
      return { type: "failure", message: _err.response.data.responseMessage }
    }

    return {
      type: "failure",
      message: "Something went wring, Please try again or contact admin",
    }
  }

  useEffect(() => {
    // populate [passengers] array with flight booking info
    const tempPassengers = []
    selectedFlight?.travelers_price?.forEach((traveler) => {
      const isChild = !!traveler.child
      const isAdult = !!traveler.adult

      if (isAdult) {
        tempPassengers.push({
          id: tempPassengers.length + 1,
          passenger_type: "adult",
        })
      } else if (isChild) {
        tempPassengers.push({
          id: tempPassengers.length + 1,
          passenger_type: "child",
        })
      } else {
        tempPassengers.push({
          id: tempPassengers.length + 1,
          passenger_type: "infant",
        })
      }
    })
    setPassengers(tempPassengers)

    // Confirm Price as soon as Flight is selected
    confirmFlightPrice()
  }, [])

  return (
    <div className={`${styles.inner} flight-services`}>
      <SelectedFlight data={selectedFlight} />
      <FlightPassengers
        passengersParent={passengers}
        setPassengersParent={setPassengers}
        sortPassengersData={sortPassengersData}
        documentsRequired={documentsRequired}
      />
      {priceConfirmed && (
        <FlightPaymentOptions
          makeFlightBooking={makeFlightBooking}
          bookingLoading={bookingLoading}
          selectedFlight={selectedFlight}
          totalAmount={totalAmount}
        />
      )}
    </div>
  )
}

export default PayFlightPage
