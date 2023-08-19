import KYCLayout from "@/app/kyc-layout"
import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from "@/components/Btn/Primary"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

const BusinessType = () => {
  const router = useRouter()
  const [type, setType] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <KYCLayout pageTitle={'Business Type'}>
       <div className={styles.auth}>
       <div className={styles.inner}>
       <div className={styles.center}>
       <h1>You’re operating on passpoint as a..</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inner}>
          <div className={styles.form_group}>
            <label>Select your type of business</label>
            <select onChange={(e)=>setType(e.target.value)}>
              <option selected disabled>
                --please select--
              </option>
              <option>
                Travel agent
              </option>
              <option>
                Travel agency
              </option>
              <option>
                Tour management
              </option>
              <option>
                Company
              </option>
            </select>
          </div>
          </div>
          <div className={styles.action_ctn}>
            <PrimaryBtn disabled={!type} text={`Let's get started!`} />
          </div>
        </form>
       </div>
       </div>
      </div>
    </KYCLayout>
  )
}

export default BusinessType
