import ky from "ky";

import { tokenStore } from "@/lib/use-token-store";

const API_URL = "http://localhost:8080";

export const http = ky.create({
	prefixUrl: API_URL,
	// hooks: {
	// 	beforeError: [
	// 		(error) => {
	// 			const { response } = error;

	// 			if (response && response.body) {
	// 				error.message = response.details;
	// 			}

	// 			return error;
	// 		},
	// 	],
	// },
});

export const httpWithAuth = http.extend({
	hooks: {
		beforeRequest: [
			(request) => {
				request.headers.set("Authorization", `${tokenStore.getToken() ?? ""}`);
			},
		],
	},
});
