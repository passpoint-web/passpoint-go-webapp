
import styles from '@/assets/styles/kyc-screens.module.css'
import CloseBtn from '../Btn/Close'

const KYCHeader = () => {

  const handleCloseClick = () =>{}

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.lhs}>
          <CloseBtn emitClick={handleCloseClick} />
        </div>
        <div className={styles.mhs}>
          <h2>Complete KYC</h2>
        </div>
        <div className={styles.rhs} />
      </div>
    </header>
  )
}

export default KYCHeader
