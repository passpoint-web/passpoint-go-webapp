import FeedbackInfo from "../FeedbackInfo";
import styles from "@/assets/styles/auth-screens.module.css";
import ToolTip from "./ToolTip";
const StatusInput = ({
	children,
	label,
	// error = false,
	// errorMsg,
	msgPositionCenter,
  feedback={},
	styleProps,
	toolTipMessage,
	label_center = false,
	...props
}) => {
	return (
		<>
			<div className={`${styles.form_group} input__ctn ${feedback.status === 'error' ? "error" : ''}`} style={styleProps}>
				{label ? <div className={styles.label_ctn} style={{display: 'flex'}}>
					<label htmlFor={props.id} style={{margin: label_center ? '0 auto 8px' : ''}}>
						{label}
					</label>
					{toolTipMessage ? <ToolTip message={toolTipMessage} /> : <></>}
				</div> : <></>}
				{children || <input {...props} />}
				{feedback.msg  ? (
					<FeedbackInfo center={msgPositionCenter}
						message={feedback.msg} type={feedback.status}  />
				) : <></>}
			</div>
		</>
	);
};

export default StatusInput;
