import KYCLayout from "@/app/kyc-layout"
import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from "@/components/Btn/Primary"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import CustomSelect from "@/components/Custom/Select/Select"

const BusinessAddress = () => {

  const router = useRouter()
  const [state, setState] = useState(undefined)
  const [lga, setLga] = useState(undefined)
  const [allFieldsValid, setAllFieldsValid] = useState(false)
  const states = [
    'Travel agent',
    'Travel agency',
    'Tour management',
    'Company'
  ]
  const lgas = [
    'Travel agent',
    'Travel agency',
    'Tour management',
    'Company'
  ]

  const handleState = (e) => {
    setState(e)
  }
  const handleLga = (e) => {
    setLga(e)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <KYCLayout pageTitle={'Business Address'}>
       <div className={styles.auth}>
       <div className={styles.inner}>
       <div className={styles.center}>
       <h1>Add your business address 🏠</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inner}>
          <div className={styles.form_group}>
            <label htmlFor="street-no">Street no.</label>
            <input placeholder="91, Lagos road" id="street-no" />
          </div>
          <div className={styles.form_group}>
            <label>Select state</label>
            <CustomSelect selectOptions={states} selectedOption={state} emitSelect={handleState} />
          </div>
          <div className={styles.form_group}>
            <label>Local Govt.</label>
            <CustomSelect disabled={!state} selectOptions={lgas} selectedOption={lga} emitSelect={handleLga} />
          </div>
          </div>
          <div className={styles.action_ctn}>
            <PrimaryBtn disabled={!allFieldsValid} text={`Save and continue`} />
          </div>
        </form>
       </div>
       </div>
      </div>
    </KYCLayout>
  )
}

export default BusinessAddress
