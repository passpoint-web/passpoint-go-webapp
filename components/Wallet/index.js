import BalanceCard from './BalanceCard'
import VirtualAccountCard from './VirtualAccountCard'
import WalletTable from './WalletTable'
import styles from './wallet.module.css'
const Wallet = () => {
  return (
    <div className={styles.wallet_page}>
      <div className={styles.top}>
        <BalanceCard styles={styles} />
        <VirtualAccountCard styles={styles} />
      </div>
      <div className={styles.bottom}>
        <WalletTable />
      </div>
    </div>
  )
}

export default Wallet
