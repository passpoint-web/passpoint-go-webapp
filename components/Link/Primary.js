import Link from 'next/link'

const PrimaryLink = ({text, type, ...props}) => {
	return (
		<Link className={`primary_btn ${type || ''}`}
			href={props.href}
			{...props}>{text}</Link>
	)
}

export default PrimaryLink
