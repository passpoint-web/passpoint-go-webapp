import RefreshIcon from "../Icon/Refresh"

const RefreshBtn = ({refreshing, ...props}) => {
  return ( 
  <button {...props} disabled={refreshing}>
    {/* <span className='material-icons'>refresh</span> */}
    <RefreshIcon refreshing={refreshing} />
  </button>
  )
}

export default RefreshBtn
