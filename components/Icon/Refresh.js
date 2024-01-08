import styles from './icon.module.css'
const RefreshIcon = ({refreshing}) => {
	return (
		<span className={`material-icons ${refreshing ? 'rotate-infinite' : ''} ${styles.refresh}`}>
    refresh
		</span>
	)
}

export default RefreshIcon
