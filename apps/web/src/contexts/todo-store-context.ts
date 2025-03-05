import { createContext } from "react";

import { type TokenStore } from "@/lib/use-token-store";

export const TokenStoreContext = createContext<TokenStore | null>(null);
