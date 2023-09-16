import FeedbackInfo from '../FeedbackInfo'
import styles from '@/assets/styles/auth-screens.module.css'
const Input = ({children, label, error, errorMsg, ...props}) => {
	return (
		<>
			<div
				className={`${styles.form_group} ${
					error ? styles.error : ''
				}`}
			>
				<label htmlFor={props.id}>{label}</label>
				{children || <input {...props} />}
				{error && errorMsg ? <FeedbackInfo message={errorMsg} /> : <></>}
			</div>
		</>
	)
}

export default Input
