import FeedbackInfo from "../FeedbackInfo";
import styles from "@/assets/styles/auth-screens.module.css";
import ToolTip from "./ToolTip";
const Input = ({
	children,
	label,
	error = false,
	errorMsg,
	msgPositionCenter,
	styleProps,
	toolTipMessage,
	...props
}) => {
	return (
		<>
			<div className={`${styles.form_group} input__ctn ${error ? "error" : ""}`} style={styleProps}>
				{label &&<div className={styles.label_ctn} style={{display: 'flex'}}>
					<label htmlFor={props.id}>
						{label}
					</label>
					{toolTipMessage ? <ToolTip message={toolTipMessage} /> : <></>}
				</div>}
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
