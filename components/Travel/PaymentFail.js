"use client"

import styles from "../../assets/styles/flight.module.css"
import { BigGreenCheckIconWithShadow } from "@/constants/icons"
import Link from "next/link"
import Button from "../Btn/Button"
import PrimaryBtn from "../Btn/Primary"

const PaymentFail = ({ restartPayment }) => {
  return (
    <div className={styles.payment__successful}>
      <svg
        width="101"
        height="100"
        viewBox="0 0 101 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50.4997 91.6673C73.4163 91.6673 92.1663 72.9173 92.1663 50.0006C92.1663 27.084 73.4163 8.33398 50.4997 8.33398C27.583 8.33398 8.83301 27.084 8.83301 50.0006C8.83301 72.9173 27.583 91.6673 50.4997 91.6673Z"
          fill="#FF3B2D"
          stroke="#FFE6E4"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M35 66L67 34M35 34L67 66L35 34Z"
          stroke="white"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <h3>Payment Failed</h3>
      <p>You might have entered the wrong credentials.</p>
      <br />
      <PrimaryBtn
        className="primary_btn"
        text="Try again"
        onClick={() => restartPayment()}
      ></PrimaryBtn>
    </div>
  )
}

export default PaymentFail
