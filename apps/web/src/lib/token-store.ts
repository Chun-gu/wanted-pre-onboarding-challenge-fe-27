// type Token = string;

// interface TokenStoreStrategy {
// 	set(value: Token): void;
// 	get(): Token | null;
// 	remove(): void;
// }

// class LocalStorageStrategy implements TokenStoreStrategy {
// 	private key = "asdfs";

// 	set(token: Token): void {
// 		window.localStorage.setItem(this.key, token);
// 	}

// 	get(): Token | null {
// 		return localStorage.getItem(this.key);
// 	}

// 	remove(): void {
// 		localStorage.removeItem(this.key);
// 	}
// }

// class TokenStore {
// 	constructor(private strategy: TokenStoreStrategy) {}

// 	set(token: Token): void {
// 		this.strategy.set(token);
// 	}

// 	get(): Token | null {
// 		return this.strategy.get();
// 	}

// 	remove(): void {
// 		this.strategy.remove();
// 	}
// }

// export const tokenStore = new TokenStore(new LocalStorageStrategy());
