"use client"
import Link from "next/link"
import ModalWrapper from "../Modal/ModalWrapper"
import { AddMoneyIllustration } from "@/constants/icons"

const WarningModal = ({ styles, setModalVisible }) => {
  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <ModalWrapper
      loading={false}
      topClose={false}
      onClose={null}
      ctaBtnType="none"
      heading={""}
      subHeading={""}
      ctaBtnText="Modify"
      bottomCancelNeeded={false}
      containsTabLayout
      hasBottomActions={false}
    >
      <div style={{ textAlign: "center", padding: "3rem 10%" }}>
        <AddMoneyIllustration />
        <h2>Set your PIN</h2>
        <p>Create your PIN to continue with this transaction.</p>
        <Link
          className="primary_btn"
          style={{ maxWidth: "200px", margin: "auto", marginTop: "2rem" }}
          href="/dashboard/wallet"
        >
          Set Pin
        </Link>
      </div>
    </ModalWrapper>
  )
}

export default WarningModal
