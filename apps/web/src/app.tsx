import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { tokenStore } from "./lib/use-token-store";
import { TokenStoreProvider } from "./providers/token-store-provider";
import { Routes } from "./routes";

const queryClient = new QueryClient();

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<TokenStoreProvider tokenStore={tokenStore}>
				<Routes />
				<ReactQueryDevtools />
			</TokenStoreProvider>
		</QueryClientProvider>
	);
};
