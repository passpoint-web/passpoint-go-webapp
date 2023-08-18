import AuthLayout from "@/app/auth-layout"
import styles from '@/assets/styles/auth-screens.module.css'
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import PrimaryBtn from "@/components/Btn/Primary"
import PasswordField from "@/components/Auth/PasswordField"
import PasswordStrength from "@/components/Auth/PasswordStrength"
import CountrySelect from "@/components/Custom/CountrySelect"

const Signup = () => {
  const router = useRouter()

  const [allFieldsValid, setAllFieldsValid] = useState(false)
  const [ctaClicked, setCtaClicked] = useState(false)
  const [country, setCountry] = useState(undefined)
  const [countriesSelectProps, setCountriesSelectProps] = useState(false)
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setCtaClicked(true)
    router.push('/auth/business-kind')
  }

  useEffect(()=>{
    if (country?.name.common && lastName && firstName && businessName && email && phone && password) {
      setAllFieldsValid(true)
    } else {
      setAllFieldsValid(false)
    }
  }, [country?.name?.common, lastName, firstName, businessName, email, phone, password])

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
            <label htmlFor="country" onClick={()=>setCountriesSelectProps(true)}>
              Country
            </label>
            {/* <select id="country">
              <option>
                Nigeria
              </option>
            </select> */}
            <CountrySelect countriesSelectProps={countriesSelectProps} emitCountry={(e)=>setCountry(e)} />
          </div>
          <div className={styles.form_row}>
            <div className={`${styles.form_group} ${ctaClicked && !lastName ? styles.error : ''}`}>
              <label htmlFor="last-name">Last name</label>
              <input placeholder="Doe" id="last-name" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
            </div>
            <div className={`${styles.form_group} ${ctaClicked && !firstName ? styles.error : ''}`}>
              <label htmlFor="first-name">First name</label>
              <input placeholder="John" id="first-name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
            </div>
          </div>
          <div>
          <div className={styles.form_group}>
              <label htmlFor="business-name">Business name</label>
              <input placeholder="John Travels" id="business-name" value={businessName} onChange={(e)=>setBusinessName(e.target.value)} />
            </div>
          <div className={styles.form_group}>
              <label htmlFor="email-address">Email address</label>
              <input placeholder="john@mail.com" id="email-address" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
          <div className={styles.form_group}>
              <label htmlFor="phone-number">Phone number</label>
              <input placeholder="234987654321" id="phone-number" type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="password">Password</label>
              <PasswordField emitPassword={(e)=>setPassword(e)} />
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
