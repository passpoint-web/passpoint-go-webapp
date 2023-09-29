import styles from '@/assets/styles/form.module.css'
import { WarningIcon, NoteIcon, SuccessIcon } from '@/constants/icons'
const FeedbackInfo = ({message, center, type = 'error'}) => {
	return (
		<>
			<div className={`${styles.feedback_info_ctn} ${styles[type]} ${center ? styles.center : ''}`}>
				<div className={styles.icon}>
					{type === 'error' ? <WarningIcon /> : type === 'info' ? <NoteIcon /> :  type === 'success' ? <SuccessIcon /> : <NoteIcon /> }
				</div>
				<div className={styles.content}>
					{message}
				</div>
			</div>
		</>
	)
}

export default FeedbackInfo
