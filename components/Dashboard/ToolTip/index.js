
import { HintIcon, HintIconBlue } from '@/constants/icons'
import styles from './tool-tip.module.css'
const ToolTip = ({message}) => {
	return (
		<div className={styles.tip_btn_ctn}>
			<button
				onClick={(e)=>e.preventDefault()}
			>
				<HintIcon />
			</button>
			<div className={styles.indicator}>
				<div className={styles.details_indicator}>
					<HintIconBlue />
					<p>
						{
							message ||
              'If you ever need help, this is where you come to for hints'
						}
					</p>
				</div>
				<div className={styles.arrow_head} />
			</div>
		</div>
	)
}

export default ToolTip
