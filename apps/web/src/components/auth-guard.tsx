import { Navigate, useLocation } from "react-router-dom";

import { useAuthService } from "@/hooks/use-auth-service";

import type { ReactNode } from "react";

type AuthGuardProps = { children: ReactNode };

export const AuthGuard = ({ children }: AuthGuardProps) => {
	console.log("AuthGuard");
	// const [canAccess, setCanAccess] = useState(false);

	// useEffect(() => {
	// 	const token = localStorage.getItem("auth-token");
	// 	if (token) setCanAccess(true);
	// }, []);

	const auth = useAuthService();
	const location = useLocation();
	console.log(location);

	if (auth.token === null) {
		return <Navigate to="/sign-in" replace />;
	}

	return children;
};
