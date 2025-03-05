import { TokenStoreContext } from "@/contexts/todo-store-context";

import type { ReactNode } from "react";
import type { TokenStore } from "@/lib/use-token-store";

type TokenStoreProviderProps = { tokenStore: TokenStore; children: ReactNode };

export const TokenStoreProvider = ({
	tokenStore,
	children,
}: TokenStoreProviderProps) => {
	return (
		<TokenStoreContext.Provider value={tokenStore}>
			{children}
		</TokenStoreContext.Provider>
	);
};
