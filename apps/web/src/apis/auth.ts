import { url } from "@/core/route";
import { tokenStore } from "@/lib/use-token-store";

import { http } from "./http";

import type { SignInPayload, SignUpPayload } from "@/types/user";

type Response = {
	message: string;
	token: string;
};

// MARK: Sign Up
export async function signUp(payload: SignUpPayload): Promise<Response> {
	return await http
		.post<Response>(url.api.users.create(), { json: payload })
		.json();
}

// MARK: Sign In
export async function signIn(payload: SignInPayload): Promise<Response> {
	return await http
		.post<Response>(url.api.users.login(), { json: payload })
		.json();
}

// MARK: Sign Out
export function signOut(): void {
	tokenStore.removeToken();
}
