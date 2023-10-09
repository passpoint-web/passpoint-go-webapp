
import { useRouter, useSearchParams } from 'next/navigation'
import { authenticate } from '@/services/restService'
import functions from '@/utils/functions'
import { useNotify } from '@/utils/hooks'
import formStyles from '@/assets/styles/auth-screens.module.css'
import { useEffect, useState } from 'react'
import ModalWrapper from '@/components/Modal/ModalWrapper'
import { getCredentials } from '@/services/localService'
import Input from '../Dashboard/Input'
import OtpInput from 'react-otp-input'
import ResendOTP from '../Verify/ResendOTP'

const ForgotPasswordFlow = () => {

	const {maskedEmail, createUrl} = functions
	const notify = useNotify()
	const {push} = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const searchParams = useSearchParams()
	const [otp, setOtp] = useState('')
	const [errorMsg, setErrorMsg] = useState('')
	const [ctaClicked, setCtaClicked] = useState(false)
	const savedCredentials = getCredentials()
	const [modalContent, setModalContent] = useState({
		heading: '',
		subHeading: ''
	})
	// eslint-disable-next-line no-unused-vars
	const [email, setEmail] = useState(savedCredentials.email)

	const handleForgotPasswordSubmit = async () => {
		setIsLoading(true);
		try {
			const response = await authenticate.forgotPassword({email});
			const {message} = response.data;
			notify("success", message);
			handleForgotPasswordLevel('verify')
		} catch (_err) {
			const { message } = _err.response?.data || _err;
			notify("error", message);
			console.log(message);
		} finally {
			setIsLoading(false);
		}
	}

  const handleVerifyOtp = async () => {
		setCtaClicked(true)
		if (otp?.length !== 6) {
			return
		}
		setIsLoading(true)
		try {
			const payload = {
				otp,
				email,
				otpType: 'passwordReset'
			}
			const response = await authenticate.verifyEmailOtp(payload)
			console.log(response)
			notify('success', 'Verified!')
			handleForgotPasswordLevel('create')
		} catch (_err) {
			const { message } = _err.response?.data || _err
			notify('error', message)
		} finally {
			setIsLoading(false)
		}
	}

	// useEffect(()=>{
	// 	console.log('object')
	// 	// handleForgotPasswordLevel('otp')
	// },[])

	const forgot = searchParams.get('forgotPasswordLevel') === 'forgot'
	const verify = searchParams.get('forgotPasswordLevel') === 'verify'
	const create = searchParams.get('forgotPasswordLevel') === 'create'

	const defineModalContents = () => {
		const heading = forgot ? 'Forgot Password' : verify ? 'Verify Your Email' : create ? 'Create New Password' : ''
		const subHeading = forgot ? 'An OTP will be sent your email' : verify ? `We sent a 6 digit code to ${maskedEmail(email)}, please enter the code below, or click the verification link in your mail to complete verification ` : create ? 'Kindly enter a unique password to secure your account' : ''
		const content = {
			heading,
			subHeading,
		}
		setModalContent(content)
	}


	const handleForgotPasswordLevel = (val) => {
		const newParams = new URLSearchParams(searchParams.toString());
		if (val) {
			newParams.set('forgotPasswordLevel', val)
		} else {
			newParams.delete('forgotPasswordLevel')
		}
		push(createUrl('/dashboard/settings/security', newParams))
	}

	const handleCta = () => {
		if (forgot) {
			handleForgotPasswordSubmit()
		} else if (verify) {
			handleVerifyOtp()
		} else {
			handleCreatePassword()
		}
	}
	const handleCreatePassword = () => {}

	const onClose = () => {
		handleForgotPasswordLevel()
	}


	useEffect(()=>{
		defineModalContents()
	},[searchParams.get('forgotPasswordLevel')])


	return (
		<>
			{
				<ModalWrapper
					loading={isLoading}
					onClose={()=>onClose()}
					ctaBtnType='sd'
					handleCta={handleCta}
					heading={modalContent.heading}
					subHeading={modalContent.subHeading}
					ctaBtnText='Continue'
					bottomCancelNeeded={false}
				>
					{
						forgot ? 	
							<form className={formStyles.form}>
								<Input
									label='Email Address'
									id='email'
									name='email'
									disabled
									defaultValue={email}
								/>
							</form> : 
							verify ? 
          	<form className={formStyles.form}>
									<Input
										error={(ctaClicked && otp?.length !== 6) || errorMsg}
										errorMsg={otp?.length !== 6 ? 'Valid OTP needed' : errorMsg}
										msgPositionCenter={true}
									>
                	<div className={formStyles.otp_input}>
											<OtpInput
												value={otp}
												onChange={setOtp}
												numInputs={6}
												shouldAutoFocus={true}
												inputType="number"
												inputMode={null}
												renderSeparator={<span />}
												renderInput={(props) => <input {...props} />}
											/>
										</div>
									</Input>
									<div style={{display: 'flex', justifyContent: 'center'}}>
										<ResendOTP
											email={email}
											clearOtp={()=>setOtp('')}
										/>
									</div>
								</form> : 
								create ? 
									<form className={formStyles.form}>
										<Input
											label='Email Address'
											id='email'
											name='email'
											disabled
											defaultValue={email}
										/>
									</form> : 
									<></>
					}
				
						
				</ModalWrapper>
			}
		</>
	)
}

export default ForgotPasswordFlow
