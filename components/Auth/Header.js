
import styles from '@/assets/styles/auth-screens.module.css'
import PasspointLogo from '../Passpoint/Logo'
import ProductStage from '../ProductStage'
import SecondaryLink from '../Link/Secondary'
import Link from 'next/link'
const AuthHeader = ({btn}) => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.lhs}>
          <PasspointLogo />
          <ProductStage stage='beta' />
        </div>
        <div className={styles.rhs}>
          <SecondaryLink href={`${btn.url}`} text={btn.text} />
        </div>
      </div>
    </header>
  )
}

export default AuthHeader
