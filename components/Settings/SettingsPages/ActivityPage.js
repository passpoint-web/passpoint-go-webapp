'use client'
import styles from '@/components/Settings/settings.module.css'
import { useEffect, useState } from 'react'

const Activity = () => {
  const [activities, setActivies] = useState([])
  useEffect(()=>{
    setActivies([
      { date: "2023-10-11 09:00:00", activity: "Design wireframes for homepage" },
      { date: "2023-10-12 10:15:00", activity: "Write HTML and CSS for login page" },
      { date: "2023-10-13 14:30:00", activity: "Implement user authentication" },
      { date: "2023-10-14 11:45:00", activity: "Develop API endpoints" },
      { date: "2023-10-15 15:20:00", activity: "Test and debug the application" },
      { date: "2023-10-16 09:30:00", activity: "Optimize database queries" },
      { date: "2023-10-17 13:45:00", activity: "Create user interface components" },
      { date: "2023-10-18 12:00:00", activity: "Perform security testing" },
      { date: "2023-10-19 14:15:00", activity: "Deploy the application to a server" },
      { date: "2023-10-20 10:30:00", activity: "Write documentation" }
    ])
  },[])
  return (
    <div className={styles.activity_page}>
      <h1>Account Activity</h1>
      <div className={styles.border_box}>
      <table className={styles.table}>
       <thead>
       <tr className={styles.table_header}>
            <td className={styles.td_3}>
              <div className={styles.th_content}>
                  Date & time
              </div>
            </td>
            <td className={styles.td_3}>
              <div className={styles.th_content}>
              Activity
              </div>
            </td>
          </tr>
       </thead>
          <tbody>
            {
              activities.map((a, id)=>(
                <tr key={id}
                className={styles.table_row}
                >
                  <td
                    className={styles.td_3} >
                    <div className={styles.td_content}>
                    {a.date}
                    </div>
                  </td>
                  <td
                    className={styles.td_3} >
                    <div className={styles.td_content}> 
                      {a.activity}
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Activity
