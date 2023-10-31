
import { useEffect, useState } from 'react'
import ModalWrapper from './ModalWrapper'
// import { useRouter } from 'next/navigation'
import Input from "@/components/Dashboard/Input";
import functions from "@/utils/functions"
import OtpInput from 'react-otp-input'
import formStyles from '@/assets/styles/auth-screens.module.css'
// import { useNotify } from "@/utils/hooks";
import { getCredentials } from '@/services/localService';

const CreatePinModal = ({onClose }) => {
	// const notify = useNotify();
	const {maskedEmail} = functions
	// const searchParams = useSearchParams()
	const {email} = getCredentials()
	const defaultLevelContent = {
		heading: 'Enter OTP',
		subHeading: `Kindly enter OTP sent to ${maskedEmail(email)}`,
		handleModalCta: ()=>{
			// confirmPassword()
		}
	}
	// eslint-disable-next-line no-unused-vars
	const [currentLevel, setCurrentLevel] = useState('otp')
	const [otp, setOtp] = useState('')
	// eslint-disable-next-line no-unused-vars
	const [isLoading, setIsLoading] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [ctaClicked, setCtaClicked] = useState(false);
	// const [allFieldsValid, setAllFieldsValid] = useState(false);
	// const [isLoading, setIsLoading] = useState(false);
	const [modalContent, setModalContent] = useState(defaultLevelContent)
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

	// eslint-disable-next-line no-unused-vars
	const [pinCreationModal, setPinCreationModal] = useState('password')

	// const handleModalFlow = (val) => {
	// 	console.log('da')
	// 	const newParams = new URLSearchParams(searchParams.toString());
	// 	if (val) {
	// 		// console.log('yoyo')
	// 		newParams.set(currentModal, val)
	// 	} else {
	// 		newParams.delete(currentModal)
	// 	}
	// 	replace(createUrl('/dashboard/wallet', newParams))
	// }

	// const confirmPassword = async () => {
	// 	try {
	// 		setIsLoading(true);
	// 		const response = await authenticate.login({
	// 			email: getCredentials().email,
	// 			password
	// 		});
	// 		const {data, token} = response.data;
	// 		saveToken(token)
	// 		saveCredentials(data);
	// 		setCurrentLevel('pin')
	// 	} catch (_err) {
	// 		const { message } = _err.response?.data || _err;
	// 		setFeedbackError(message)
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// }

	const defineModalContents = (level) => {
		setPinCreationModal(level)
		switch (level) {
		case 'otp':
			setModalContent({
				heading: 'Enter OTP',
				subHeading: `Kindly enter OTP sent to ${maskedEmail(email)}`,
				handleModalCta: ()=>{
				}
			})
			break;
		case 'pin':
			setModalContent({
				heading: 'Create PIN',
				subHeading: 'Kindly create a unique PIN for your account',
				handleModalCta: ()=>{
				}
			})
			break;
		default:
			setModalContent({
				handleModalCta: ()=>{
				}
			})
		}
	}

	useEffect(()=>{
		if (['otp', 'pin'].includes(currentLevel)) {
			defineModalContents(currentLevel)
		}
	},[currentLevel])

	return (
		<ModalWrapper
			ctaBtnText={modalContent.ctaBtnText}
			// ctaDisabled={searchParams.get(currentModal) === 'password' ? !password : searchParams.get(currentModal) === 'pin' ? (pins.pin.length < 4 || pins.confirmPin.length < 4) : false}
			heading={modalContent.heading}
			loading={isLoading}
			subHeading={modalContent.subHeading}
			onClose={()=>onClose()}
			handleCta={modalContent.handleModalCta}
		>
			<form>
				{currentLevel === 'otp' ?

					<div style={{width: '80%', margin: '0 auto'}}>
						<Input>
							<div className={formStyles.otp_input_four}>
								<OtpInput
									value={otp}
									onChange={(e)=> setOtp(e)}
									numInputs={4}
									shouldAutoFocus={true}
									inputType="number"
									inputMode={null}
									renderSeparator={<span />}
									renderInput={(props) => <input {...props} />}
								/>
							</div>
						</Input>
					</div> : currentLevel === 'pin' ?
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
						</div> : <></>
				}
			</form>

		</ModalWrapper>
	)
}

export default CreatePinModal
