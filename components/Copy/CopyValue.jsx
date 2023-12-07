// import { CheckIcon } from "@/constants/icons"
import Button from "../Btn/Button"
import { useState } from "react"

const CopyValue = ({value='', color='#fff'}) => {

	const [copied, setCopied] = useState(false)

	const handleCopyValue = () => {
		navigator.clipboard.writeText(value)
		setCopied(true)
		setTimeout(() => {
			setCopied(false)
		}, 2000)
	}
	const CopyIcon = () => (
		<svg xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none">
			<path d="M13.3307 10.7493V14.2494C13.3307 17.166 12.1641 18.3327 9.2474 18.3327H5.7474C2.83073 18.3327 1.66406 17.166 1.66406 14.2494V10.7493C1.66406 7.83268 2.83073 6.66602 5.7474 6.66602H9.2474C12.1641 6.66602 13.3307 7.83268 13.3307 10.7493Z"
				stroke={color}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"/>
			<path d="M18.3307 5.74935V9.24935C18.3307 12.166 17.1641 13.3327 14.2474 13.3327H13.3307V10.7493C13.3307 7.83268 12.1641 6.66602 9.2474 6.66602H6.66406V5.74935C6.66406 2.83268 7.83073 1.66602 10.7474 1.66602H14.2474C17.1641 1.66602 18.3307 2.83268 18.3307 5.74935Z"
				stroke={color}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"/>
		</svg>
	)
	const CheckIcon = () => (
		<svg width="22"
			height="22"
			viewBox="0 0 22 22"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path fillRule="evenodd"
				clipRule="evenodd"
				d="M0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11Z"
				fill="#009ec4" />
			<path fillRule="evenodd"
				clipRule="evenodd"
				d="M16.3107 7.04297C16.7012 7.43349 16.7012 8.06666 16.3107 8.45718L10.1036 14.9572C9.71307 15.3477 9.0799 15.3477 8.68938 14.9572L5.68938 11.9572C5.29885 11.5667 5.29885 10.9335 5.68938 10.543C6.0799 10.1524 6.71307 10.1524 7.10359 10.543L9.39648 12.8359L14.8965 7.04297C15.287 6.65244 15.9202 6.65244 16.3107 7.04297Z"
				fill="#fff" />
		</svg>
	)
	return (
		<>
			{value ?
				<Button
					style={{
						cursor: 'pointer',
						width: 20,
						height: 22,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						transition: 'none'
					}}
					icon={!copied ? <CopyIcon color='#fff'  /> : <CheckIcon />}
					// disabled={copied}
					onClick={()=>handleCopyValue()} /> :
				<></>}
		</>
	)
}

export default CopyValue
