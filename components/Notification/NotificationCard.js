import Link from "next/link";
import style from "./notification.module.css";
import { useEffect } from "react";
import { notifyAndAccess } from "@/services/restService";

const notificationData = [
	{
		showLink: true,
		alertType: "booking",
		title: "New Booking Alert",
		date: "4th of October 2023 || 10:00 am",
		message:
      "A customer named John Smith has just booked a 5-day tour to Bali for two adults. Booking reference number: XYZ123. Travel dates: November 15 - November 20.",
		linkText: "Please review and confirm.",
		url: "#",
	},
	{
		alertType: "payment",
		title: "Payment Alert",
		date: "4th of October 2023 || 10:00 am",
		message:
      "Payment Confirmation: $1,200 received for booking reference XYZ123. Payment was made via credit card ending in ****5678. Please update the booking status accordingly.",
	},
	{
		alertType: "invent",
		isRead: true,
		title: "Inventory",
		date: "4th of October 2023 || 10:00 am",
		message:
      "Only 3 standard rooms left at Hotel Paradise for the upcoming weekend. Consider updating availability or offering an alternative to customers.",
	},
	{
		alertType: "review",
		isRead: true,
		title: "Review",
		date: "4th of October 2023 || 10:00 am",
		message:
      "A customer, David Rodriguez, has left a 5-star review for their recent trip to Tokyo. Review: 'Exceptional service and a memorable experience!' Consider featuring this on your website.",
	},
];

const NotificationCard = ({triggerNotifications}) => {
	const getNotifications = async () => {
		const response = await notifyAndAccess.getAllNotifications()
		console.log(response)
	}
	useEffect(()=>{
		if (triggerNotifications) {
			getNotifications()
		}
	},[triggerNotifications])
	return (
		<>
			{notificationData.map((data, i) => (
				<main
					className={`${style.notifyCard} ${data.isRead && style.readCard}`}
					key={i}
				>
					<section className={style.notifyAlert}>
						<small className={style[`${data.alertType}Alert`]}>
							{data.title}
						</small>
						<span>{data.date}</span>
					</section>
					<section className={style.notifyMessage}>
						<p>{data.message}</p>
						{data.showLink && <Link href={data.url}>{data.linkText}</Link>}
					</section>
				</main>
			))}
		</>
	);
};

export default NotificationCard;
