"use client"
import DashboardHeader from "@/components/Dashboard/Header"
import DashboardSidebar from "@/components/Dashboard/Sidebar"
import styles from "@/assets/styles/dashboard-layout.module.css"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getToken , getCredentials } from "@/services/localService";
import FullScreenLoader from "@/components/Modal/FullScreenLoader"

// eslint-disable-next-line no-unused-vars
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date()
function tawk() {
  let s1 = document.createElement("script"),
    s0 = document.getElementsByTagName("script")[0]
  s1.async = true
  s1.src = "https://embed.tawk.to/653f9783a84dd54dc486acda/1he06fn7u"
  s1.charset = "UTF-8"
  s1.setAttribute("crossorigin", "*")
  s0.parentNode.insertBefore(s1, s0)
}

export default function DashboardLayout({ children }) {
  const {push} = useRouter()
  const [loading, setLoading] = useState(true)
  const [savedCredentials, setSavedCredentials] = useState({});

  const checkAuth = async () => {
    const auth = await getToken()
    if (!auth) {
      push(`/auth/login?fallBackUrl=${window.location.pathname}`)
    } else {
      setLoading(false)
    }
  }

  useEffect(()=>{
    tawk()
    checkAuth()
    setSavedCredentials(getCredentials());
  },[])

  if (loading) {
    return (
      <>
        <DashboardHeader styles={styles} user={savedCredentials} />
        <FullScreenLoader />
      </>
    )
  }

  return (
    <div className={styles.dashLayout}>
      <DashboardHeader styles={styles} user={savedCredentials} />
      <div className={styles.dashContent}>
        <DashboardSidebar />
        <div className={styles.dash_children}>
          <main className={styles.dash_outlet}>{children}</main>
        </div>
      </div>
    </div>
  )
}
