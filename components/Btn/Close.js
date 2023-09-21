import { CancelIcon } from '@/constants/icons'
const CloseBtn = ({...props}) => {
	return (
		<button className='close_btn'
			{...props}
		>
			<CancelIcon />
		</button>
	)
}

export default CloseBtn
