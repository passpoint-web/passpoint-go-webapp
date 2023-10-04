
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

const IdentityPage = ({styles}) => {
	const [isLoading, setIsLoading] = useState(false)
	const { push } = useRouter()
	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)
	const savedCredentials = getCredentials()
	const businessName = savedCredentials?.businessName
	const [businessLogo, setBusinessLogo] = useState('')

	const notify = useNotify()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setCtaClicked(true)
		if (!allFieldsValid) {
			return
		}
		setIsLoading(true)
		try {
			const response = await publicProfile.uploadBusinessLogo({logo: businessLogo})
			console.log(response)
			notify('success', 'Your business logo has been saved')
			push('/dashboard/public-profile-setup/business')
		} catch (_err) {
			const { message } = _err.response?.data || _err
			notify('error', message)
			if (message.toLowerCase().includes('already uploaded')) {
				push('/dashboard/public-profile-setup/business')
			}
		} finally {
			setIsLoading(true)
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
