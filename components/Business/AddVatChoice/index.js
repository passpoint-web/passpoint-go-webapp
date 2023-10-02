import React from 'react'
import CheckBox from '../../Custom/Check'
import FeedbackInfo from '../../FeedbackInfo'
import styles from './vat-choice.module.css'
const AddVatChoice = () => {
	return (
		<div className={styles.choice_ctn}>
			<FeedbackInfo type="note"
				message="Do you want to include VAT (7.5%)?"
				styleProps={
					{
						ctn: {marginTop: 0},
						content:{fontSize: '14px'}
					}
				} />
			<CheckBox styleProps={{bottom: 'unset'}} />
		</div>
	)
}

export default AddVatChoice

