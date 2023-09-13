import styles from '@/assets/styles/auth-screens.module.css'
const PasswordStrength = ({valid, text}) => {

	const checkicon = (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path d="M7.99998 14.6667C11.6666 14.6667 14.6666 11.6667 14.6666 8.00004C14.6666 4.33337 11.6666 1.33337 7.99998 1.33337C4.33331 1.33337 1.33331 4.33337 1.33331 8.00004C1.33331 11.6667 4.33331 14.6667 7.99998 14.6667Z" stroke="#7E8494" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
			<path d="M5.16669 7.99995L7.05335 9.88661L10.8334 6.11328" stroke="#7E8494" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
		</svg>)
	const checkiconValid = (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path d="M7.99998 1.33337C4.32665 1.33337 1.33331 4.32671 1.33331 8.00004C1.33331 11.6734 4.32665 14.6667 7.99998 14.6667C11.6733 14.6667 14.6666 11.6734 14.6666 8.00004C14.6666 4.32671 11.6733 1.33337 7.99998 1.33337ZM11.1866 6.46671L7.40665 10.2467C7.31331 10.34 7.18665 10.3934 7.05331 10.3934C6.91998 10.3934 6.79331 10.34 6.69998 10.2467L4.81331 8.36004C4.61998 8.16671 4.61998 7.84671 4.81331 7.65337C5.00665 7.46004 5.32665 7.46004 5.51998 7.65337L7.05331 9.18671L10.48 5.76004C10.6733 5.56671 10.9933 5.56671 11.1866 5.76004C11.38 5.95337 11.38 6.26671 11.1866 6.46671Z" fill="#07B463"/>
		</svg>)

	return (
		<div className={`${styles.password_strength} ${!valid ? styles.error : ''}`}>
			{!valid ? checkicon : checkiconValid}
			<span>{text}</span>
		</div>
	)
}

export default PasswordStrength
