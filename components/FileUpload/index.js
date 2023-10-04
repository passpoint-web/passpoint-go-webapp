
'use client'
import styles from './index.module.css'
import formStyles from '@/assets/styles/auth-screens.module.css'
import { useEffect, useRef, useState } from 'react'
import functions from '@/utils/functions'
import { CancelIcon, UploadIcon, FileIcon } from '@/constants/icons'
import FeedbackInfo from '../FeedbackInfo'
import Image from 'next/image'
import { useNotify } from '@/utils/hooks'

const FileUpload = ({styleProps, error, errorMsg, id="file", accept="image/png, image/jpeg, image/svg, image/pdf", handlefileUpload, title, subTitle, base64}) => {
	const notify = useNotify()
	const onUploadClick = () => {
		logoFileUpload.current.click();
	};
	const logoFileUpload = useRef()
	const { formatNumber, returnBase64 } = functions
	const [fileReady, setFileReady] = useState(false)
	const [file, setFile] = useState(
		{
			size: 0,
			name: '',
			src: ''
		}
	)

	const onFileUpload = async (e) => {
		const fileObj = e.target.files[0] || file
		if ((fileObj.size / 1024) > 5120) {
			notify('error', 'File is larger than 5MB')
			return
		}
		setFile(prev => ({
			...prev,
			name: fileObj.name,
			size: fileObj.size,
			src: URL.createObjectURL(fileObj),
		}))
		setFileReady(false)
		// getFileDimension(fileObj)
		const result = await returnBase64(fileObj)
		handlefileUpload(result)
	}

	const removeFile = () => {
		handlefileUpload('')
		setFile({})
	}

	// const getFileDimension =(file) => {
	// 	const img = document.createElement('img');
	// 	const objectURL = URL.createObjectURL(file);
	// 	img.onload = function handleLoad () {
	// 		console.log(img.width, img.height)
	// 		// const ratio = img.width/img.height
	// 		// console.log(ratio)
	// 		setFile(prev => ({
	// 			...prev,
	// 			size: file.size,
	// 			name: file.name,
	// 			// width: 70*ratio,
	// 			// height: 70*ratio
	// 		}))
	// 		setFileReady(true)
	// 	};
	// 	img.src = objectURL

	// 	setFile(prev => ({
	// 		...prev,
	// 		src: img.src,
	// 	}))
	// }

	useEffect(()=>{
		setFileReady(true)
	},[file])

	return (
		<div style={{marginBottom: 24}}>
			<div className={`${styles.upload_ctn} ${error ? styles.error : ''}`}
				style={{...styleProps}}>
				<div>
					<h2>
						{title}
					</h2>
					<p>
						{subTitle}
					</p>
				</div>
				<div className={formStyles.form_group}>
					<label>Upload</label>
					{
						!base64 ? (<div className={styles.file_upload}
							onClick={onUploadClick}>
							<UploadIcon />
							<h3>Click here to upload</h3>
							<p>PNG, PDF, JPG, SVG up to 5MB</p>
							<input
								type="file"
								id={id}
								name={id}
								ref={logoFileUpload}
								accept={accept}
								onChange={(e)=>onFileUpload(e)}
							/>
						</div>) :
							<div className={styles.file_uploaded}
							>
								<button className='absolute_close_btn button'
									onClick={removeFile}>
									<CancelIcon />
									{/* <span>Change</span> */}
								</button>
								<div className={styles.top}>
									{/* <FileIcon /> */}
									<div className={styles.file_ctn}>
										{fileReady ? <Image src={file.src}
											alt="base 64 img"
											width={100}
											height={100} /> : <></>}
									</div>
									<div className={styles.file_desc}>
										<h3>{file?.name}</h3>
										<p>{formatNumber(file?.size / 1024, 1)}KB</p>
									</div>
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
