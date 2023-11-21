import {
  ActionSuccessfulIcon,
  ActionPendingIcon,
  ActionFailedIcon,
} from "@/constants/icons";
const ActionFeedbackCard = ({
  icon=true,
  content = {
    status: "", // success, failure, pending
    title: "",
    value: "",
  },
  textTransform = "",
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        maxWidth: 500,
      }}
    >
      {icon ? (content.status === "success" ? (
        <ActionSuccessfulIcon />
      ) : content.status === "failure" ? (
        <ActionFailedIcon />
      ) : content.status === "pending" ? (
        <ActionPendingIcon />
      ) : (
        <></>
      )): <></>}
      <h2 style={{ marginTop: "20px" }}>{content.title}</h2>
      <p
        style={{
          fontSize: 16,
          textAlign: "center",
          textTransform: textTransform,
        }}
      >
        {content.value}
      </p>
    </div>
  );
};

export default ActionFeedbackCard;
