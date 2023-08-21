
const SecondaryBtn = ({text, disabled, type}) => {
	return (
		<button className={`secondary_btn ${type || ''}`} disabled={disabled}>
			{text}
		</button>
	)
}

export default SecondaryBtn
