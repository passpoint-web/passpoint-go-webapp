import "@/assets/styles/globals.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "react-phone-input-2/lib/style.css"
import { Providers } from "./providers"
export const metadata = () => {
	return {
		title: "Passpoint Go",
		description: "",
	}
}
export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Providers>
					{children}
					<ToastContainer
						position="top-right"
						autoClose={4000}
						hideProgressBar={true}
						newestOnTop={false}
						draggable={false}
						closeOnClick
						pauseOnHover
					/>
				</Providers>
			</body>
		</html>
	)
}
// https://medium.com/how-to-react/how-to-setup-redux-in-nextjs-5bce0d82b8de
