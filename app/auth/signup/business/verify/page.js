'use client'
import VerifyEmail from "@/components/Verify"
import { getCredentials } from "@/services/localService"
import { useEffect, useState } from "react"

const VerifyEmailPage = () => {
	const savedCredentials = getCredentials()
	const [email, setEmail] = useState({})
	useEffect(()=>{
		setEmail(savedCredentials.email)
	},[])
	return (
		<VerifyEmail email={email}
			otpType='accountVerification'
		/>
	)
}

export default VerifyEmailPage
