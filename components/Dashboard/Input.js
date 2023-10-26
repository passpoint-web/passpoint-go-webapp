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
	label_center = false,
	...props
}) => {
	return (
		<>
			<div className={`${styles.form_group} ${error ? "error" : ""}`}
				style={styleProps}>
				<div className={styles.label_ctn}
					style={{display: 'flex'}}>
					<label htmlFor={props.id}
						style={{margin: label_center ? '0 auto 8px' : ''}}>
						{label}
					</label>
					{toolTipMessage ? <ToolTip message={toolTipMessage} /> : <></>}
				</div>
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
