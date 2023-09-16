import styles from '@/assets/styles/auth-screens.module.css'
const Search = ({search, searchCountry, id, placeholder}) => {
	return (
		<div className={`${styles.input_wrapper} ${styles.left}`}>
			<input type="search"
				id={id}
				placeholder={placeholder}
				value={search}
				onChange={(e)=>searchCountry(e.target.value)} />
			<label className={styles.absolute_side}
				htmlFor={id}>
				<svg xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none">
					<path d="M9.58329 17.5C13.9555 17.5 17.5 13.9556 17.5 9.58334C17.5 5.21108 13.9555 1.66667 9.58329 1.66667C5.21104 1.66667 1.66663 5.21108 1.66663 9.58334C1.66663 13.9556 5.21104 17.5 9.58329 17.5Z"
						stroke="#BDC0CE"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"/>
					<path d="M18.3333 18.3333L16.6666 16.6667"
						stroke="#BDC0CE"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"/>
				</svg>
			</label>
		</div>
	)
}

export default Search
