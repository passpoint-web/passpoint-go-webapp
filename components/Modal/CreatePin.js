
import { useEffect, useState } from 'react'
import ModalWrapper from './ModalWrapper'
import Input from "@/components/Dashboard/Input";
// import PasswordField from "@/components/Auth/PasswordField"
import functions from "@/utils/functions"
import OtpInput from 'react-otp-input'
import formStyles from '@/assets/styles/auth-screens.module.css'
import { useNotify } from "@/utils/hooks";
// import { authenticate } from '@/services/restService';
import { getCredentials } from '@/services/localService';
// import { saveCredentials, saveToken } from "@/services/localService";
import { wallet } from '@/services/restService/wallet';

const CreatePinModal = ({ handlePinCreation, onClose, reference }) => {
	const notify = useNotify();
	const {maskedEmail} = functions
	const {email} = getCredentials()
	const [currentLevel, setCurrentLevel] = useState('otp')
	const [isLoading, setIsLoading] = useState(false);
	const [ctaClicked, setCtaClicked] = useState(false);
	const [feedbackError, setFeedbackError] = useState('')
	const [pins, setPins] = useState({
		otp: '',
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

	const handleModalCta = async () => {
		setCtaClicked(true)
		if (pins.pin !== pins.confirmPin) {
			return
		}
		setIsLoading(true)
		try {
			await wallet.setPin({
				pin: pins.pin,
				otp: pins.otp,
				reference
			})
			console.log('PIN Setup successful')
			handlePinCreation()
		} catch (_err) {
			const {responseMessage = undefined, message = undefined } = _err.response?.data || _err;
			setFeedbackError(responseMessage || message)
			if (responseMessage || message) {
				notify("error", responseMessage || message);
			}
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(()=>{
		if (feedbackError.toLowerCase().includes('otp')) {
			setFeedbackError('')
		}
	},[pins.otp])
	useEffect(()=>{
		if (feedbackError.toLowerCase().includes('otp')) {
			setCurrentLevel('otp')
		}
	},[feedbackError])

	return (
		<ModalWrapper
			ctaBtnText={'Proceed'}
			ctaDisabled={currentLevel === 'otp' ? pins.otp.length < 6 : (pins.pin.length < 4 || pins.confirmPin.length < 4)}
			heading={currentLevel === 'otp' ? 'Enter OTP' : 'Create PIN'}
			loading={isLoading}
			subHeading={currentLevel === 'pin' ? 'Create a unique PIN for your account' : ''}
			onClose={()=>onClose()}
			handleBottomSecAction={()=>currentLevel === 'pin' ? setCurrentLevel('otp') : onClose()}
			handleCta={()=>currentLevel === 'otp' ? setCurrentLevel('pin') : handleModalCta()}
		>
			<form>
				{currentLevel === 'otp' ?
					<Input label={`Enter OTP sent to ${maskedEmail(email)}`}
						error={ctaClicked && feedbackError?.toLowerCase().includes('otp')}
						errorMsg={'OTP is not valid'}>
						<div className={formStyles.otp_input_four}>
							<OtpInput
								value={pins.otp}
								onChange={(e)=> handlePinsChange({ target: { name: 'otp', value: e } })}
								numInputs={6}
								shouldAutoFocus={true}
								inputType="number"
								inputMode={null}
								renderSeparator={<span />}
								renderInput={(props) => <input {...props} />}
							/>
						</div>
					</Input> :
					<div style={{width: '80%', margin: '0 auto'}}>
						<Input label={'Create Pin'}
							label_center={false}>
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
							label_center={false}
							error={ctaClicked && (pins.pin !== pins.confirmPin)}
							errorMsg={'PINs do not match'}
							msgPositionCenter={false}
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
					</div>}
				{/* <div style={{borderBottom: '1px solid #e5e7ef', margin: '10px 0'}} /> */}
			</form>

		</ModalWrapper>
	)
}

export default CreatePinModal
