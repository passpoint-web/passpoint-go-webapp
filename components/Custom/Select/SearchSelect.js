import styles from './index.module.css'
import { useEffect, useState } from 'react'
import OverlayScreen from '../../OverlayScreen'
import { DropDownIcon } from '@/constants/icons'
import Search from '../Search'

const CustomSearchSelect = ({
	disabled,
	emitSelect,
	selectedOption,
	selectOptions,
	objKey,
	// id,
	placeholder = "Please Select",
	fieldError,
	styleProps,
	dropDownTop=false
}) => {
	const [showSelect, setShowSelect] = useState(false)
	const [search, setSearch] = useState('')
	const [options, setOptions] = useState([])
	const [filteredOptions, setFilteredOptions] = useState([])

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

  const searchOptions = (item) => {
		setSearch(item)
    const result = 	!objKey ? options.filter((c) => {
      return c.toLowerCase().includes(item.toLowerCase())
    }) :  options.filter((c) => {
      return c[objKey].toLowerCase().includes(item.toLowerCase())
    })
		setFilteredOptions(result)
		const selectCtn = document.getElementById('search_select_ctn')
		selectCtn.scrollTop = 0
	}

  useEffect(()=>{
    setOptions(selectOptions)
    setFilteredOptions(selectOptions)
  },[selectOptions])

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
							<p className={`${styles.option} capitalize`}>{objKey ? selectedOption?.[objKey] : selectedOption}</p>
						) : (
							<p>{placeholder}</p>
						)}
					</div>
					<DropDownIcon className="icon" />
				</button>
				{showSelect ? (
					<div
            id={'search_select_ctn'}
						className={`${styles.select} ${dropDownTop ? styles.top : ''} dropdown`}
						style={{ ...styleProps?.dropdown }}>

						<Search
							search={search}
							id={'search-item'}
							placeholder={'Search'}
							searchItem={(e) => searchOptions(e)}
						/>
						{filteredOptions.map((option, index) => (
							<div
							style={{ ...styleProps?.option }}
								key={index}
								className={`${styles.content} ${(objKey ? option?.[objKey] === selectedOption?.[objKey] : option === selectedOption) ? styles.content_selected : ''
								}`}
								onClick={() => handleSelect(option)}
							>
								<p className={`${styles.option} capitalize`}>{objKey ? option?.[objKey] : option}</p>
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

export default CustomSearchSelect
