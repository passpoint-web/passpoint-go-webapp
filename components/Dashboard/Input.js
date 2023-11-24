import FeedbackInfo from "../FeedbackInfo";
import styles from "@/assets/styles/auth-screens.module.css";
import ToolTip from "./ToolTip";
const Input = ({
	children,
	label,
	error = false,
	errorMsg,
	successMsg,
	info,
	msgPositionCenter,
	styleProps,
	toolTipMessage,
	label_center = false,
	...props
}) => {
	return (
		<>
			<div className={`${styles.form_group} input__ctn ${error ? "error" : ''}`} style={styleProps}>
				{label ? <div className={styles.label_ctn} style={{display: 'flex'}}>
					<label htmlFor={props.id} style={{margin: label_center ? '0 auto 8px' : ''}}>
						{label}
					</label>
					{toolTipMessage ? <ToolTip message={toolTipMessage} /> : <></>}
				</div> : <></>}
				{children || <input {...props} />}
				{error && errorMsg ? (
					<FeedbackInfo center={msgPositionCenter}
						message={errorMsg} />
				) : (
					info ? (
						<FeedbackInfo center={msgPositionCenter} type='info'
						message={info} />
					) : successMsg ?  <FeedbackInfo center={msgPositionCenter} type='success'
					message={successMsg} /> : <></>
				)}
			</div>
		</>
	);
};

export default Input;
