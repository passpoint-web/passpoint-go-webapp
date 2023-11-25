"use client"
import styles from "../../assets/styles/flight.module.css"
// eslint-disable-next-line no-unused-vars
import { FaChevronDown, FaTrashAlt } from "react-icons/fa"
// import FlightCard from "./FlightCard"
// import Link from "next/link"
// eslint-disable-next-line no-unused-vars
import { GreenCheckIcon, PlusIcon, ProfileEditIcon } from "@/constants/icons"
import { useEffect, useState } from "react"
import Input from "../Dashboard/Input"
// import Textarea from "../Dashboard/Textarea"
import PrimaryBtn from "../Btn/Primary"
// import CustomSelect from "../Custom/Select"
import Link from "next/link"
import { getMostRecentFlightSearchURL } from "@/services/localService"
import { useNotify } from "@/utils/hooks"
import functions from "@/utils/functions"
import Select from "../Dashboard/Select"
import FeedbackInfo from "../FeedbackInfo"

const FlightPassengers = ({
  passengersParent,
  sortPassengersData,
  documentsRequired,
}) => {
  const [passengers, setPassengers] = useState([])
  const [passengerGenders, setPassengerGenders] = useState([])
  const [activePassenger, setActivePassenger] = useState(1)
  const tempPassengers = [...passengersParent]
  const [collapsed, setCollapsed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPassengerNameSimilar, setIsPassengerNameSimilar] = useState(false)
  const [activePassengersFieldsValid, setActivePassengersFieldsValid] =
    useState(false)
  const mostRecentFlightSearchURL = getMostRecentFlightSearchURL()
  const notify = useNotify()
  const [searchURL, setSearchURL] = useState("")

  useEffect(() => {
    setSearchURL(mostRecentFlightSearchURL)
  }, [])

  useEffect(() => {
    setActivePassengersFieldsValid(isActivePassengersFieldsValid())
  }, [activePassenger])

  // eslint-disable-next-line no-unused-vars
  const deletePassenger = (id) => {
    setPassengers(passengersParent.filter((p) => p.id !== id))
  }

  const updateValue = (label, value, passengerId) => {
    const temp = passengers?.find((passenger) => passenger?.id === passengerId)
    temp[label] = value

    // UPDATE PASSENGERS ARRAY WITH NEW PASSENGER OBJ
    const passengerIndex = tempPassengers?.findIndex(
      (passenger) => passenger?.id === passengerId
    )
    tempPassengers.splice(passengerIndex, 1, temp)

    if (label === "gender") {
      const tempGenders = [...passengerGenders]
      tempGenders[passengerIndex] = temp[label] = value
      setPassengerGenders(tempGenders)
    }

    // CHECK IF PASSENGER HAS A SIMILAR NAME AS OTHER PASSENGERS
    let similarityCount = 0
    passengers?.forEach((passenger) => {
      const tempPassengerFullName =
        `${temp.first_name} ${temp.last_name}`.trim()
      const passengerFullName =
        `${passenger.first_name} ${passenger.last_name}`.trim()
      if (
        passengerFullName === tempPassengerFullName &&
        passenger.id !== temp.id
      ) {
        similarityCount += 1
      }
    })
    if (similarityCount > 0) {
      setIsPassengerNameSimilar(true)
    } else {
      setIsPassengerNameSimilar(false)
    }

    setActivePassengersFieldsValid(isActivePassengersFieldsValid())
  }

  function isDate18YearsAgo(givenDate) {
    // Get the current date
    const currentDate = new Date()
    givenDate = new Date(givenDate)

    // Calculate the date that is 18 years ago from the current date
    const eighteenYearsAgo = new Date(currentDate)
    eighteenYearsAgo.setFullYear(currentDate.getFullYear() - 18)

    // Compare the given date with the calculated date
    return givenDate.getTime() <= eighteenYearsAgo.getTime()
  }

  const isActivePassengersFieldsValid = () => {
    const ap = passengers?.at(activePassenger - 1)
    // console.log(functions.validEmail(ap?.email))
    console.log("isPassengerNameSimilar", isPassengerNameSimilar)
    if (documentsRequired) {
      return (
        ap?.first_name?.length > 1 &&
        ap?.last_name?.length > 1 &&
        functions.validEmail(ap?.email) &&
        ap?.gender &&
        (ap?.passenger_type === "adult"
          ? isDate18YearsAgo(ap?.dob)
          : ap?.dob) &&
        ap?.phone_number?.length === 11 &&
        Number(ap?.phone_number).toString().length === 10 &&
        ap?.passport_no &&
        ap?.passport_issue &&
        ap?.passport_expiry
      )
    }
    return (
      ap?.first_name?.length > 1 &&
      ap?.last_name?.length > 1 &&
      functions.validEmail(ap?.email) &&
      ap?.gender &&
      (ap?.passenger_type === "adult" ? isDate18YearsAgo(ap?.dob) : ap?.dob) &&
      ap?.phone_number?.length === 11 &&
      Number(ap?.phone_number).toString().length === 10
    )
  }

  const saveAndContinue = async (index) => {
    if (index + 1 === passengers.length) {
      setIsLoading(true)
      await sortPassengersData("OPEN-PAYMENT-OPTIONS")
      setIsLoading(false)
      setCollapsed(true)
    } else {
      setActivePassenger(activePassenger + 1)
    }
  }

  useEffect(() => {
    setPassengers(passengersParent)
  }, [passengersParent])

  return (
    <div className={`select-flight-wrapper ${styles.row__wrapper}`}>
      <button
        className={styles.row__header}
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="texts">
          <h3 className="capitalize">
            {" "}
            Passengers Information {collapsed && <GreenCheckIcon />}
          </h3>
          {/* <p>Manage your bookings here</p> */}
        </div>
        <FaChevronDown />
      </button>
      <div
        className={styles.payments__row}
        style={collapsed ? { display: "none" } : {}}
      >
        <div className={styles.lhs}>
          {passengers?.map((passenger, pIndex) => (
            <button
              key={passenger.id}
              className={`${styles.payment__option_btn} ${
                activePassenger === passenger.id ? styles.active : ""
              }`}
              onClick={() => setActivePassenger(passenger.id)}
            >
              <div className="check"></div>
              <span className={styles.option__btn_text}>
                Passenger {pIndex + 1}
                {/* <div
                  style={{ display: "grid", placeItems: "center" }}
                  onClick={(e) => {
                    e.stopPropagation()
                    deletePassenger(passenger.id)
                  }}
                >
                  <FaTrashAlt />
                </div> */}
              </span>
            </button>
          ))}
          <Link
            className={`${styles.payment__option_btn} ${styles.active}`}
            href={searchURL}
            onClick={() => notify("info", "Update Passenger details here")}
          >
            <PlusIcon />
            Add Another Passenger
          </Link>
        </div>
        <div className={styles.rhs}>
          {/* PASSENGER FORM */}
          {passengers?.map((passenger, index) => (
            <form
              key={passenger.id}
              className="come-up-sm"
              style={
                passenger?.id === activePassenger
                  ? { display: "block" }
                  : { display: "none" }
              }
              onSubmit={(e) => e.preventDefault()}
            >
              {isPassengerNameSimilar && (
                <FeedbackInfo message="This passenger has a similar name as another passenger" />
              )}
              <div className="form-row">
                <Input
                  label="First Name"
                  placeholder="John"
                  // value={passenger.first_name}
                  onChange={(e) =>
                    updateValue("first_name", e.target.value, passenger?.id)
                  }
                  name="name"
                />
                <Input
                  label="Last Name"
                  placeholder="Smith"
                  // value={passenger.last_name}
                  onChange={(e) =>
                    updateValue("last_name", e.target.value, passenger?.id)
                  }
                  name="name"
                />
              </div>
              <Input
                label="Email Address"
                placeholder="kelechi@travels.com"
                name="email"
                // value={passenger.email}
                onChange={(e) =>
                  updateValue("email", e.target.value, passenger?.id)
                }
              />
              <div className="form-row bottom">
                <Select
                  label="Select Gender"
                  id="class"
                  selectOptions={["male", "female"]}
                  selectedOption={passengerGenders[index]}
                  emitSelect={(e) => updateValue("gender", e, passenger?.id)}
                  placeholder="Select Gender"
                />
                <Select
                  label="Passenger Type"
                  id="type"
                  selectOptions={["adult", "child", "infant"]}
                  selectedOption={passenger.passenger_type}
                  disabled
                  emitSelect={(e) =>
                    updateValue("passenger_type", e, passenger?.id)
                  }
                  placeholder="Select Passenger Type"
                />
              </div>
              <div className="form-row">
                <Input
                  label="Date of Birth"
                  type="date"
                  name="message"
                  max={
                    passenger?.passenger_type === "adult"
                      ? functions.eighteenYearsAgo()
                      : null
                  }
                  // value={passenger.dob}
                  onChange={(e) =>
                    updateValue("dob", e.target.value, passenger?.id)
                  }
                />
                <Input
                  label="Phone Number"
                  type="number"
                  name="phone"
                  placeholder="Enter phone number"
                  max={100000000000}
                  // value={passenger.dob}
                  onChange={(e) =>
                    updateValue("phone_number", e.target.value, passenger?.id)
                  }
                />
              </div>
              {documentsRequired && (
                <div className="form-row">
                  <Input
                    label="Passport Issue Date"
                    type="date"
                    name="passport-issue"
                    // value={passenger.last_name}
                    onChange={(e) =>
                      updateValue(
                        "passport_issue",
                        e.target.value,
                        passenger?.id
                      )
                    }
                  />
                  <Input
                    label="Passport Expiry Date"
                    type="date"
                    name="passport-expiry"
                    // value={passenger.last_name}
                    onChange={(e) =>
                      updateValue(
                        "passport_expiry",
                        e.target.value,
                        passenger?.id
                      )
                    }
                  />
                </div>
              )}
              <div className="form-row mt-12">
                {documentsRequired && (
                  <Input
                    label="Passport Number"
                    placeholder="A000123456"
                    name="passport"
                    // value={passenger.passport_no}
                    onChange={(e) =>
                      updateValue("passport_no", e.target.value, passenger?.id)
                    }
                  />
                )}
              </div>

              {/* FORM ACTION */}
              <div className={styles.form__action}>
                {passengers.length === index + 1 ? (
                  <PrimaryBtn
                    loading={isLoading}
                    text="Confirm Booking Cost"
                    disabled={
                      !(activePassengersFieldsValid && !isPassengerNameSimilar)
                    }
                    onClick={() => saveAndContinue(index)}
                  />
                ) : (
                  <PrimaryBtn
                    text="Continue"
                    disabled={
                      !(activePassengersFieldsValid && !isPassengerNameSimilar)
                    }
                    onClick={() => saveAndContinue(index)}
                  />
                )}
              </div>
            </form>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FlightPassengers
