import React from 'react'
import Link from 'next/link'
const SecondaryLink = ({href, text}) => {
  return (
    <Link className='secondary_link' href={href}>{text}</Link>
  )
}

export default SecondaryLink
