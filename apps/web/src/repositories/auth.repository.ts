import { http } from "@/apis/http";

import type { SignInPayload, SignUpPayload } from "@/types/user";

type AuthResponse = {
	message: string;
	token: string;
};

// MARK: Sign Up
async function signUp(payload: SignUpPayload): Promise<AuthResponse> {
	return await http
		.post<AuthResponse>("users/create", { json: payload })
		.json();
}

// MARK: Sign In
async function signIn(payload: SignInPayload): Promise<AuthResponse> {
	return await http.post<AuthResponse>("users/login", { json: payload }).json();
}

// MARK: Sign Out
async function signOut(): Promise<void> {}

export const authRepository = { signUp, signIn, signOut };
