import styles from './index.module.css'
import { useState } from 'react'
import OverlayScreen from '../../OverlayScreen'
import { DropDownIcon } from '@/constants/icons'

const CustomSelect = ({
	disabled,
	emitSelect,
	selectedOption,
	selectOptions,
	objKey,
	id,
	fieldError,
}) => {
	const [showSelect, setShowSelect] = useState(false)

	const handleClick = (e) => {
		e.preventDefault()
		setShowSelect(!showSelect)
	}

	const handleSelect = (option) => {
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
				{showSelect ? <OverlayScreen onClick={hideSelect} /> : <></>}
				<button
					disabled={disabled}
					className={`${showSelect ? styles.active : ''}`}
					onClick={handleClick}
				>
					<div className={styles.content}>
						{(objKey ? selectedOption?.[objKey] : selectedOption) ? (
							<p className={styles.option}>{objKey ? selectedOption?.[objKey] : selectedOption}</p>
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
									(objKey ? option?.[objKey] === selectedOption?.[objKey] : option === selectedOption) ? styles.content_selected : ''
								}`}
								onClick={() => handleSelect(option)}
							>
								<p className={styles.option}>{objKey ? option?.[objKey] : option}</p>
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
