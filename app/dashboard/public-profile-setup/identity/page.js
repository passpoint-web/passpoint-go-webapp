
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../public-profile.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import Input from '@/components/Dashboard/Input'
import { getCredentials } from '@/services/localService'
import { useNotify } from '@/utils/hooks'
import FileUpload from '@/components/FileUpload'
import FeedbackInfo from '@/components/FeedbackInfo'

const Identity = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { push } = useRouter()
	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)
	const [businessName, setBusinessName] = useState('')
	const [businessLogo, setBusinessLogo] = useState({})

	const notify = useNotify()

	useEffect(()=>{
		setBusinessName(getCredentials().businessName)
	},[])

	const handleSubmit = async (e) => {
		e.preventDefault()
		setCtaClicked(true)
		if (!allFieldsValid) {
			return
		}
		setIsLoading(true)
		try {

			notify('success', 'Your business logo has been saved')
			push('/dashboard/public-profile-setup/business')
		} catch (_err) {
			const { message } = _err.response?.data || _err
			notify('error', message)
		} finally {
			//
		}
	}

	useEffect(() => {
		// console.log(businessLogo)
		const conditionsMet = businessLogo.name
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
						fileObj={businessLogo}
						handlefileUpload={(e)=>setBusinessLogo(e)} />
					{
						ctaClicked && !businessLogo.name ?
							<FeedbackInfo message='Business Logo is required' /> :
							<></>
					}
					<Input
						label="Business Name"
						disabled
						value={businessName}
					/>
					<div className={styles.action_ctn}>
						<PrimaryBtn
							text="Save and continue"
							loading={isLoading}
						/>
					</div>
				</form>
			</div>
		</>
	)
}

export default Identity
