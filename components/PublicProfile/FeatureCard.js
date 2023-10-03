import { CancelIcon_border } from "@/constants/icons"
import styles from '@/app/dashboard/public-profile-setup/public-profile.module.css'

const FeatureCard = ({children, removeFeature, editFeature, id, currentEditId}) => {
	return (
		<div
			className={`${styles.features_card_ctn} ${id === currentEditId ? styles.current_edit : ''}`}>
			<button
				className='absolute_close_btn button'
				onClick={removeFeature}>
				<CancelIcon_border />
			</button>
			<div
				className={styles.features_card}
				onClick={editFeature}
			>
				{children}
			</div>
		</div>
	)
}

export default FeatureCard
