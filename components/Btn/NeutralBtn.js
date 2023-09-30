
const NeutralBtn = ({text, ...props}) => {
	return (
		<button className='back_btn medium'
			{...props}>
			{text}
		</button>
	)
}

export default NeutralBtn
