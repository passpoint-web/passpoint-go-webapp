import styles from './index.module.css'
import { useState } from 'react'
import OverlayScreen from '../../OverlayScreen'
import { DropDownIcon } from '@/constants/icons'
import functions from '@/utils/functions'

const ServicePriceModelSelect = ({
	disabled,
	emitSelect,
	selectedOption,
	selectOptions,
	id,
	fieldError,
	styleProps,
}) => {

	const {splitOnCapsLetter} = functions
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
						{(selectedOption) ? (
							<p className={styles.option}>{splitOnCapsLetter(selectedOption)}</p>
						) : (
							<p>Please select</p>
						)}
					</div>
					<DropDownIcon />
				</button>
				{showSelect ? (
					<div id={id}
						className={`${styles.select} dropdown`}
						style={{...styleProps?.dropdown}}>
						{selectOptions.map((option, index) => (
							<div
								key={index}
								className={`${styles.content} ${
									(option === selectedOption) ? styles.content_selected : ''
								}`}
								onClick={() => handleSelect(option)}
							>
								<p className={styles.option}>{splitOnCapsLetter(option)}</p>
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

export default ServicePriceModelSelect
