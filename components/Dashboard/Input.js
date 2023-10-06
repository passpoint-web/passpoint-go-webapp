import FeedbackInfo from "../FeedbackInfo";
import styles from "@/assets/styles/auth-screens.module.css";
const Input = ({
	children,
	label,
	error,
	errorMsg,
	msgPositionCenter,
	styleProps,
	...props
}) => {
	return (
		<>
			<div className={`${styles.form_group} ${error ? "error" : ""}`} style={styleProps}>
				<label htmlFor={props.id}>{label}</label>
				{children || <input {...props} />}
				{error && errorMsg ? (
					<FeedbackInfo center={msgPositionCenter}
						message={errorMsg} />
				) : (
					<></>
				)}
			</div>
		</>
	);
};

export default Input;
