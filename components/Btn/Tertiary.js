
const SecondaryBtn = ({text, type, ...props}) => {
	return (
		<button className={`tertiary_btn ${type || ''}`}
			{...props}>
			{text}
		</button>
	)
}

export default SecondaryBtn
