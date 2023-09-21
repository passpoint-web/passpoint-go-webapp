const PrimaryBtn = ({text, type, loading,  ...props}) => {
	return (
		<button className={`primary_btn ${type}`}
			disabled={loading}
			{...props}>{text}</button>
	)
}

export default PrimaryBtn
