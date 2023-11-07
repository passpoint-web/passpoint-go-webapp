
import { useRouter } from "next/navigation";
import useAuth from "./useAuth";
import ProtectedRoute from "./ProtectedRoute";
export const ProtectedRoutes = ({ children }) => {
  const router = useRouter();

  const { isAuthenticated } = useAuth(); // remember where we got this

 if (
    !isAuthenticated &&
    (router.pathname.startsWith("/dashboard"))
  ) {
    return <ProtectedRoute />
}

  return children;
};