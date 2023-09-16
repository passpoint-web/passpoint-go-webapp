import React from 'react'
import Link from 'next/link'
const TertiaryLink = ({href, text}, type) => {
	return (
		<Link className={`tertiary_link ${type || ''}`}
			href={href}>{text}</Link>
	)
}

export default TertiaryLink
