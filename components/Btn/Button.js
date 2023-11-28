import Loader from "./Loader"

const Button = ({text,loading=false, ...props}) => {
	return (
		<button
			{...props}
			disabled={loading || props.disabled}
		>
			{!loading ? text : <Loader size={20} />}
		</button>
	)
}

export default Button
