import ModalWrapper from './ModalWrapper'
import styles from './modal.module.css'
const PasspointBusinessModal = ({onClose}) => {
	return (
		<ModalWrapper
			contentStyle={{maxWidth: '500px'}}
			ctaBtnText='Proceed'
			heading='Passpoint Business Warning'
			onClose={onClose}
			bottomCancelNeeded={false}
			handleCta={onClose}
			ctaBtnType='sd'
		>
			<div className={styles.content}>
				<p>
        Please be aware that your business is exclusively accessible through Passpoint and can only be used within Passpoint.
				</p>
			</div>
		</ModalWrapper>
	)
}

export default PasspointBusinessModal
