import { Navigate, Outlet, useLocation } from "react-router-dom";

import { url } from "@/core/route";
import { useAuthService } from "@/hooks/use-auth-service";

export const Layout = () => {
	const { token } = useAuthService();
	const { pathname } = useLocation();
	console.log({ token });
	console.log({ pathname });

	const isVisitor = token === null;
	const isMember = !isVisitor;

	const visitorOnly =
		pathname === "/" + url.web.signIn() || pathname === "/" + url.web.signUp();
	const memberOnly = pathname.startsWith("/todos");

	if (memberOnly && isMember) return <Outlet />;
	if (memberOnly && isVisitor) return <Navigate to="/sign-in" />;
	if (visitorOnly && isMember) return <Navigate to="/todos" />;
	if (visitorOnly && isVisitor) return <Outlet />;
	return <Navigate to="/todos" />;
};
