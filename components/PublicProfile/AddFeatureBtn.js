

import styles from '@/app/dashboard/public-profile-setup/public-profile.module.css'
import { AddIcon } from '@/constants/icons'

const AddFeatureBtn = ({title, subTitlte, disabled, addFeatureModal}) => {
	return (
		<button className={styles.add_feature_card}
			disabled={disabled}
			onClick={addFeatureModal}>
			<div className={styles.add_feature_card_content}>
				<h3>{title}</h3>
				<p>{subTitlte}</p>
			</div>
			<AddIcon />
		</button>
	)
}

export default AddFeatureBtn
