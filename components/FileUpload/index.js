
import styles from './index.module.css'
import formStyles from '@/assets/styles/auth-screens.module.css'
import { useRef, useState } from 'react'
import functions from '@/utils/functions'
// eslint-disable-next-line no-unused-vars
import { CancelIcon, PDFIcon, UploadIcon } from '@/constants/icons'
import FeedbackInfo from '../FeedbackInfo'
import Image from 'next/image'
import { useNotify } from '@/utils/hooks'
import TertiaryBtn from '../Btn/Tertiary'

const FileUpload = ({
	styleProps, 
	disabled, 
	error, 
	errorMsg, 
	id="file", 
	accept="image/png, image/jpeg, image/svg, application/pdf", 
	handlefileUpload, 
	title, 
	subTitle, 
	smTitle, 
	base64
}) => {
	const notify = useNotify()
	const logoFileUpload = useRef()
	const [updateFileInput, setUpdateFileInput] = useState(1)

	const onUploadClick = (e) => {
		e.preventDefault()
		logoFileUpload.current.click();
	};
	const { returnBase64 } = functions

	const onFileUpload = async (e) => {
		console.log(e)
		const fileObj = e.target.files[0]
		if (!fileObj) {
			return
		}
		if ((fileObj.size / 1024) > 1500) {
			notify('error', 'File is larger than 1.5MB')
			return
		}
		const result = await returnBase64(fileObj)
		handlefileUpload(result)
		// to rerender file input and remove lingering files in pipeline
		setUpdateFileInput(updateFileInput+1)
	}

	const removeFile = () => {
		handlefileUpload('')
	}

	return (
		<div style={{marginBottom: 24}}>
			<div className={`${styles.upload_ctn} ${error ? styles.error : ''}`}
				style={{...styleProps}}>
				<div>
					<h2 className={styles.title}>
						{title}
					</h2>

					<h3 className={styles.sm_title}>
						{smTitle}
					</h3>

					<p>
						{subTitle}
					</p>
				</div>
				<div className={formStyles.form_group}>
					<label>Upload</label>
					<input
						type="file"
						key={updateFileInput}
						id={id}
						disabled={disabled}
						name={id}
						ref={logoFileUpload}
						accept={accept}
						onChange={(e)=>onFileUpload(e)}
					/>
					{
						!base64 ? (<div className={`${styles.file_upload} ${disabled ? styles.disabled : ''}`}
							onClick={(e)=>onUploadClick(e)}>
							<UploadIcon />
							<h3>Click here to upload</h3>
							<p>PNG, PDF, JPG, SVG up to 1.5MB</p>
						</div>) :
							<div className={styles.file_uploaded}
							>
								<button className='absolute_close_btn button'
									onClick={removeFile}>
									<CancelIcon />
								</button>
								<div className={styles.top}>
									{base64 ?
										<div className={styles.file_ctn}>
											{!base64.includes('application/pdf') ?
												<Image
													src={base64}
													alt="base 64 img"
													width={100}
													height={100} /> :
												<PDFIcon /> }
											<TertiaryBtn text="Change"
												onClick={(e)=>onUploadClick(e)} />
										</div> : <></>}
								</div>
							</div>
					}
				</div>
			</div>
			{
				error && errorMsg ?
					<FeedbackInfo message={errorMsg} /> :
					<></>

			}
		</div>
	)
}

export default FileUpload
