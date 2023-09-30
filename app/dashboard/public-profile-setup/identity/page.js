
'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../public-profile.module.css'
import formStyles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import Input from '@/components/Dashboard/Input'
import { getCredentials } from '@/services/localService'
import { CancelIcon, FileIcon, UploadIcon} from '@/constants/icons'
import { useNotify } from '@/utils/hooks'
import functions from '@/utils/functions'

const Identity = () => {
	const [isLoading, setIsLoading] = useState(false)
	const logoFileUpload = useRef()
	const { push } = useRouter()
	const {formatNumber} = functions
	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)
	const [businessName, setBusinessName] = useState('')
	const [businessLogo, setBusinessLogo] = useState({})

	const onUploadClick = () => {
		logoFileUpload.current.click();
	};

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

					<div className={styles.business_logo}>
						<div>
							<h2>Business Logo</h2>
							<p>Upload your Business Logo below</p>
						</div>
						<div className={formStyles.form_group}>
							<label>Upload</label>
							{!businessLogo.name ? (<div className={styles.file_upload}
								onClick={onUploadClick}>
								<UploadIcon />
								<h3>Click here to upload</h3>
								<p>PNG, PDF, JPG, SVG up to 5MB</p>
								<input type="file"
									id="business-logo"
									name="businessLogo"
									ref={logoFileUpload}
									accept="image/png, image/jpeg, image/svg, image/pdf"
									onChange={(e)=>setBusinessLogo(e.target.files[0])}
								/>
							</div>) :
								<div className={styles.file_uploaded}
								>
									<button className='absolute_close_btn button'
										onClick={()=>setBusinessLogo({})}
									><CancelIcon /></button>
									<div className={styles.top}>
										<FileIcon />
										<div className={styles.file_desc}>
											<h3>{businessLogo.name}</h3>
											<p>{formatNumber(businessLogo.size / 1024, 0)}KB</p>
										</div>
									</div>
								</div>
							}
						</div>
					</div>

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
