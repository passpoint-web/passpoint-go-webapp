import { useRouter, useSearchParams } from "next/navigation";
import { authenticate } from "@/services/restService";
import functions from "@/utils/functions";
import { useNotify } from "@/utils/hooks";
import formStyles from "@/assets/styles/auth-screens.module.css";
import { useEffect, useState } from "react";
import ModalWrapper from "@/components/Modal/ModalWrapper";
import { getCredentials } from "@/services/localService";
import Input from "../Dashboard/Input";
import OtpInput from "react-otp-input";
import ResendOTP from "../Verify/ResendOTP";
import PasswordField from "@/components/Auth/PasswordField";
import ActionFeedbackCard from "../ActionFeedbackCard";

const ForgotPasswordFlow = () => {
	const { maskedEmail, createUrl } = functions;
	const notify = useNotify();
	const { replace } = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const searchParams = useSearchParams();
	const [otp, setOtp] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [ctaClicked, setCtaClicked] = useState(false);
	const savedCredentials = getCredentials();
	// eslint-disable-next-line no-unused-vars
	const [email, setEmail] = useState(savedCredentials.email);
	const [modalContent, setModalContent] = useState({
		heading: "",
		subHeading: "",
	});
	// password reset
	const [passwordFieldsValid, setPasswordFieldsValid] = useState(false);
	const [payload, setPayload] = useState({
		password: "",
		confirm: "",
		email,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPayload((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleForgotPasswordSubmit = async () => {
		setIsLoading(true);
		try {
			const response = await authenticate.forgotPassword({ email });
			const { message } = response.data;
			notify("success", message);
			handleForgotPasswordLevel("verify");
		} catch (_err) {
			const { message } = _err.response?.data || _err;
			notify("error", message);
			console.log(message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleVerifyOtp = async () => {
		setCtaClicked(true)
		if (otp?.length !== 6) {
			return
		}
		setErrorMsg('')
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
			if (message.toLowerCase().includes('otp')) {
				setErrorMsg(message)
			}
		} finally {
			setIsLoading(false)
		}
	}


	const forgot = searchParams.get("forgotPasswordLevel") === "forgot";
	const verify = searchParams.get("forgotPasswordLevel") === "verify";
	const create = searchParams.get("forgotPasswordLevel") === "create";
	const success = searchParams.get("forgotPasswordLevel") === "success";

	const defineModalContents = () => {
		const heading = forgot
			? "Forgot Password"
			: verify
				? "Verify Your Email"
				: create
					? "Create New Password"
					: "";
		const subHeading = forgot
			? "An OTP will be sent your email"
			: verify
				? `We sent a 6 digit code to ${maskedEmail(
					email
				)}, please enter the code below, or click the verification link in your mail to complete verification `
				: create
					? "Kindly enter a unique password to secure your account"
					: "";
		const content = {
			heading,
			subHeading,
		};
		setModalContent(content);
	};

	const handleForgotPasswordLevel = (val) => {
		const newParams = new URLSearchParams(searchParams.toString());
		if (val) {
			newParams.set("forgotPasswordLevel", val);
		} else {
			newParams.delete("forgotPasswordLevel");
		}
		replace(createUrl("/dashboard/settings/security", newParams));
	};

	const handleCta = () => {
		if (forgot) {
			handleForgotPasswordSubmit();
		} else if (verify) {
			handleVerifyOtp();
		} else if (create) {
			handleCreatePassword();
		} else if (success) {
			handleForgotPasswordLevel();
		}
	};
	const handleCreatePassword = async () => {
		setCtaClicked(true);
		if (!passwordFieldsValid) {
			return;
		}
		setIsLoading(true);
		try {
			const response = await authenticate.resetPassword(payload);
			const { message } = response.data;
			notify("success", message);
			handleForgotPasswordLevel("success");
		} catch (_err) {
			const { message } = _err.response?.data || _err;
			notify("error", message);
		} finally {
			setIsLoading(false);
		}
	};

	const onClose = () => {
		handleForgotPasswordLevel();
	};

	useEffect(() => {
		defineModalContents();
		setCtaClicked(false);
	}, [searchParams.get("forgotPasswordLevel")]);

	useEffect(() => {
		const { password, confirm } = payload;
		if (password && password === confirm) {
			setPasswordFieldsValid(true);
		} else {
			setPasswordFieldsValid(false);
		}
	}, [payload.password, payload.confirm]);

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
											label="Password"
											id="password"
											name="password"
											placeholder="Password"
											error={ctaClicked && !payload.password}
										>
											<PasswordField
												id="password-field"
												errorField={ctaClicked && !payload.password}
												emitPassword={(e) =>
													handleChange({
														target: { name: 'password', value: e },
													})
												}
											/>
										</Input>
										<Input
											label="Confirm Password"
											id="confirm-password"
											name="confirm-password"
											placeholder="Confirm Password"
											error={ctaClicked && (!payload.confirm || payload.password !== payload.confirm)}
											errorMsg={ctaClicked && !payload.confirm ? 'Confirm password is required' : ctaClicked && payload.password !== payload.confirm ? 'Passwords do not match' : ''}
										>
											<PasswordField
												disabled={!payload.password}
												id="confirm-password-field"
												passwordStrengthNeeded={false}
												errorField={ctaClicked && !payload.confirm}
												emitPassword={(e) =>
													handleChange({
														target: { name: 'confirm', value: e },
													})
												}
											/>
										</Input>
									</form> :
									success ?
										<ActionFeedbackCard
											content={{
												success: true,
												title: 'Password Changed!',
												value: 'Your password has been changed successfully'
											}}
										/> :
										<></>
					}


				</ModalWrapper>
			}
		</>
	)
}

export default ForgotPasswordFlow;
