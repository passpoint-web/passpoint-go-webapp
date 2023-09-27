'use client'
import PublicProfileLHS from '@/components/PublicProfileLHS'
import styles from '@/assets/styles/auth-screens.module.css'
const PublicProfileSetupLayout = ({children}) => {
  return (
    <div className={styles.auth_content_ctn}>
    <div className={styles.auth_content}>
      
      <PublicProfileLHS />
        {children}
      <div className={styles.auth_content_rhs} />
    </div>
  </div>
  )
}

export default PublicProfileSetupLayout
