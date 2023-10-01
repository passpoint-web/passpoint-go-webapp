
const NeutralBtn = ({type, text, ...props}) => {
	return (
		<button className={`back_btn ${type}`}
			{...props}>
			{text}
		</button>
	)
}

export default NeutralBtn
