import { useEffect, useState } from 'react'
import BusinessKindBtn from './Btn'
import styles from './business-kind.module.css'
import { getUserType } from '@/services/localService'
import { CorporateIcon, IndividualIcon } from '@/constants/icons'

const ChoiceCard = ({ emitSetOption }) => {
	// const [option, setOption] = useState(undefined)
	const [currentOption, setCurrentOption] = useState({})

	const options = [
		{
			id: 0,
			icon: <CorporateIcon />,
			heading: 'Corporate Business',
			content: {
				p: 'An entity that is associated with a business or corporation, it’s duly registered as a business under the country corporate affairs commission, it is licensed if applicable and all the documents identifying it as a business.',
				// p: 'For a corporate business, we’ll ask you to provide us with your:',
				// list: [
				// 	'Full incorporation documents (CAC)',
				// 	'Valid identification of directors',
				// 	'Valid ID of shareholders with more than 5% ownership'
				// ]
			},
		},
		{
			id: 1,
			icon: <IndividualIcon />,
			heading: 'Individual User',
			content: {
				p: 'An account that represents a unique identity or profile associated with a specific person.',
				// p: 'For an individual user, we’ll ask you to provide us with your:',
				// list: [
				// 	'Valid government ID (NIN, National Id card)',
				// 	'BVN (Nigerians only)',
				// 	'Utility bill (eg. Electricity)'
				// ]
			},
		},
	]
	const selectOption = (option) => {
		// setOption(option)
		setCurrentOption(option)
		emitSetOption(option)
	}

	useEffect(() => {
		if (getUserType()) {
			setCurrentOption(options.find((e) => e.heading === getUserType()))
		}
	}, [])

	useEffect(() => {
		emitSetOption(currentOption)
	}, [currentOption])

	const listOptions = options.map((option, index) => (
		<BusinessKindBtn
			key={index}
			onSelectOption={selectOption}
			option={option}
			currentOption={currentOption}
		>
			{option.icon}
			<h2>{option.heading}</h2>
			<div className={styles.content}>
				<p>{option.content.p}</p>
				{/* <ol>
					{option.content.list.map((item, i)=>
						<li key={i}>
							{item}
						</li>
					)}
				</ol> */}
			</div>
		</BusinessKindBtn>
	))

	return <div className={styles.business_type_ctn}>{listOptions}</div>
}

export default ChoiceCard
