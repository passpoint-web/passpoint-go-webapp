import { CancelIcon_border } from "@/constants/icons"
import styles from '@/app/dashboard/public-profile-setup/public-profile.module.css'

const FeatureCard = ({feature, removeFeature, editFeature}) => {
	return (
		<div
			className={styles.features_card_ctn}>
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
					<h3>{feature.headline}</h3>
					<p>{feature.description}</p>
				</div>
			</div>
		</div>
	)
}

export default FeatureCard