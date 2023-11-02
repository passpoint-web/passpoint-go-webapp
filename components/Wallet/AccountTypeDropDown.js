import styles from '@/components/Custom/Select/index.module.css'
import { useState } from 'react'
import OverlayScreen from '../OverlayScreen'
import { DropDownIcon } from '@/constants/icons'

const AccountTypeDropDown = ({
	selectedOption = {},
	emitSelect,
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
				className={`custom-select ${styles.custom_select}`}
				style={{height: 20, zIndex: 20}}
			>
				<div style={{display: 'flex', justifyContent: 'flex-end'}}>
					<p style={{color: '#303237', fontFamily: `GraphikMedium`}}>{selectedOption.name}</p>
					<div
						style={{width: 100}}>

						{showSelect ? <OverlayScreen onClick={hideSelect} /> : <></>}
						<button
							className={`${showSelect ? styles.active : ''}`}
							onClick={handleClick}
							style={{border: 'none', boxShadow: 'none', height: '100%'}}
						>
							<div className={styles.content}>
								<p style={{color: '#009ec4', fontFamily: `GraphikMedium`}}>Switch</p>
							</div>
							<DropDownIcon className="icon" />
						</button>
						{showSelect ? (
							<div id={'switch'}
								className={`${styles.select} dropdown`}
								style={{height: 100, top: 20, right: 0, width: 150, borderRadius: 5, padding: 0}}
							>
								{[{name: 'Account Number', description: 'NUBAN'}, {name: 'Wallet ID', description: 'Passpoint Wallet ID'}].map((option, index) => (
									<div
										key={index}
										className={`${styles.content} ${(option.name === selectedOption.name) ? styles.content_selected : ''
										}`}
										style={{padding: '0 5px'}}
										onClick={() => handleSelect(option)}
									>
										<p className={styles.option}
											style={{lineHeight: '20px', fontSize: 12}}>{option.name} - {option.description}</p>
									</div>
								))}
							</div>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default AccountTypeDropDown
