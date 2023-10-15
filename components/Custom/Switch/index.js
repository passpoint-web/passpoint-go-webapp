
import styles from './switch.module.css'
const Switch = ({...props}) => {
	return (
		<label className={styles.switch}>
			<input type="checkbox"
				className={styles.input}
				{...props} />
			<span className={`${styles.slider} ${styles.round}`} />
		</label>
	)
}

export default Switch
