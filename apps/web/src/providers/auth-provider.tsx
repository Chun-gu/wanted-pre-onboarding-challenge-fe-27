import { createContext, useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import type { ReactNode } from "react";
import type { Auth } from "@/core/models/auth";

type AuthProviderProps = { children: ReactNode };

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [auth, setAuth] = useState<Auth | null>(null);
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();

	const signIn = useCallback(
		async (auth: Auth) => {
			setAuth(auth);
			// navigate(location.state.from ?? "/");
		},
		[location.state.from, navigate],
	);

	const signOut = useCallback(async () => {
		window.localStorage.removeItem("auth-token");
		// navigate("/", { replace: true });
	}, [navigate]);

	// const auth = useContext(AuthContextValue);
	// const dispatch = useContext(AuthContextDispatch);

	const value = useMemo(
		() => ({
			auth,
			signIn,
			signOut,
		}),
		[auth, signIn, signOut],
	);

	return (
		// <AuthContextValue.Provider value={auth}>
		// 	<AuthContextDispatch.Provider value={dispatch}>
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
		// 	</AuthContextDispatch.Provider>
		// </AuthContextValue.Provider>
	);
};

export const AuthContext = createContext<{
	auth: Auth | null;
	signIn: (auth: Auth) => Promise<void>;
	signOut: () => Promise<void>;
} | null>(null);
// const AuthContextValue = createContext(null);
// const AuthContextDispatch = createContext(null);
