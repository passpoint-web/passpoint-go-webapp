import { CancelIcon_border } from "@/constants/icons"
import styles from '@/app/business-profile-setup/business-profile.module.css'

const FeatureCard = ({feature, removeFeature, editFeature}) => {
	return (
		<div
			className={`${styles.features_card_ctn} dropdown`}>
			<button
				className='absolute_close_btn button'
				onClick={removeFeature}>
				<CancelIcon_border />
			</button>
			<div
				className={styles.features_card}
				onClick={editFeature}
			>
				<div>
					<h3>{feature.businessHeadLine}</h3>
					<p>{feature.businessDesc}</p>
				</div>
			</div>
		</div>
	)
}

export default FeatureCard
