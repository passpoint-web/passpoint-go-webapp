import AuthLayout from "@/app/auth-layout"
import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from "@/components/Btn/Primary"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
const Login = () => {
  const router = useRouter()
  const [allFieldsValid, setAllFieldsValid] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push('/auth/business-kind')
  }

  return (
    <AuthLayout btn={{text: 'Sign up', url: '/auth/signup'}}>
       <div className={styles.auth}>
       <div className={styles.inner}>
       <div className={styles.center}>
       <h1><span>Hi,</span> 👋🏾 Welcome back</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inner}>
            <div className={styles.form_group}>
              <label htmlFor="email-address">Email address</label>
              <input placeholder="kelechi@gmail.com" id="email-address" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="password">Password</label>
              <input placeholder="****" id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
          </div>
          <div className={styles.action_ctn}>
            <PrimaryBtn disabled={!email || !password} text='Log in' />
            <p>Forgot password? <Link href="/auth/forgot-password" text='Reset it'>Reset it</Link></p>
          </div>
        </form>
       </div>
       </div>
      </div>
    </AuthLayout>
  )
}

export default Login
