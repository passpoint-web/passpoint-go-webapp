import styles from '@/assets/styles/kyc-screens.module.css'

const SignupLevel = ({kyc}) => {
	return (
		<div className={`${styles.kyc_level} ${kyc.active ? styles.active : ''} ${kyc.completed ? styles.completed : ''}`}>
			<div className={styles.lhs}>
				<div className={styles.round_ctn}>
					<div className={styles.round}>
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
							<path d="M1.75 7L5.25 10.5L12.25 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
						<span>{kyc.level}</span>
					</div>
				</div>
				<div className={styles.line} />
			</div>
			<div className={styles.content}>
				<h3>{kyc.title}</h3>
				<p>{kyc.sub_title}</p>
			</div>
		</div>
	)
}

export default SignupLevel
