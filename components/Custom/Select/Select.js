import styles from './custom-select.module.css'
import { useState } from 'react'
import OverlayScreen from '../../OverlayScreen'
import { DropDownIcon } from '@/constants/icons'

const CustomSelect = ({
	disabled,
	emitSelect,
	selectedOption,
	selectOptions,
	id,
	fieldError,
}) => {
	const [showSelect, setShowSelect] = useState(false)

	const handleClick = (e) => {
		e.preventDefault()
		setShowSelect(!showSelect)
	}

	const handleSelect = (e, option) => {
		emitSelect(option)
		window.setTimeout(() => {
			setShowSelect(false)
		}, 200)
	}

	const hideSelect = () => {
		window.setTimeout(() => {
			setShowSelect(false)
		}, 200)
	}

	return (
		<>
			<div
				className={`${styles.custom_select} ${fieldError ? styles.error : ''}`}
			>
				{showSelect ? <OverlayScreen emitClick={hideSelect} /> : <></>}
				<button
					disabled={disabled}
					className={`${showSelect ? styles.active : ''}`}
					onClick={handleClick}
				>
					<div className={styles.content}>
						{selectedOption ? (
							<p className={styles.option}>{selectedOption}</p>
						) : (
							<p>Please select</p>
						)}
					</div>
					<DropDownIcon />
				</button>
				{showSelect ? (
					<div id={id}
						className={`${styles.select} dropdown`}>
						{selectOptions.map((option, index) => (
							<div
								key={index}
								className={`${styles.content} ${
									option === selectedOption ? styles.content_selected : ''
								}`}
								onClick={(e) => handleSelect(e, option)}
							>
								<p className={styles.option}>{option}</p>
							</div>
						))}
					</div>
				) : (
					<></>
				)}
			</div>
		</>
	)
}

export default CustomSelect
