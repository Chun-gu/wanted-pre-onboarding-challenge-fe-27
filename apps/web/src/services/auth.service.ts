import { authRepository } from "@/repositories/auth.repository";

import type { SignInPayload, SignUpPayload } from "@/types/user";

// MARK: Sign Up
async function signUp(payload: SignUpPayload) {
	await authRepository.signUp(payload);
}

// MARK: Sign In
async function signIn(payload: SignInPayload) {
	const { token } = await authRepository.signIn(payload);
	// tokenStore.set(token);
	return token;
}

// MARK: Sign Out
async function signOut() {
	await authRepository.signOut();
	// tokenStore.remove();
}

export const authService = { signUp, signIn, signOut };
