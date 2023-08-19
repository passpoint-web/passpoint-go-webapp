
import styles from '@/assets/styles/auth-screens.module.css'
import PasspointLogo from '../Passpoint/Logo'
import ProductStage from '../ProductStage'
import SecondaryLink from '../Link/Secondary'
import Link from 'next/link'
import CloseBtn from '../Btn/Close'
const KYCHeader = ({btn}) => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.lhs}>
          <CloseBtn>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4.16675 15.8333L15.8334 4.16663M4.16675 4.16663L15.8334 15.8333L4.16675 4.16663Z" stroke="#565C69" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </CloseBtn>
          <h2>Complete KYC</h2>
        </div>
        {/* <div className={styles.rhs}>
          <SecondaryLink href={`${btn.url}`} text={btn.text} />
        </div> */}
      </div>
    </header>
  )
}

export default KYCHeader
