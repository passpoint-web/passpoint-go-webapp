import VerifyEmail from "@/components/Verify"
import { getCredentials } from "@/services/localService"

const VerifyEmailPage = () => {
	const savedCredentials = getCredentials()
	return (
		<VerifyEmail email={savedCredentials?.email}
			otpType='accountVerification'
		/>
	)
}

export default VerifyEmailPage
