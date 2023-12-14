import Loader from "./Loader"

const Button = ({text, icon, loading=false, ...props}) => {
	return (
		<button
			{...props}
			disabled={loading || props.disabled}
			style={icon && {display: 'flex', gap: '10px', alignItems: 'center'}}
		>
			{icon || ''} {!loading ? `${text || ''}` : <Loader size={20} />}
		</button>
	)
}

export default Button
