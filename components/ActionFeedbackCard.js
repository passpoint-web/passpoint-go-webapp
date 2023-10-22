import { ActionSuccessfulIcon, ActionFailedIcon } from "@/constants/icons"
const ActionFeedbackCard = ({
  content = {
    success: false,
    title: '',
    value: ''
  }
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 16
    }}
    >
        {content.success ? <ActionSuccessfulIcon /> : <ActionFailedIcon />}
      <h2>{content.title}</h2>
      <p style={{fontSize: 16}}>{content.value}</p>
    </div>
  )
}

export default ActionFeedbackCard
