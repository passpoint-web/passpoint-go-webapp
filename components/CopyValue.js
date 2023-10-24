
const CopyValue = ({color='#fff'}) => {
	const style={
		cursor: 'pointer'
	}
	const CopyIcon = () => (
		<svg xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none">
			<path d="M13.3307 10.7493V14.2494C13.3307 17.166 12.1641 18.3327 9.2474 18.3327H5.7474C2.83073 18.3327 1.66406 17.166 1.66406 14.2494V10.7493C1.66406 7.83268 2.83073 6.66602 5.7474 6.66602H9.2474C12.1641 6.66602 13.3307 7.83268 13.3307 10.7493Z"
				stroke={color}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"/>
			<path d="M18.3307 5.74935V9.24935C18.3307 12.166 17.1641 13.3327 14.2474 13.3327H13.3307V10.7493C13.3307 7.83268 12.1641 6.66602 9.2474 6.66602H6.66406V5.74935C6.66406 2.83268 7.83073 1.66602 10.7474 1.66602H14.2474C17.1641 1.66602 18.3307 2.83268 18.3307 5.74935Z"
				stroke={color}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"/>
		</svg>
	)
	return (
		<div style={style}>
			<CopyIcon color='#fff'  />
		</div>
	)
}

export default CopyValue
