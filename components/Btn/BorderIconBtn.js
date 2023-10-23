import React from 'react'

const BorderIconBtn = ({children, styleProps, bdColor, bgColor, classProps='', ...props}) => {
  return (
    <button
    {...props}
    className={`${classProps}`}
    style={{border: bdColor ? `1px solid ${bdColor}` : '', color: bdColor || '', backgroundColor: bgColor || '', ...styleProps}}
    >
      {children}
    </button>
  )
}

export default BorderIconBtn
