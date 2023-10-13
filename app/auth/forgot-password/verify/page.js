'use client'
import VerifyEmail from "@/components/Verify"
import { getForgotPasswordEmail } from "@/services/localService"

const ForgotPasswordVerifyEmail = () => {
	const email = getForgotPasswordEmail()
	return (
		<>
			<VerifyEmail email={email}
				otpType='passwordReset'
				backBtnNeeded={true}
				nextPath="/auth/forgot-password/reset"
			/>
		</>
	)
}

export default ForgotPasswordVerifyEmail