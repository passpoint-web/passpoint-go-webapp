import styles from './modal.module.css'
import { CancelIcon } from '@/constants/icons'
const ModalWrapper = ({children, heading, contentStyle, onClose}) => {
	return (
		<div className={`${styles.modal_container} reveals`}>
			<div className={styles.overlay_screen}>
				<div className={styles.child}
					style={{...contentStyle}}>
					<div className={styles.top}>
						<h2>{heading}</h2>
						<button className={`${styles.close_btn} button`}
							onClick={onClose}>
							<CancelIcon />
						</button>
					</div>
					{children}
				</div>
			</div>
		</div>
	)
}

export default ModalWrapper
