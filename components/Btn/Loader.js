
const Loader = ({size, colorType}) => {
	return (
		<div className={`loading ${colorType}`}  style={{width: size, height: size}}/>
	)
}

export default Loader
