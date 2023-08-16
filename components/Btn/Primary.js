const PrimaryBtn = ({text, disabled}) => {
  return (
    <button className="primary_btn" disabled={disabled}>{text}</button>
  )
}

export default PrimaryBtn
