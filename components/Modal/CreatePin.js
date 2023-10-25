
import { useEffect, useState } from 'react'
import ModalWrapper from './ModalWrapper'
import { useRouter, useSearchParams } from 'next/navigation'
import Input from "@/components/Dashboard/Input";
import PasswordField from "@/components/Auth/PasswordField"
import functions from "@/utils/functions"
import OtpInput from 'react-otp-input'
import formStyles from '@/assets/styles/auth-screens.module.css'
// import { useNotify } from "@/utils/hooks";

const CreatePinModal = () => {
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

	const [pinCreationModal, setPinCreationModal] = useState('password')

	const handleModalFlow = (val) => {
		const newParams = new URLSearchParams(searchParams.toString());
		if (val) {
			newParams.set('createPinModal', val)
		} else {
			newParams.delete('createPinModal')
		}
		replace(createUrl('/dashboard/wallet', newParams))
	}


	const defineModalContents = (level) => {
		setPinCreationModal(level)
		switch (level) {
		case 'password':
			setModalContent({
				heading: 'Confirm Password',
				subHeading: 'Kindly enter your account password',
				handleModalCta: ()=>{
					handleModalFlow('pin')
				}
			})
			break;
		case 'pin':
			setModalContent({
				heading: 'Create PIN',
				subHeading: 'Kindly create a unique PIN for your account',
				handleModalCta: ()=>{
					handleModalFlow('')
				}
			})
			break;
		}
		// updateInfo(true)
	}

	useEffect(()=>{
		defineModalContents(searchParams.get('createPinModal'))
	},[searchParams.get('createPinModal')])

	return (
		<>
			{
				searchParams.get('createPinModal') ?
					<ModalWrapper
						ctaBtnText={modalContent.ctaBtnText}
            ctaDisabled={searchParams.get('createPinModal') === 'password' ? !password : (pins.pin.length < 4 || pins.confirmPin.length < 4)}
						heading={modalContent.heading}
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
								</> :
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

					</ModalWrapper> : <></>
			}</>
	)
}

export default CreatePinModal
