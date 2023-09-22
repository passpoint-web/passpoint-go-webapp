import styles from './modal.module.css'
import { CancelIcon } from '@/constants/icons'
import PrimaryBtn from '../Btn/Primary'
import { useRef } from 'react'
const ModalWrapper = ({children, heading, contentStyle, onClose, overlayClose = false, ctaBtnText = 'Proceed', otherBtns}) => {
	const modalCtnRef = useRef(null)
	const modalBgRef = useRef(null)
	const modalChildRef = useRef(null)
	// const closeModal = () => {
	// 	// Take modals away with transition
	// 	console.log(modalCtnRef.current.children)
	// 	// document.querySelectorAll(modalCtn child).forEach((modal) => {
	// 	// 	modal.classList.add('squeeze-in')
	// 	// })
	// 	document
	// 		.querySelectorAll('modal_container overlay_screen')
	// 		.forEach((modal) => {
	// 			modal.classList.add('blur-out')
	// 		})
	// 	window.setTimeout(() => {
	// 		// onClose()
	// 	}, 300)
	// }

	return (
		<div ref={modalCtnRef}
			className={`${styles.modal_container} reveals`}>
				<div ref={modalBgRef} className={styles.overlay_screen} onClick={overlayClose ? onClose : null} />
				<div ref={modalChildRef} className={styles.child}
					style={{...contentStyle}}>
					<div className={styles.mobile_top}>
						<div className={styles.dragger} />
					</div>
					<div className={styles.top}>
						<h2>{heading}</h2>
						<button className={`${styles.close_btn} button`}
							onClick={onClose}>
							<CancelIcon />
						</button>
					</div>
					{children}	
					<div className={`${styles.bottom} ${styles.end}`}>
						{otherBtns}
						<PrimaryBtn text={ctaBtnText}
							onClick={onClose} />
					</div>
				</div>
		</div>
	)
}

export default ModalWrapper
