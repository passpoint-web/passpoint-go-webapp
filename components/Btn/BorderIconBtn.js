import Loader from './Loader'

const BorderIconBtn = ({children, icon, text, loading, styleProps, bdColor, bgColor, classProps='', ...props}) => {
	return (
		<button
			{...props}
			className={`${classProps}`}
			style={{border: bdColor ? `1px solid ${bdColor}` : '', color: bdColor || '', backgroundColor: bgColor || '', ...styleProps}}
		>
			{!loading ? icon : <Loader size={20} />}
			{/* {children} */}
			{text}
			{/* {loading ? <Loader /> : <></>} */}
		</button>
	)
}

export default BorderIconBtn
