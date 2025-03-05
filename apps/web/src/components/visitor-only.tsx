import { Navigate } from "react-router-dom";

import { url } from "@/core/route";
import { useAuthService } from "@/hooks/use-auth-service";

import type { ReactNode } from "react";

type VisitorOnlyProps = { children: ReactNode };

export const VisitorOnly = ({ children }: VisitorOnlyProps) => {
	const auth = useAuthService();

	return auth ? <Navigate to={url.web.root()} /> : children;
};
