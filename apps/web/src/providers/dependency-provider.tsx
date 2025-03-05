// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// import { LocalStorageStrategy, TokenStore } from "@/lib/use-token-store";

// import { TokenStoreProvider } from "./token-store-provider";

// import type { ReactNode } from "react";

// type DependencyProviderProps = { children: ReactNode };

// export const tokenStore = new TokenStore(new LocalStorageStrategy());

// export const DependencyProvider = ({ children }: DependencyProviderProps) => {
// 	return (
// 		<QueryClientProvider client={queryClient}>
// 			<TokenStoreProvider tokenStore={tokenStore}>
// 				{children}
// 				<ReactQueryDevtools />
// 			</TokenStoreProvider>
// 		</QueryClientProvider>
// 	);
// };
