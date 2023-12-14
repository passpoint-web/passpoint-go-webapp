import styles from './tab.module.css'

const Tab = ({tabs, objKey, setActiveTab, activeTab, tabStyle}) => {
	const handleActiveTab = (e, tab) => {
		e.preventDefault()
		setActiveTab(tab)
	}
	return (
		<div style={tabStyle}
			className={styles.tab_group}>
			{tabs.map((tab, id) => (
				<button
					key={id}
					onClick={(e)=>handleActiveTab(e, tab)}
					className={(objKey ? tab[objKey] === activeTab[objKey] : tab === activeTab) ? styles.active : ""}
					style={{width: `calc(100%/${tabs.length})`}}
				>
					<div>
						{objKey ? tab[objKey] : tab}
					</div>
				</button>
			))}
		</div>
	)
}

export default Tab
