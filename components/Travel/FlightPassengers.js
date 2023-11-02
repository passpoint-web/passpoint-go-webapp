"use client"

import styles from "../../assets/styles/flight.module.css"
import { FaChevronDown, FaTrashAlt } from "react-icons/fa"
// import FlightCard from "./FlightCard"
// import Link from "next/link"
// eslint-disable-next-line no-unused-vars
import { GreenCheckIcon, PlusIcon, ProfileEditIcon } from "@/constants/icons"
import { useEffect, useState } from "react"
import Input from "../Dashboard/Input"
// import Textarea from "../Dashboard/Textarea"
import PrimaryBtn from "../Btn/Primary"
import CustomSelect from "../Custom/Select"
import Link from "next/link"
import { getMostRecentFlightSearchURL } from "@/services/localService"
import { useNotify } from "@/utils/hooks"

const FlightPassengers = ({ passengersParent, sortPassengersData }) => {
  const [passengers, setPassengers] = useState([])
  const [passengerGenders, setPassengerGenders] = useState([])
  const [activePassenger, setActivePassenger] = useState(1)
  const tempPassengers = [...passengersParent]
  const [collapsed, setCollapsed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const mostRecentFlightSearchURL = getMostRecentFlightSearchURL()
  const notify = useNotify()

  // eslint-disable-next-line no-unused-vars
  const addAnotherPassenger = () => {
    const newPassenger = {
      id: tempPassengers.length + 1,
      passenger_type: "",
      first_name: "",
      last_name: "",
      dob: "",
      gender: "",
      title: "",
      email: "",
      phone_number: "",
      passport_expiry: "",
      passport_issue: "",
    }
    tempPassengers.push(newPassenger)
    setPassengers(tempPassengers)
  }

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
  }

  const saveAndContinue = async (index) => {
    if (index + 1 === passengers.length) {
      setIsLoading(true)
      await sortPassengersData()
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
                <div
                  style={{ display: "grid", placeItems: "center" }}
                  onClick={(e) => {
                    e.stopPropagation()
                    deletePassenger(passenger.id)
                  }}
                >
                  <FaTrashAlt />
                </div>
              </span>
            </button>
          ))}
          <Link
            className={`${styles.payment__option_btn} ${styles.active}`}
            href={mostRecentFlightSearchURL}
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
              <div className="form-row">
                <Input
                  label="Date of Birth"
                  placeholder="Leave a Message"
                  type="date"
                  name="message"
                  // value={passenger.dob}
                  onChange={(e) =>
                    updateValue("dob", e.target.value, passenger?.id)
                  }
                />
                <Input
                  label="Passport Number"
                  placeholder="A000123456"
                  name="passport"
                  // value={passenger.passport_no}
                  onChange={(e) =>
                    updateValue("passport_no", e.target.value, passenger?.id)
                  }
                />
              </div>
              <div className="form-row">
                <Input
                  label="Passport Issue Date"
                  type="date"
                  name="passport-issue"
                  // value={passenger.last_name}
                  onChange={(e) =>
                    updateValue("passport_issue", e.target.value, passenger?.id)
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
              <div className="form-row bottom">
                <CustomSelect
                  id="class"
                  selectOptions={["male", "female"]}
                  selectedOption={passengerGenders[index]}
                  emitSelect={(e) => updateValue("gender", e, passenger?.id)}
                  placeholder="Select Gender"
                />
                <CustomSelect
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

              {/* FORM ACTION */}
              {passengers.length === index + 1 ? (
                <PrimaryBtn
                  loading={isLoading}
                  text="Confirm Booking Cost"
                  onClick={() => saveAndContinue(index)}
                />
              ) : (
                <PrimaryBtn
                  text="Continue"
                  onClick={() => saveAndContinue(index)}
                />
              )}
            </form>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FlightPassengers
