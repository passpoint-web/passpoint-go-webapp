import Loader from "./Loader"

const Button = ({text,loading, ...props}) => {
	return (
		<button
			{...props}
			disabled={loading}
		>
			{!loading ? text : <Loader />}
		</button>
	)
}

export default Button
