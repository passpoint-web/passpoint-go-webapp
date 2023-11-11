import styles from './icon.module.css'
const RefreshIcon = ({refreshing}) => {
  return (
    <span className={`material-icons ${refreshing ? 'rotate-infinite' : ''} ${styles.refresh}`}>
    cached
  </span>
  )
}

export default RefreshIcon
