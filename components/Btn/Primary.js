const PrimaryBtn = ({text, type, ...props}) => {
	return (
		<button className={`primary_btn ${type || ''}`}
			{...props}>{text}</button>
	)
}

export default PrimaryBtn
