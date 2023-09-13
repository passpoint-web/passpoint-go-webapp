import styles from '@/assets/styles/form.module.css'
const FeedbackInfo = ({message}) => {
	return (
		<>
			<div className={styles.feedback_info_ctn}>
				<div className={styles.icon}>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
						<path d="M8 6V9.33333" stroke="#FF3B2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M7.99979 14.2735H3.95979C1.64646 14.2735 0.679793 12.6202 1.79979 10.6002L3.87979 6.85352L5.83979 3.33352C7.02646 1.19352 8.97313 1.19352 10.1598 3.33352L12.1198 6.86018L14.1998 10.6068C15.3198 12.6268 14.3465 14.2802 12.0398 14.2802H7.99979V14.2735Z" stroke="#FF3B2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M7.99609 11.333H8.00208" stroke="#FF3B2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</div>
				<div className={styles.content}>
					{message}
				</div>
			</div>
		</>
	)
}

export default FeedbackInfo
