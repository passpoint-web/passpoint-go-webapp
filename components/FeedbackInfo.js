import styles from '@/assets/styles/form.module.css'
import { WarningIcon, NoteIcon, SuccessIcon } from '@/constants/icons'
const FeedbackInfo = ({message, styleProps, center, type = 'error'}) => {
	return (
		<>
			<div className={`${styles.feedback_info_ctn} ${styles[type]} ${center ? styles.center : ''}`}
				style={styleProps?.ctn}>
				<div className={styles.icon}>
					{type === 'error' ? <WarningIcon /> : type === 'info' ? <NoteIcon /> :  type === 'success' ? <SuccessIcon /> : <NoteIcon /> }
				</div>
				<div className={styles.content}
					style={styleProps?.content}>
					{message}
				</div>
			</div>
		</>
	)
}

export default FeedbackInfo
