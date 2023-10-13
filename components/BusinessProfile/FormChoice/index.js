import React from 'react'
import FeedbackInfo from '../../FeedbackInfo'
import styles from './business-profile-info-choice.module.css'
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
			<Switch value={checkValue}
				checked={checkValue}
				onChange={onChange} />
		</div>
	)
}

export default FormChoice

