import styles from '@/assets/styles/form.module.css'
import { WarningIcon } from '@/constants/icons'
const FeedbackInfo = ({message, center}) => {
	return (
		<>
			<div className={`${styles.feedback_info_ctn} ${center ? styles.center : ''}`}>
				<div className={styles.icon}>
					<WarningIcon />
				</div>
				<div className={styles.content}>
					{message}
				</div>
			</div>
		</>
	)
}

export default FeedbackInfo
