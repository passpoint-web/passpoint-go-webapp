
import { Logo } from '@/constants/icons'
import styles from '@/assets/styles/auth-screens.module.css'
import Link from 'next/link'
import ProductStage from "../ProductStage";


const PasspointLogo = ({href}) => {
  return (
    <div className='passpoint-logo'>
      <Link href={href}
        className={styles.logo}>
        <Logo />
      </Link>
      <ProductStage stage="beta" />
    </div>
  );
};

export default PasspointLogo;
