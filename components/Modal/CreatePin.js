
import { useEffect, useState } from 'react'
import ModalWrapper from './ModalWrapper'
import { useRouter, useSearchParams } from 'next/navigation'
import Input from "@/components/Dashboard/Input";
import PasswordField from "@/components/Auth/PasswordField"
import functions from "@/utils/functions"
import OtpInput from 'react-otp-input'
import formStyles from '@/assets/styles/auth-screens.module.css'
// import { useNotify } from "@/utils/hooks";
import { authenticate } from '@/services/restService';
import { saveCredentials, saveToken } from "@/services/localService";
import { getCredentials } from '@/services/localService';

const CreatePinModal = ({handlePinCreation}) => {
	const currentModal = 'createPinModal'
	// const notify = useNotify();
	const {createUrl} = functions
	const searchParams = useSearchParams()
	const {replace} = useRouter()
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false);
	const [ctaClicked, setCtaClicked] = useState(false);
	const [pinCreated, setPinCreated] = useState(false)
	// const [allFieldsValid, setAllFieldsValid] = useState(false);
	// const [isLoading, setIsLoading] = useState(false);
	const [feedbackError, setFeedbackError] = useState('')
	const [modalContent, setModalContent] = useState({
		heading: 'Confirm Password',
		subHeading: 'Kindly enter your account password',
		handleModalCta: ()=>{
			handleModalFlow('pin')
		}
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

	const [pinCreationModal, setPinCreationModal] = useState('password')

	const handleModalFlow = (val) => {
		console.log('da')
		const newParams = new URLSearchParams(searchParams.toString());
		if (val) {
			// console.log('yoyo')
			newParams.set(currentModal, val)
		} else {
			newParams.delete(currentModal)
		}
		replace(createUrl('/dashboard/wallet', newParams))
	}

	const confirmPassword = async () => {
		try {
			setIsLoading(true);
			const response = await authenticate.login({
				email: getCredentials().email,
				password
			});
			const {data, token} = response.data;
			saveToken(token)
			saveCredentials(data);
			handleModalFlow('pin')
		} catch (_err) {
			const { message } = _err.response?.data || _err;
			setFeedbackError(message)
		} finally {
			setIsLoading(false);
		}
	}

	const defineModalContents = (level) => {
		setPinCreationModal(level)
		switch (level) {
		case 'password':
			setModalContent({
				heading: 'Confirm Password',
				subHeading: 'Kindly enter your account password',
				handleModalCta: ()=>{
					confirmPassword()
				}
			})
			break;
		case 'pin':
			setModalContent({
				heading: 'Create PIN',
				subHeading: 'Kindly create a unique PIN for your account',
				handleModalCta: ()=>{
					handleModalFlow('da')
					window.setTimeout(()=>{
						handlePinCreation()
					}, 2000)
				}
			})
			break;
		default:
			setModalContent({
				handleModalCta: ()=>{
					handleModalFlow('')
				}
			})
		}
	}

	useEffect(()=>{
		if (['password', 'pin'].includes(searchParams.get(currentModal))) {
			defineModalContents(searchParams.get(currentModal))
		}
	},[searchParams.get(currentModal)])

	return (
		<ModalWrapper
			ctaBtnText={modalContent.ctaBtnText}
			ctaDisabled={searchParams.get(currentModal) === 'password' ? !password : searchParams.get(currentModal) === 'pin' ? (pins.pin.length < 4 || pins.confirmPin.length < 4) : false}
			heading={modalContent.heading}
			loading={isLoading}
			subHeading={modalContent.subHeading}
			onClose={()=>handleModalFlow('')}
			handleCta={modalContent.handleModalCta}
		>
			<form>
				{searchParams.get('createPinModal') === 'password' ?
					<>
						<Input
							label="Password"
							id="password"
							name="password"
							placeholder="Password"
							error={ctaClicked && !password || feedbackError.toLowerCase().includes('password')}
							errorMsg={!password ? 'Password is required' : feedbackError.toLowerCase().includes('password') ? feedbackError : 'Password is required'}
						>
							<PasswordField
								errorField={ctaClicked && !password}
								passwordStrengthNeeded={false}
								emitPassword={(e) => setPassword(e)
								}
							/>
						</Input>
					</> : searchParams.get('createPinModal') === 'pin' ?
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
