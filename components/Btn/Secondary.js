
const SecondaryBtn = ({text, type, ...props}) => {
	return (
		<button className={`secondary_btn ${type || ''}`}
			{...props}>
			{text}
		</button>
	)
}

export default SecondaryBtn
