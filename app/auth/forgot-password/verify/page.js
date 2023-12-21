
'use client'
import VerifyEmail from "@/components/Verify"
import { getForgotPasswordEmail } from "@/services/localService"
import { useEffect, useState } from "react"

const ForgotPasswordVerifyEmail = () => {
	const [email, setEmail] = useState('')
	useEffect(()=>{
		setEmail(getForgotPasswordEmail())
	},[])
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