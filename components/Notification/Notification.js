import { CancelIcon, MarkRead } from "@/constants/icons";
import style from "./notification.module.css";
import NotificationCard from "./NotificationCard";

const Notification = ({ setOpenNotify, openNotify }) => {
  return (
    <main className={`${style.main} ${openNotify ? style.showNotify : ""}`}>
      <header className={style.notifyHeader}>
        <button className={style.closeBtn} onClick={() => setOpenNotify(false)}>
          <CancelIcon />
        </button>
        <h2>
          <span>3</span> Notifications
        </h2>
        <button>
          <MarkRead /> Mark All Read
        </button>
      </header>
      <div className={style.line}></div>
      <section className={style.notifyContent}>
        <NotificationCard />
      </section>
    </main>
  );
};

export default Notification;
