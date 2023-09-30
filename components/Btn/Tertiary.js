
const TertiaryBtn = ({text, type, ...props}) => {
	return (
		<button className={`tertiary_btn ${type || ''}`}
			{...props}>
			{text}
		</button>
	)
}

export default TertiaryBtn
