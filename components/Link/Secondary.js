import React from 'react'
import Link from 'next/link'
const SecondaryLink = ({ href, text, type }) => {
	return (
		<Link className={`secondary_link ${type || ''}`}
			href={href}>
			{text}
		</Link>
	)
}

export default SecondaryLink
