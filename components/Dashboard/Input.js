import FeedbackInfo from "../FeedbackInfo"
import styles from "@/assets/styles/auth-screens.module.css"
import ToolTip from "./ToolTip"
import { Spinner } from "@chakra-ui/react"
const Input = ({
  children,
  label,
  error = false,
  errorMsg,
  successMsg,
  info,
  msgPositionCenter,
  styleProps,
  toolTipMessage,
  label_center = false,
  loading,
  ...props
}) => {
  return (
    <>
      <div
        className={`${styles.form_group} input__ctn ${error ? "error" : ""}`}
        style={styleProps}
      >
        {label ? (
          <div className={styles.label_ctn} style={{ display: "flex" }}>
            <label
              htmlFor={props.id}
              className="flex justify-between w-[100%]"
              style={{ margin: label_center ? "0 auto 8px" : "" }}
            >
              {label}
              {loading && <Spinner className="mr-2" size="sm" />}
            </label>
            {toolTipMessage ? <ToolTip message={toolTipMessage} /> : <></>}
          </div>
        ) : (
          <></>
        )}
        {children || <input {...props} />}
        {error && errorMsg ? (
          <FeedbackInfo center={msgPositionCenter} message={errorMsg} />
        ) : info ? (
          <FeedbackInfo center={msgPositionCenter} type="info" message={info} />
        ) : successMsg ? (
          <FeedbackInfo
            center={msgPositionCenter}
            type="success"
            message={successMsg}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export default Input
