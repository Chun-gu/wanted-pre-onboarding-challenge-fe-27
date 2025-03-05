import { useTokenStore } from "@/lib/use-token-store";
import { authService } from "@/services/auth.service";

import type { SignInPayload, SignUpPayload } from "@/types/user";

export function useAuthService() {
	const [token, setToken, removeToken] = useTokenStore();

	async function signUp(payload: SignUpPayload) {
		await authService.signUp(payload);
	}

	async function signIn(payload: SignInPayload) {
		const token = await authService.signIn(payload);
		setToken(token);
	}

	async function signOut() {
		await authService.signOut();
		removeToken();
	}

	return { token, signUp, signIn, signOut };
}
