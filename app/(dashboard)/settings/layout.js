import SettingsLHS from '@/components/Settings/SettingsLHS'
import styles from '@/components/Settings/settings.module.css'
const SecurityLayout = ({children}) => {
	return (
		<div className={styles.main_ctn}>
			<SettingsLHS />
			<div className={styles.settings_page}>
				{children}
			</div>
		</div>
	)
}

export default SecurityLayout
