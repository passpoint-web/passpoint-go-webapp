import FeedbackInfo from "../FeedbackInfo";
import styles from "@/assets/styles/auth-screens.module.css";
import ToolTip from "./ToolTip";
const Input = ({
	children,
	label,
	error = false,
	errorMsg,
	info,
	msgPositionCenter,
	styleProps,
	toolTipMessage,
	...props
}) => {
	return (
		<>
			<div className={`${styles.form_group} ${error ? "error" : ""}`} style={styleProps}>
				<div className={styles.label_ctn} style={{display: 'flex'}}>
					<label htmlFor={props.id}>
						{label}
					</label>
					{toolTipMessage ? <ToolTip message={toolTipMessage} /> : <></>}
				</div>
				{children || <input {...props} />}
				{error && errorMsg ? (
					<FeedbackInfo center={msgPositionCenter}
						message={errorMsg} />
				) : (
					info ? (
						<FeedbackInfo center={msgPositionCenter} type='info'
						message={info} />
					) : <></>
				)}
			</div>
		</>
	);
};

export default Input;
