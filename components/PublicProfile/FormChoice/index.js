import React from 'react'
import CheckBox from '../../Custom/Check'
import FeedbackInfo from '../../FeedbackInfo'
import styles from './public-profile-info-choice.module.css'
import Switch from '@/components/Custom/Switch'
const FormChoice = ({message, checkValue=false, onChange}) => {
	return (
		<div className={styles.choice_ctn}>
			<FeedbackInfo type="note"
				message={message}
				styleProps={
					{
						ctn: {marginTop: 0},
						content:{fontSize: '14px'}
					}
				} />
			{/* <CheckBox value={checkValue}
				onChange={onChange}
				styleProps={{bottom: 'unset'}} /> */}
			<Switch value={checkValue}
				onChange={onChange} />
		</div>
	)
}

export default FormChoice

