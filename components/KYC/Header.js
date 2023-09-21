
import styles from '@/assets/styles/kyc-screens.module.css'
import CloseBtn from '../Btn/Close'

const KYCHeader = () => {

	const handleCloseClick = () =>{}

	return (
		<header className={styles.header}>
			<div className={styles.inner}>
				<div className={styles.lhs}>
					<CloseBtn onClick={handleCloseClick} />
				</div>
				<div className={styles.mhs}>
					<h3>Complete KYC</h3>
				</div>
				<div className={styles.rhs} />
			</div>
		</header>
	)
}

export default KYCHeader
