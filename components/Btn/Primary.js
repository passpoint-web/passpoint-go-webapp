const PrimaryBtn = ({text, disabled, type}) => {
	return (
		<button className={`primary_btn ${type || ''}`}disabled={disabled}>{text}</button>
	)
}

export default PrimaryBtn
