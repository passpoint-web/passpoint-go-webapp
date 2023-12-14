
import { usePathname } from "next/navigation";
import useAuth from "./useAuth";
// import ProtectedRoute from "./ProtectedRoute";
export const ProtectedRoutes = ({ children }) => {
	const pathname = usePathname()

	const { isAuthenticated } = useAuth(); // remember where we got this

	if (
		!isAuthenticated &&
    (pathname.startsWith("/dashboard"))
	) {
		return <p></p>
		// <ProtectedRoute />
	}

	return children;
};