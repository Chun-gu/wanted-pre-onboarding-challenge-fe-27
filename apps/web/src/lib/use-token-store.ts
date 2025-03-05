import { useSyncExternalStore } from "react";

import { useTokenStoreContext } from "@/hooks/use-token-store-context";

type Listener = () => void;

export abstract class ExternalStore {
	private listeners = new Set<Listener>();

	subscribe = (listener: Listener) => {
		this.listeners.add(listener);

		return () => {
			this.listeners.delete(listener);
		};
	};

	protected notify() {
		this.listeners.forEach((listener) => listener());
	}
}

type Token = string;

interface TokenStoreStrategy {
	setToken(value: Token): void;
	getToken(): Token | null;
	removeToken(): void;
}

export class LocalStorageStrategy implements TokenStoreStrategy {
	constructor(private key: string) {}

	setToken(token: Token) {
		localStorage.setItem(this.key, token);
	}

	getToken(): Token | null {
		return localStorage.getItem(this.key);
	}

	removeToken(): void {
		localStorage.removeItem(this.key);
	}
}

export class TokenStore extends ExternalStore {
	constructor(private strategy: TokenStoreStrategy) {
		super();
	}

	setToken(token: Token): void {
		this.strategy.setToken(token);
		this.notify();
	}

	removeToken(): void {
		this.strategy.removeToken();
		this.notify();
	}

	getToken = (): Token | null => {
		return this.strategy.getToken();
	};
}

const TOKEN_KEY = "todo-list-auth-token";

export const tokenStore = new TokenStore(new LocalStorageStrategy(TOKEN_KEY));

export function useTokenStore() {
	const tokenStore = useTokenStoreContext();

	const token = useSyncExternalStore(tokenStore.subscribe, tokenStore.getToken);

	function setToken(token: string) {
		tokenStore.setToken(token);
	}

	function removeToken() {
		tokenStore.removeToken();
	}

	return [token, setToken, removeToken] as const;
}
