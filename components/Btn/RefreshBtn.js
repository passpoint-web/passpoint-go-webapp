import RefreshIcon from "../Icon/Refresh"

const RefreshBtn = ({refreshing,text, ...props}) => {
  return ( 
  <button {...props} disabled={refreshing} style={{display: 'flex', alignItems: 'center', fontSize: 13}}>
    {/* <span className='material-icons'>refresh</span> */}
    {text}
    <RefreshIcon refreshing={refreshing} />
  </button>
  )
}

export default RefreshBtn
