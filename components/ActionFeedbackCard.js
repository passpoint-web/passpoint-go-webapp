import {
  ActionSuccessfulIcon,
  ActionPendingIcon,
  ActionFailedIcon,
} from "@/constants/icons";
const ActionFeedbackCard = ({
  content = {
    status: "", // success, failure, pending
    title: "",
    value: "",
  },
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
      {content.status === "success" ? (
        <ActionSuccessfulIcon />
      ) : content.status === "failure" ? (
        <ActionFailedIcon />
      ) : content.status === "pending" ? (
        <ActionPendingIcon />
      ) : (
        <></>
      )}
      <h2>{content.title}</h2>
      <p
        style={{
          fontSize: 16,
          textAlign: "center",
          textTransform: "capitalize",
        }}
      >
        {content.value}
      </p>
    </div>
  );
};

export default ActionFeedbackCard;
