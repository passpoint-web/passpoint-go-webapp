"use client";
import styles from "@/components/Settings/settings.module.css";
import formStyles from "@/assets/styles/auth-screens.module.css";
import { useEffect, useState } from "react";
import Input from "@/components/Dashboard/Input";
import PasswordField from "@/components/Auth/PasswordField";
import Button from "@/components/Btn/Button";
import Switch from "@/components/Custom/Switch";
// import ModalWrapper from '@/components/Modal/ModalWrapper'
// import { getCredentials } from '@/services/localService'
import { useNotify } from "@/utils/hooks";
import { useRouter, useSearchParams } from "next/navigation";
// import { forgotPassword } from '@/services/restService'
import functions from '@/utils/functions'
import { accountProfile } from '@/services/restService'
import ForgotPasswordFlow from '@/components/Settings/ForgotPasswordFlow'
import { wallet } from "@/services/restService/wallet";
import CreatePinModal from "@/components/Modal/CreatePin";
import { savePinCreated, getPinCreated, getCredentials } from "@/services/localService";
import Toggle2FA from "../2FA";
// import Link from 'next/link'
const Security = () => {
	const { createUrl } = functions;
	const { push } = useRouter();
	const searchParams = useSearchParams();
	const [show2FAModal, setShow2FAModal] = useState(false)
	// const [tuEfAy, setTuEfAy] = useState(false)
	const notify = useNotify();
	const [ctaClicked, setCtaClicked] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [allFieldsValid, setAllFieldsValid] = useState(false);
	const [feedbackMsg, setFeedbackMsg] = useState("");
	const [passwordFormKey, setPasswordFormKey] = useState(0);
	const [pinCreationLoading, setPinCreationLoading] = useState(false);
	const [showPinCreationModal, setShowPinCreationModal] = useState(false);
	const [pinCreated, setPinCreated] = useState(null);
	const [reference, setReference] = useState('');
	const [is2faEnabled, setIs2faEnabled] = useState(false)
	const [payload, setPayload] = useState({
		password: "",
		newPassword: "",
		confirm: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setPayload((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	useEffect(()=>{
		setIs2faEnabled(getCredentials().is2faEnable)
	},[])

	const handleForgotPasswordModals = (e) => {
		e.preventDefault();
		handleForgotPasswordLevel("forgot");
	};

	const handleForgotPasswordLevel = (val) => {
		const newParams = new URLSearchParams(searchParams.toString());
		newParams.set("forgotPasswordLevel", val);
		push(createUrl("/settings/security", newParams));
	};

	const handleResetPasswordSubmit = async (e) => {
		e.preventDefault();
		setCtaClicked(true);
		if (!allFieldsValid) {
			return;
		}
		setIsLoading(true);
		try {
			const { password, confirm } = payload;
			const response = await accountProfile.changePassword({
				former: password,
				password: confirm,
				confirm,
			});
			setPasswordFormKey((prev) => prev + 1);
			console.log(response);
			notify("success", `Your account's password has been updated`);
		} catch (_err) {
			const { message } = _err.response?.data || _err;
			notify("error", message);
			setFeedbackMsg(message);
		} finally {
			setIsLoading(false);
		}
	};
	const getWalletDetails = async () => {
		try {
			const response = await wallet.getWalletDetails()
			const {data} = response.data
			const {pinCreated} = data
			setPinCreated(pinCreated)
			savePinCreated(pinCreated)
		} catch (_err) {
			//
		} finally {
			//
		}
	}

	const initiatePinCreation = async() =>{
		setPinCreationLoading(true)
		try {
			const response = await wallet.initiatePin(pinCreated)
			setReference(response.data.reference)
			setShowPinCreationModal(true)
		} catch (_err) {
			// console.log(_err)
		}
		finally {
			setPinCreationLoading(false)
		}
	}

	useEffect(() => {
		setCtaClicked(false);
		setPayload({
			password: "",
			newPassword: "",
			confirm: "",
		});
		setFeedbackMsg("");
	}, [passwordFormKey]);

	useEffect(() => {
		setPinCreated(getPinCreated())
		getWalletDetails()
	}, []);

	useEffect(() => {
		const { newPassword, password, confirm } = payload;
		if (!newPassword || !confirm || newPassword !== confirm || !password) {
			setAllFieldsValid(false);
		} else {
			setAllFieldsValid(true);
		}
	}, [payload]);

	useEffect(() => {
		setFeedbackMsg("");
	}, [payload.password, searchParams]);

	const ChangePassword = () => (
		<div>
			{searchParams?.get("forgotPasswordLevel") && <ForgotPasswordFlow />}
			<h3>Change Password</h3>
			<form
				key={passwordFormKey}
				className={formStyles.form}
				onSubmit={handleResetPasswordSubmit}
			>
				<div className={styles.inner}>
					<Input
						label="Current Password"
						id="password"
						name="password"
						placeholder="Current Password"
						error={
							(ctaClicked && !payload.password) ||
              feedbackMsg.toLowerCase().includes("password")
						}
						errorMsg={
							ctaClicked && !payload.password
								? "Current password is required"
								: feedbackMsg.toLowerCase().includes("password")
									? feedbackMsg
									: ""
						}
					>
						<PasswordField
							id="password-field"
							passwordStrengthNeeded={false}
							errorField={
								(ctaClicked && !payload.password) ||
                feedbackMsg.toLowerCase().includes("password")
							}
							emitPassword={(e) =>
								handleChange({
									target: { name: "password", value: e },
								})
							}
						/>
					</Input>
					<Input
						label="New Password"
						id="new-password"
						name="new-password"
						placeholder="New Password"
						error={ctaClicked && !payload.newPassword}
					>
						<PasswordField
							id="new-password-field"
							errorField={ctaClicked && !payload.newPassword}
							emitPassword={(e) =>
								handleChange({
									target: { name: "newPassword", value: e },
								})
							}
						/>
					</Input>
					<Input
						label="Confirm Password"
						id="confirm-password"
						name="confirm-password"
						placeholder="Confirm Password"
						error={
							ctaClicked &&
              (!payload.confirm || payload.newPassword !== payload.confirm)
						}
						errorMsg={
							ctaClicked && !payload.confirm
								? "Confirm password is required"
								: ctaClicked && payload.newPassword !== payload.confirm
									? "Passwords do not match"
									: ""
						}
					>
						<PasswordField
							disabled={!payload.newPassword}
							id="confirm-password-field"
							passwordStrengthNeeded={false}
							errorField={
								ctaClicked &&
                (!payload.confirm || payload.newPassword !== payload.confirm)
							}
							emitPassword={(e) =>
								handleChange({
									target: { name: "confirm", value: e },
								})
							}
						/>
					</Input>
				</div>
				<div className={formStyles.action_ctn}>
					<Button
						className="primary sd"
						loading={isLoading}
						text="Update Password"
					/>
					<p>
            Forgot password?{" "}
						<Button
							className="tertiary"
							onClick={handleForgotPasswordModals}
							text="Reset it"
						/>
					</p>
				</div>
			</form>
		</div>
	);

	return (
		<div className={styles.security_page}>
			{show2FAModal ?
				<Toggle2FA onClose={()=>setShow2FAModal(false)}
					onSuccess={(val)=>setIs2faEnabled(!val)}
				/> :
				<></>
			}
			{
				showPinCreationModal ?
					<CreatePinModal handlePinCreation={()=>{
						setShowPinCreationModal(false)
						setPinCreated(true)
					}}
					pinCreated={pinCreated}
					reference={reference}
					onClose={()=>setShowPinCreationModal(false)}
					/> : <></>
			}
			<h1>Security & Privacy</h1>
			<div className={styles.border_box}>
				{ChangePassword()}
				<div className={`${styles.inner} ${styles.flex}`}>
					<h3>{pinCreated ? 'Reset' : 'Create'} PIN</h3>
					<Button className='tertiary'
						text={pinCreationLoading ? 'Loading...' : pinCreated ? 'Reset PIN' : 'Create PIN'}
						onClick={()=>initiatePinCreation()} />
				</div>
			</div>

			<div className={`${styles.border_box} ${styles.privacy}`}>
				<h3>2-Factor Authentication</h3>
				<div className={`${styles.inner} ${styles.flex}`}>
					<h4>{is2faEnabled ? 'Dis' : 'En'}able 2FA</h4>
					<button onClick={()=>{
						setShow2FAModal(true)
					}}>
						<Switch disabled
							checked={is2faEnabled}
							onChange={()=>setIs2faEnabled(!is2faEnabled)} />
					</button>
				</div>
			</div>
			<div className={`${styles.border_box} ${styles.privacy}`}>
				<h3>Privacy Settings</h3>
				<div className={`${styles.inner} ${styles.flex}`}>
					<h4>Bookings updates</h4>
					<Switch />
				</div>
			</div>
		</div>
	);
};

export default Security;
