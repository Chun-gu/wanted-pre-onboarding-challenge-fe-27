import { useContext } from "react";

import { TokenStoreContext } from "@/contexts/todo-store-context";

export function useTokenStoreContext() {
	const tokenStore = useContext(TokenStoreContext);

	if (tokenStore === null) {
		throw new Error("tokenStore is null");
	}

	return tokenStore;
}
