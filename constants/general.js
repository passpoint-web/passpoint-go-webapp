import {
	LogoutIcon,
	NotificationIcon,
	NewNotificationIcon,
	ProfileIcon,
	SettingProfile,
	SideIcon1,
	SideIcon2,
	SideIcon3,
	SideIcon4,
	SideIcon5,
	SideIcon6,
	SideIcon7,
	SideIcon8,
	SideIcon9,
} from "@/constants/icons";

export const sidebarData = [
	{
		title: "Dashboard",
		icon: SideIcon1,
		path: "/dashboard",
	},
	{
		title: "Travel Services",
		icon: SideIcon2,
		path: "/travel",
	},
	// {
	// 	title: "Marketplace",
	// 	icon: SideIcon3,
	// 	path: "/marketplace",
	// },
	// {
	// 	title: "Invoices and Paylinks",
	// 	icon: SideIcon4,
	// 	path: "/invoice",
	// },
	// {
	// 	title: "Customer Management",
	// 	icon: SideIcon5,
	// 	path: "/customer",
	// },
	{
		title: "Wallet",
		icon: SideIcon6,
		path: "/wallet",
	},
	// {
	// 	title: "Team Setup",
	// 	icon: SideIcon7,
	// 	path: "/team",
	// },
	{
		title: "Settings",
		icon: SideIcon8,
		path: "/settings",
	},
	{
		title: "Help & Support",
		icon: SideIcon9,
		path: "/help",
	},
];

export const menuItems = (handleLogout, setOpenNotify) => [
	{
		type: "link",
		href: "/profile",
		icon: <ProfileIcon />,
		label: "Profile",
	},
	// {
	// 	type: "button",
	// 	// href: "/notifications",
	// 	onClick: () => setOpenNotify(true),
	// 	icon: <NewNotificationIcon />,
	// 	label: "Notifications",
	// },
	{
		type: "link",
		href: "/settings",
		icon: <SettingProfile />,
		label: "Account Settings",
	},
	{
		type: "button",
		onClick: handleLogout,
		icon: <LogoutIcon />,
		label: "Logout",
	},
];

// export const metricData = [
//   {
//     title: "Total Revenue",
//     icon: Metric1,
//     value: "2.300",
//   },
//   {
//     title: "Booking Conversion Rate",
//     icon: Metric2,
//     value: "20",
//   },
//   {
//     title: "Completed Bookings",
//     icon: Metric3,
//     value: "23%",
//   },
//   {
//     title: "Total Visits",
//     icon: Metric4,
//     value: "57",
//   },
// ];
