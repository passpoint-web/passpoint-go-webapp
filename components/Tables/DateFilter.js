import styles from '@/components/Custom/Select/index.module.css'
import { useState } from 'react'
import OverlayScreen from '../OverlayScreen'
import { DropDownIcon } from '@/constants/icons'
import Input from '../Dashboard/Input'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateFilter = ({
	disabled,
	emitSelect,
	selectedOption,
	selectOptions,
	objKey,
	id,
	placeholder = "Please Select",
	fieldError,
	styleProps
}) => {
	const [showSelect, setShowSelect] = useState(false)
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

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
				className={`custom-select ${styles.custom_select} ${fieldError ? styles.error : ''}`}
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
							<p>{placeholder}</p>
						)}
					</div>
					<DropDownIcon className="icon" />
				</button>
				{showSelect ? (
					<div id={id}
						className={`${styles.select} dropdown`}
						style={{ ...styleProps?.dropdown }}>
						{/* <div
							className={`${styles.content} ${(objKey ? option?.[objKey] === selectedOption?.[objKey] : option === selectedOption) ? styles.content_selected : ''
							}`}
						>
							<p className={styles.option}>{objKey ? option?.[objKey] : option}</p>
						</div> */}
						{/* <Input label='From'> */}
							<DatePicker selected={startDate}
								dateFormat='yyyy-mm-dd'
								onChange={(date) => setStartDate(date)} />
						{/* </Input> */}
						<Input label='To'>
							<DatePicker selected={endDate}
								dateFormat='yyyy-mm-dd'
								onChange={(date) => setEndDate(date)} />
						</Input>
					</div>
				) : (
					<></>
				)}
			</div>
		</>
	)
}

export default DateFilter
