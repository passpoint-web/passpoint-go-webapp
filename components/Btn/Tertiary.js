
const SecondaryBtn = ({text, disabled, type}) => {
	return (
		<button className={`tertiary_btn ${type || ''}`} disabled={disabled}>
			{text}
		</button>
	)
}

export default SecondaryBtn
