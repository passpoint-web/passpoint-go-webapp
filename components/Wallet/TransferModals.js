import { useEffect, useState } from 'react'
import ModalWrapper from '../Modal/ModalWrapper';
import { useRouter, useSearchParams } from 'next/navigation'
import Input from "@/components/Dashboard/Input";
import functions from "@/utils/functions"
import OtpInput from 'react-otp-input'
import formStyles from '@/assets/styles/auth-screens.module.css'
import CustomSelect from '../Custom/Select';
// import { useNotify } from "@/utils/hooks";

const TransferModals = ({handlePinCreation}) => {
	const currentModal = 'transferModal'
	// const notify = useNotify();
	const {createUrl} = functions
	const searchParams = useSearchParams()
	const {replace} = useRouter()
	const [password, setPassword] = useState('')
	const [ctaClicked, setCtaClicked] = useState(false);
	const [pinCreated, setPinCreated] = useState(false)
	// const [allFieldsValid, setAllFieldsValid] = useState(false);
	// const [isLoading, setIsLoading] = useState(false);
	const [feedbackError, setFeedbackError] = useState('')
	const [modalContent, setModalContent] = useState({
		heading: '',
		subHeading: ''
	})
	const [pins, setPins] = useState({
		pin: '',
		confirmPin: ''
	})

	const handlePinsChange = (e) => {
		const { name, value } = e.target
		setPins((prevState) => ({
			...prevState,
			[name]: value
		}))
	}

	// const [pinCreationModal, setPinCreationModal] = useState('password')

	const handleModals = (query, val) => {
		const newParams = new URLSearchParams(searchParams.toString());
		if (val) {
			newParams.set(query, val)
		} else {
			newParams.delete(query)
		}
		replace(createUrl('/dashboard/wallet', newParams))
	}

	const defineModalContents = (level) => {
		// setPinCreationModal(level)
		switch (level) {
		case 'bank':
			setModalContent({
				heading: 'Transfer Money',
				subHeading: 'Kindly provide details below',
				handleModalCta: ()=>{
					handleModals('pin')
				}
			})
			break;
		case 'pin':
			setModalContent({
				heading: 'Transfer Money',
				subHeading: 'Kindly provide details below',
				handleModalCta: ()=>{
					handleModals(currentModal)
				}
			})
			break;
		}
		// updateInfo(true)
	}

	useEffect(()=>{
		defineModalContents(searchParams.get(currentModal))
	},[searchParams.get(currentModal)])

	const GetBanksFlow = () => (
		<>
  	<Input
				id="bank"
				label="Bank"
			>
				<CustomSelect
					selectOptions={['Access', 'Wema']}
					selectedOption={''}
				/>
			</Input>
    	<Input
				label="Account Number"
				id="acct-no"
				name="accountNumber"
				placeholder="Enter Account Number here"
				value={''}
			/></>
	)

	return (
		<ModalWrapper
			ctaBtnText={modalContent.ctaBtnText}
			heading={modalContent.heading}
			subHeading={modalContent.subHeading}
			onClose={()=>handleModals('')}
			handleCta={modalContent.handleModalCta}
		>
			<form style={{minHeight: 250}}>
				{searchParams.get(currentModal) === 'bank' ?
					<GetBanksFlow /> :
					<div style={{width: '80%', margin: '0 auto'}}>
						<Input label={'Create Pin'}
							label_center={true}>
							<div className={formStyles.otp_input_four}>
								<OtpInput
									value={pins.pin}
									onChange={(e)=> handlePinsChange({ target: { name: 'pin', value: e } })}
									numInputs={4}
									shouldAutoFocus={true}
									inputType="number"
									inputMode={null}
									renderSeparator={<span />}
									renderInput={(props) => <input {...props} />}
								/>
							</div>
						</Input>
						<Input
							label={'Confirm Pin'}
							label_center={true}
							error={ctaClicked && pins.pin !== pins.confirmPin}
							errorMsg={'PINs do not match'}
							msgPositionCenter={true}
						>
							<div className={formStyles.otp_input_four}>
								<OtpInput
									value={pins.confirmPin}
									onChange={(e)=> handlePinsChange({ target: { name: 'confirmPin', value: e } })}
									numInputs={4}
									shouldAutoFocus={pins.pin.length ===4}
									inputType="number"
									inputMode={null}
									renderSeparator={<span />}
									renderInput={(props) => <input {...props} />}
								/>
							</div>
						</Input>
					</div>
				}
			</form>

		</ModalWrapper>
	)
}

export default TransferModals
