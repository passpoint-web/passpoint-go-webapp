import Loader from "./Loader"

const PrimaryBtn = ({text, type, loading,  ...props}) => {
	return (
		<button className={`primary_btn ${type}`}
			disabled={loading}
			{...props}>{!loading ? text : <Loader />}</button>
	)
}

export default PrimaryBtn
