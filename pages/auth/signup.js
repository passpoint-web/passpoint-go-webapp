import AuthLayout from "@/app/auth-layout"
import styles from '@/assets/styles/auth-screens.module.css'
import { useState } from "react"
import PrimaryBtn from "@/components/Btn/Primary"
import PasswordField from "@/components/Auth/PasswordField"
import PasswordStrength from "@/components/Auth/PasswordStrength"
import CountrySelect from "@/components/Custom/CountrySelect"

const Signup = () => {

  const [allFieldsValid, setAllFieldsValid] = useState(false)
  const [ctaClicked, setCtaClicked] = useState(false)
  const [country, setCountry] = useState(undefined)
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setCtaClicked(true)
  }

  return (
    <AuthLayout btn={{text: 'Log in', url: '/auth/login'}}>
       <div className={styles.auth}>
       <div className={styles.inner}>
       <div className={styles.lhs}>
       <h1>
       <span>Hi,</span> 👋🏾 Give your customers the <br/> best traveling experience 
        </h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inner}>
          <div className={`${styles.form_group} ${ctaClicked && !country ? styles.error : ''}`}>
            <label htmlFor="country">
              Country
            </label>
            {/* <select id="country">
              <option>
                Nigeria
              </option>
            </select> */}
            <CountrySelect />
          </div>
          <div className={styles.form_row}>
            <div className={`${styles.form_group} ${ctaClicked && !lastName ? styles.error : ''}`}>
              <label htmlFor="last-name">Last name</label>
              <input placeholder="Doe" id="last-name" />
            </div>
            <div className={`${styles.form_group} ${ctaClicked && !firstName ? styles.error : ''}`}>
              <label htmlFor="first-name">First name</label>
              <input placeholder="John" id="first-name" />
            </div>
          </div>
          <div>
          <div className={styles.form_group}>
              <label htmlFor="business-name">Business name</label>
              <input placeholder="John Travels" id="business-name" />
            </div>
          <div className={styles.form_group}>
              <label htmlFor="email-address">Email address</label>
              <input placeholder="john@mail.com" id="email-address" type="email" />
            </div>
          <div className={styles.form_group}>
              <label htmlFor="phone-number">Phone number</label>
              <input placeholder="234987654321" id="phone-number" type="text" />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="password">Password</label>
              <PasswordField />
              {/* <input placeholder="****" id="password" type="password" /> */}
            </div>
            </div>
          </div>

          <div className={styles.terms}>
              <input type="checkbox" />
            <p>By clicking, you accept our <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a></p>
          </div>
          <div className={styles.action_ctn}>
            <PrimaryBtn disabled={!allFieldsValid} text='Open account' />
          </div>
        </form>
       </div>
       </div>
      </div>
    </AuthLayout>
  )
}

export default Signup
