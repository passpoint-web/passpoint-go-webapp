
const BackBtn = ({text='Back',styleProps, ...props}) => {
	return (
		<button style={styleProps} className='back_btn medium'
			{...props}>
			<svg xmlns="http://www.w3.org/2000/svg"
				width="21"
				height="20"
				viewBox="0 0 21 20"
				fill="none">
				<path d="M8.47496 4.94165L3.41663 9.99998L8.47496 15.0583"
					stroke="#565C69"
					strokeWidth="1.5"
					strokeMiterlimit="10"
					strokeLinecap="round"
					strokeLinejoin="round"/>
				<path d="M17.5834 10H3.55835"
					stroke="#303237"
					strokeWidth="1.5"
					strokeMiterlimit="10"
					strokeLinecap="round"
					strokeLinejoin="round"/>
			</svg>
			<span>{text}</span>
		</button>
	)
}

export default BackBtn
