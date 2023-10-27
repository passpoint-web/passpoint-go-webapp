"use client";
import styles from "./modal.module.css";
import { CancelIcon } from "@/constants/icons";
// import PrimaryBtn from '../Btn/Primary'
import { useRef } from "react";
import Button from "../Btn/Button";
const ModalWrapper = ({
	children,
	ctaBtnType = 'md',
	loading=false,
	bottomCancelNeeded = true,
	subHeading,
	heading,
	contentStyle,
	onClose,
	handleCta,
	overlayClose = false,
	ctaBtnText = 'Proceed',
	cancelBtnText='Cancel',
	containsTabLayout = false,
	hasBottomActions = true,
	bottomSecAction = false,
	handleBottomSecAction,
	secText = '',
	ctaDisabled=false,
	secNegative = false,
	ctaBtnColor = ''
}) => {
	const modalCtnRef = useRef(null);
	const modalBgRef = useRef(null);
	// const modalChildRef = useRef(null)
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
			<div ref={modalBgRef}
				className={styles.overlay_screen}
				onClick={overlayClose ? onClose : null} />
			<div className={`${styles.child_ctn} ${containsTabLayout ? styles.contains_tab : ''}`}>
				<button className={`${styles.close_btn} button`}
					onClick={onClose}>
					<CancelIcon />
				</button>
				<div
					className={styles.child}
					style={{...contentStyle}}>
					<div className={styles.mobile_top}>
						<div className={styles.dragger} />
					</div>
					<div className={styles.top}>
						<h2>{heading}</h2>
						<p>{subHeading}</p>
					</div>
					{children}
					{hasBottomActions ?
						<div className={`${styles.bottom} ${bottomCancelNeeded  ? styles.end : ''}`}>
							{bottomCancelNeeded ?
								<Button className={`secondary ${ctaBtnType} ${secNegative ? 'negative' : ''}`}
									onClick={bottomSecAction ? handleBottomSecAction : onClose}
									text={cancelBtnText} /> : <></>}
							<Button className={`primary ${ctaBtnType}`}
								style={{backgroundColor: ctaBtnColor || ""}}
								onClick={handleCta}
								disabled={ctaDisabled}
								loading={loading}
								text={ctaBtnText} />
						</div> : <></>}
				</div>
			</div>
		</div>
	)
}

export default ModalWrapper;
