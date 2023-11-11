import styles from './tab.module.css'

const Tab = ({tabs, setActiveTab, activeTab, tabStyle}) => {
  return (
    <div style={tabStyle} className={styles.tab_group}>
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={tab === activeTab ? styles.active : ""}
      >
        {tab}
      </button>
    ))}
  </div>
  )
}

export default Tab
