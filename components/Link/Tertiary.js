import React from 'react'
import Link from 'next/link'
const TertiaryLink = ({href, text}) => {
  return (
    <Link className='tertiary_link' href={href}>{text}</Link>
  )
}

export default TertiaryLink
