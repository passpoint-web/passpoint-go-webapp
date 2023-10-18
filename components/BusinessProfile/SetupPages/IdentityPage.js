<<<<<<< HEAD
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Dashboard/Input";
import { getCredentials } from "@/services/localService";
import { useNotify } from "@/utils/hooks";
import FileUpload from "@/components/FileUpload";
import Button from "@/components/Btn/Button";
import formStyles from "@/assets/styles/auth-screens.module.css";
import { publicProfile } from "@/services/restService";
=======

'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/Dashboard/Input'
import { getCredentials } from '@/services/localService'
import { useNotify } from '@/utils/hooks'
import FileUpload from '@/components/FileUpload'
import Button from '@/components/Btn/Button'
import formStyles from '@/assets/styles/auth-screens.module.css'
import { publicProfile } from '@/services/restService'
import FullScreenLoader from '@/components/Modal/FullScreenLoader'
>>>>>>> 4724d10025534d72113d604a7a146b5e10608318
import { savePublicProfile,
	getPublicProfile as getSavedPublicProfile
} from '@/services/localService'
import FullScreenLoader from "@/components/Modal/FullScreenLoader";

const IdentityPage = ({styles}) => {
	const notify = useNotify()
	const savedPublicProfile = getSavedPublicProfile()
	const [dataLoading, setDataLoading] = useState(true)
	const [submitType, setSubmitType] = useState('NEW')
	const [isLoading, setIsLoading] = useState(false)
	const { push } = useRouter()
	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)
	const savedCredentials = getCredentials()
	const businessName = savedCredentials?.businessName
	const [businessLogo, setBusinessLogo] = useState('')


	useEffect(() => {
		const conditionsMet = businessLogo;
		if (conditionsMet) {
			setAllFieldsValid(true);
		} else {
			setAllFieldsValid(false);
		}
	}, [businessLogo]);

	// eslint-disable-next-line no-unused-vars
	const getPublicProfile = async () => {
		try {
			const response = await publicProfile.getPublicProfile()
			const data = response.data.data
			console.log(data)
			savePublicProfile(data)
			const {logo} = data.businessIdentity
			if (logo) {
				setBusinessLogo(logo)
				setSubmitType('EDIT')
			}
		} catch (_err) {
			console.log(_err)
		} finally {
			setDataLoading(false)
		}
	}
	useEffect(()=>{
		getPublicProfile()
	},[])

	const handleSubmit = async (e) => {
		e.preventDefault()
		setCtaClicked(true)
		if (!allFieldsValid) {
			return
		}
		setIsLoading(true)
		try {
			const response = await publicProfile.uploadBusinessLogo({logo: businessLogo, submitType})
			console.log(response)
			savePublicProfile({...savedPublicProfile, profileStage: savedPublicProfile.profileStage > 1 ? savedPublicProfile.profileStage : 1})
			notify('success', `Your business logo has been saved`)
			push('/dashboard/business-profile-setup/business')
		} catch (_err) {
			const { message } = _err.response?.data || _err
			notify('error', message)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		const conditionsMet = businessLogo
		if (conditionsMet) {
			setAllFieldsValid(true)
		} else {
			setAllFieldsValid(false)
		}
	}, [businessLogo])

	return (
		<>
			{dataLoading ? <FullScreenLoader /> : <></>}
			<div className={styles.inner}>
				<h1>Business Identity</h1>
				<form onSubmit={handleSubmit}>
					<FileUpload title='Business Logo'
						subTitle='Upload your Business Logo below'
						base64={businessLogo}
						handlefileUpload={(e)=>setBusinessLogo(e)}
						error={ctaClicked && !businessLogo}
						errorMsg='Business Logo is required'
					/>
					<Input
						label="Business Name"
						disabled
						defaultValue={businessName}
					/>
					<div className={formStyles.action_ctn}>
						<Button
							className='primary sd'
							text='Save and continue'
							loading={isLoading}
						/>
					</div>
				</form>
			</div>
		</>
	)
}

export default IdentityPage
