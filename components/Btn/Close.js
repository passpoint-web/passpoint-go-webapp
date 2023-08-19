
const CloseBtn = ({text, disabled, type}) => {
  return (
   <button className='close_btn' disabled={disabled}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4.16675 15.8333L15.8334 4.16663M4.16675 4.16663L15.8334 15.8333L4.16675 4.16663Z" stroke="#565C69" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
   </button>
  )
}

export default CloseBtn
