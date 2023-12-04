import React, { useEffect, useState } from 'react'
// import Switch from '../../Custom/Switch'
import ModalWrapper from '../../Modal/ModalWrapper'
import Input from '../../Dashboard/Input'
import PasswordField from '../../Auth/PasswordField'
import Button from '../../Btn/Button'
import formStyles from '@/assets/styles/auth-screens.module.css'
import styles from './2fa.module.css'
import Tab from '../../Tab'
import OtpInput from 'react-otp-input'
import PhoneInput from 'react-phone-input-2'
import ResendOTP from '../../Verify/ResendOTP'
import ActionFeedbackCard from '@/components/ActionFeedbackCard'
import QRCode from './QRCode'

const Toggle2FA = ({onClose}) => {
	// eslint-disable-next-line no-unused-vars
	const [ctaClicked, setCtaClicked] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [feedbackError, setFeedbackError] = useState("");
	const [step, setStep] = useState(0);
	const [renderInput, setRenderInput] = useState(false)
	const [payload, setPayload] = useState({
		password: "",
		phoneNumber: "09059493939",
		phone: "",
		otp: ""
	});

	const [activeTab, setActiveTab] = useState('Phone Number')

	const authTabs = ['Phone Number', 'Authenticator App']

	const levels = [
		{
			heading: 'Enter Your Password',
			subHeading: 'To enable 2FA kindly authenticate with your password',
			ctaBtnText: 'Continue',
			disabled: () => payload.password.length < 6
		},
		{
			heading: 'Enable 2-Factor Authentication',
			subHeading: 'Add a double layer of security.',
			ctaBtnText: 'Proceed',
			disabled: () => activeTab === 'Phone Number' ? !payload.phone : payload.tuEfAyValue
		},
		{
			heading: activeTab === 'Phone Number' ? 'Verify Phone Number' : 'Verify OTP',
			subHeading: (
				<>
					{activeTab === 'Phone Number' ? <div style={{maxWidth: '450px'}}>
          We sent a 6 digit code to <span><b>{payload.phoneNumber}</b></span>, If this is not your number <Button className="tertiary"
							text="change number"
							onClick={()=>setStep(1)} />; please enter the code below, or click the verification link in your inbox to complete verification
					</div> : 'Kindly provide the 6 digit OTP sent to your authenticator app'
					}
				</>
			),
			ctaBtnText: 'Verify',
			disabled: () => payload.otp.length !== 6
		}
	]

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPayload((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	// const toggle2FA = () => {
	// 	setShow2FAModal(true)
	// }

	const handleCta = (level) => {
		console.log(level)
		switch (level) {
		case 0:
			handleLevelZeroCta();
			break;
		case 1:
			handleLevelOneCta();
			break;
		case 2:
			handleLevelTwoCta();
			break;
		case 'success':
			onClose('success');
			break;
		}
	}

	const handleLevelZeroCta = () => {
		console.log('yoyo')
		if (!payload.password) {
			return
		}
		setStep(1)
	}
	const handleLevelOneCta = () => {
		if (!payload.phone) {
			return
		}
		setStep(2)
	}
	const handleLevelTwoCta = () => {
		// if (!payload) {
		// 	return
		// }
		setStep('success')
	}

	useEffect(() => {
		setRenderInput(true)
	}, [])

	const Step0 = () => (
		<>
			<Input
				label="Password"
				id="password"
				name="password"
				placeholder="Password"
				error={
					(ctaClicked && !payload.password) ||
                  feedbackError?.toLowerCase().includes("password")
				}
				errorMsg={
					!payload.password
						? "Password is required"
						: feedbackError?.toLowerCase().includes("password")
							? feedbackError
							: "Password is required"
				}
			>
				<PasswordField
					errorField={ctaClicked && !payload.password}
					passwordStrengthNeeded={false}
					emitPassword={(e) =>
						handleChange({
							target: { name: "password", value: e },
						})
					}
				/>
			</Input>
		</>
	)

	const Step1 = () => (
		<>
			<Tab tabs={authTabs}
				activeTab={activeTab}
				setActiveTab={(val)=>setActiveTab(val)}/>
			{
				activeTab === 'Phone Number' ?
					<Input
						id="phone"
						label="Phone Number"
						error={ctaClicked && !payload.phone}
						errorMsg="Phone is required"
					>
						<PhoneInput
							country={"ng"}
							onlyCountries={['ng']}
							value={payload.phone}
							onChange={(phone) =>
								handleChange({ target: { name: "phone", value: phone }})
							}
						/>
					</Input> :
					<div className={styles.authenticator}>
						<div className={styles.instructions}>
							<h3>Instructions</h3>
							<ol>
								<li>
									Download/Install any authenticator app of your choice
								</li>
								<li>
									Scan the QR code below or copy code below
								</li>
								<li>
									Enter OTP to verify setup
								</li>
							</ol>
						</div>
						<div className={styles.scan_sec}>
							<div className={styles.qr_code}>
								<p>Scan QR code</p>
								<QRCode styles={styles} value='9a6d4b1f8c7e3a2d5b0f9e8c1d3a5b0' />
							</div>
							<div className={styles.copy_code}>
								<p>Or copy the code below</p>
								<Input value='9a6d4b1f8c7e3a2d5b0f9e8c1d3a5b0'
									disabled />
							</div>
						</div>
					</div>
			}
		</>
	)

	const Step2 = () => (
		<>
			<div className={formStyles.inner}
				style={{marginTop: '30px'}}>
				<Input
					error={(ctaClicked && payload.otp?.length !== 6) || feedbackError}
					errorMsg={payload.otp?.length !== 6 ? 'Valid OTP needed' : feedbackError}
					msgPositionCenter={true}
				>
					<div className={formStyles.otp_input}>
						{
							renderInput ?
								<OtpInput
									value={payload.otp}
									onChange={(otp)=> handleChange({ target: { name: "otp", value: otp } })}
									numInputs={6}
									shouldAutoFocus={true}
									inputType="number"
									inputMode={null}
									renderSeparator={<span />}
									renderInput={(props) => <input {...props} />}
								/>
								:
								<></>
						}
					</div>
				</Input>
				{
					activeTab === 'Phone Number' ?
						<ResendOTP
							style={{margin: '0 auto'}}
							otpType='phone'
							endpoint={'/'}
							clearOtp={()=>
								handleChange(
									{ target: { name: "otp", value: ''}}
								)
							}
						/> : <></>
				}
			</div>
		</>
	)
	return (
		<>
			<ModalWrapper
				heading={levels[step]?.heading}
				subHeading={levels[step]?.subHeading}
				ctaBtnType='sd'
				ctaDisabled={levels[step]?.disabled()}
				onClose={()=>onClose()}
				bottomCancelNeeded={[1, 2].includes(step)}
				handleCta={()=>handleCta(step)}
				handleBottomSecAction={()=>setStep(step-1)}
				ctaBtnText={levels[step]?.ctaBtnText}
				width='480px'
				hasBottomActions={!(step === 1 && activeTab=== 'Authenticator App')}
			>
				<form>
					{step === 0 ?
						Step0() :
						step === 1 ?
							Step1() :
							step === 2 ?
								Step2() :
								step === 'success' ?
									<ActionFeedbackCard
										content={{
											title: '2FA Successfully Enabled',
											value: 'You have successfully added a double layer of security to your account',
											status: 'success'
										}}
									/> :<></>
					}
				</form>
			</ModalWrapper>
		</>
	)
}

export default Toggle2FA
