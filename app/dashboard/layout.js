"use client"
import DashboardHeader from "@/components/Dashboard/Header"
import DashboardSidebar from "@/components/Dashboard/Sidebar"
import styles from "@/assets/styles/dashboard-layout.module.css"
import { useEffect } from "react"

// eslint-disable-next-line no-unused-vars
// var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date()
// function name() {
//   let s1 = document.createElement("script"),
//     s0 = document.getElementsByTagName("script")[0]
//   s1.async = true
//   s1.src = "https://embed.tawk.to/653f9783a84dd54dc486acda/1he06fn7u"
//   s1.charset = "UTF-8"
//   s1.setAttribute("crossorigin", "*")
//   s0.parentNode.insertBefore(s1, s0)
// }
// name()

export default function DashboardLayout({ children }) {
  useEffect(()=>{
    // name()
  },[])
  return (
    <div className={styles.dashLayout}>
      <aside>
        <DashboardSidebar />
      </aside>
      <div className={styles.dash_children}>
        <DashboardHeader styles={styles} />
        <main className={styles.dash_outlet}>{children}</main>
      </div>
    </div>
  )
}
