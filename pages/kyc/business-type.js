import KYCLayout from "@/app/kyc-layout"
import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from "@/components/Btn/Primary"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import CustomSelect from "@/components/Custom/Select/Select"

const BusinessType = () => {

  const router = useRouter()
  const [businessType, setBusinessType] = useState(undefined)
  const businessTypes = [
    'Travel agent',
    'Travel agency',
    'Tour management',
    'Company'
  ]

  const handleSelect = (e) => {
    setBusinessType(e)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <KYCLayout pageTitle={'Business Type'}>
       <div className={styles.auth}>
       <div className={styles.inner}>
       <div className={styles.center}>
       <h1>Help us get to know you better 🥳</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inner}>
          <div className={styles.form_group}>
            <label>Select your type of business</label>
            <CustomSelect selectOptions={businessTypes} selectedOption={businessType} emitSelect={handleSelect} />
          </div>
          </div>
          <div className={styles.action_ctn}>
            <PrimaryBtn disabled={!businessType} text={`Save and continue`} />
          </div>
        </form>
       </div>
       </div>
      </div>
    </KYCLayout>
  )
}

export default BusinessType