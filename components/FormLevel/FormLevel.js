import styles from './form-level.module.css'

const FormLevel = ({ auth, w1000 }) => {
	return (
		<div
			className={`${styles.auth_level} ${w1000 ? styles.w_1000 : ''}
				${auth?.active ? styles.active : ""} 
				${auth?.completed ? styles.completed : ""}`}
		>
			<div className={styles.lhs}>
				<div className={styles.round_ctn}>
					<div className={styles.round}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 14 14"
							fill="none"
						>
							<path
								d="M1.75 7L5.25 10.5L12.25 3.5"
								stroke="white"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<span>{auth?.level}</span>
					</div>
				</div>
				<div className={styles.line} />
			</div>
			<div className={styles.content}>
				<h3>{auth?.title}</h3>
				<p>{auth?.sub_title}</p>
			</div>
		</div>
	);
};

export default FormLevel;
