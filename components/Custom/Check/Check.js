import styles from './checkbox.module.css'

const CheckBox = ({value, onChange, id}) => {
	return (
		<label className={styles.checkbox_container}>
			<input id={id} type="checkbox" checked={value} onChange={onChange} />
			<span
				className={styles.checkmark}
				style={{borderColor: value ? ' #009EC4' : '#BDC0CE'}}
			/>
		</label>
	)
}

export default CheckBox
