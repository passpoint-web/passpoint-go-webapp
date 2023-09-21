import ModalWrapper from './ModalWrapper'
import styles from './modal.module.css'
import PrimaryBtn from '../Btn/Primary'

const PasspointBusinessModal = ({onClose}) => {
	return (
		<ModalWrapper
			contentStyle={{maxWidth: '500px'}}
			heading='Passpoint Business Warning'
			onClose={onClose}
		>
			<div className={styles.content}>
				<p>
        Please be aware that your business is exclusively accessible through Passpoint and can only be used within Passpoint.
				</p>
			</div>
			<div className={`${styles.bottom} ${styles.end}`}>
				{/* <button className='button neutral_btn'>
          Go Back
				</button> */}
				<PrimaryBtn text="Proceed"
					onClick={onClose} />
			</div>
		</ModalWrapper>
	)
}

export default PasspointBusinessModal
