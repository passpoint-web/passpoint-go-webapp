
const SecondaryBtn = ({text, disabled}) => {
  return (
   <button className='tertiary_btn' disabled={disabled}>
    {text}
   </button>
  )
}

export default SecondaryBtn
