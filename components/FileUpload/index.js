
'use client'
import styles from './index.module.css'
import formStyles from '@/assets/styles/auth-screens.module.css'
import { useRef } from 'react'
import functions from '@/utils/functions'
import { CancelIcon, UploadIcon, FileIcon } from '@/constants/icons'

const FileUpload = ({handlefileUpload, title, subTitle, fileObj}) => {
	const onUploadClick = () => {
		logoFileUpload.current.click();
	};
	const logoFileUpload = useRef()
	const { formatNumber } = functions
	return (
		<div className={styles.upload_ctn}>
			<div>
				<h2>
					{/* Business Logo */}
					{title}
				</h2>
				<p>
					{/* Upload your Business Logo below */}
					{subTitle}
				</p>
			</div>
			<div className={formStyles.form_group}>
				<label>Upload</label>
				{!fileObj.name ? (<div className={styles.file_upload}
					onClick={onUploadClick}>
					<UploadIcon />
					<h3>Click here to upload</h3>
					<p>PNG, PDF, JPG, SVG up to 5MB</p>
					<input type="file"
						id="business-logo"
						name="fileObj"
						ref={logoFileUpload}
						accept="image/png, image/jpeg, image/svg, image/pdf"
						onChange={(e)=>handlefileUpload(e.target.files[0] ? e.target.files[0] : fileObj)}
					/>
				</div>) :
					<div className={styles.file_uploaded}
					>
						<button className='absolute_close_btn button'
							onClick={()=>handlefileUpload({})}
						><CancelIcon /></button>
						<div className={styles.top}>
							<FileIcon />
							<div className={styles.file_desc}>
								<h3>{fileObj.name}</h3>
								<p>{formatNumber(fileObj.size / 1024, 0)}KB</p>
							</div>
						</div>
					</div>
				}
			</div>
		</div>
	)
}

export default FileUpload
