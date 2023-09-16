import styles from '@/assets/styles/auth-screens.module.css'
import PasspointLogo from '../Passpoint/Logo'
import ProductStage from '../ProductStage'
import SecondaryLink from '../Link/Secondary'

const AuthHeader = ({ btn }) => {
	return (
		<header className={styles.header}>
			<div className={styles.inner}>
				<div className={styles.lhs}>
					<PasspointLogo />
					<ProductStage stage="beta" />
				</div>
				{Object.keys(btn).length ? (
					<div className={styles.rhs}>
						<SecondaryLink type="medium"
							href={`${btn.url}`}
							text={btn.text} />
					</div>
				) : (
					<></>
				)}
			</div>
		</header>
	)
}

export default AuthHeader
