/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo, useSyncExternalStore } from "react";

type Listener = () => void;

class SearchParamsStore {
	searchParams: URLSearchParams;
	listeners = new Set<Listener>();

	constructor() {
		this.searchParams = new URLSearchParams(window.location.search);
	}

	notify() {
		console.log(this.listeners);
		this.listeners.forEach((l) => {
			console.log("notify");
			l();
		});
	}

	subscribe = (listener: Listener) => {
		console.log("sub");
		// window.addEventListener("popstate", listener);
		this.listeners.add(listener);

		return () => {
			console.log("un-sub");
			this.listeners.delete(listener);
			// window.addEventListener("popstate", listener);
		};
	};

	set(searchParams: URLSearchParams | Record<string, unknown>) {
		console.log("===set===");

		const newSearchParams =
			searchParams instanceof URLSearchParams
				? searchParams
				: new URLSearchParams(searchParams);

		console.log("cur", this.searchParams);
		console.log("new", newSearchParams);

		const isEqual = this.isEqual(this.searchParams, newSearchParams);
		console.log({ isEqual });

		if (isEqual) return;

		this.searchParams = newSearchParams;

		const newUrl =
			window.location.pathname +
			"?" +
			this.searchParams.toString() +
			window.location.hash;

		console.log(newUrl);

		window.history.pushState({}, "", newUrl);
		this.notify();
	}

	get = () => {
		console.log("===get===");

		const newSearchParams = new URLSearchParams(window.location.search);
		console.log("cur", this.searchParams);
		console.log("new", newSearchParams);

		const isEqual = this.isEqual(this.searchParams, newSearchParams);
		console.log({ isEqual });

		if (isEqual === false) {
			this.searchParams = newSearchParams;
		}

		return this.searchParams;
	};

	private isEqual(a: URLSearchParams, b: URLSearchParams): boolean {
		// return a.toString() === b.toString();
		const A = [...a].sort();
		const B = [...b].sort();

		return A.toString() === B.toString();
		// return equalDeeply(a, b);
	}
}

const searchParamsStore = new SearchParamsStore();

export function useSearchParams() {
	const searchParams = useSyncExternalStore(
		searchParamsStore.subscribe,
		searchParamsStore.get,
	);

	const setSearchParams = useCallback(
		(searchParams: URLSearchParams | Record<string, unknown>) => {
			searchParamsStore.set(searchParams);
		},
		[],
	);

	return [searchParams, setSearchParams] as const;
}

function serialize(value: any) {
	if (value === undefined || value === null) return undefined;

	switch (typeof value) {
		case "string":
			return String(value);
		case "number":
			return String(value);
		case "boolean":
			return value ? "true" : "false";
	}
}

function equalDeeply(a: any, b: any): boolean {
	if (a === b) {
		return true;
	}

	if (typeof a !== typeof b) {
		return false;
	}

	if (isPlainObject(a) && isPlainObject(b)) {
		const aKeys = getObjectKeys(a);
		const bKeys = getObjectKeys(b);

		if (aKeys.length !== bKeys.length) {
			return false;
		}

		return bKeys.every((key) => equalDeeply(a[key], b[key]));
	}

	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) {
			return false;
		}

		return !a.some((item, index) => equalDeeply(item, b[index]) === false);
	}

	return false;
}

function getObjectKeys(obj: any) {
	return Object.keys(obj).filter((key) => obj[key] !== undefined);
}

export function isPlainObject(obj: any) {
	if (hasObjectPrototype(obj) === false) {
		return false;
	}

	// If has modified constructor
	const ctor = obj.constructor;
	if (typeof ctor === "undefined") {
		return true;
	}

	// If has modified prototype
	const prot = ctor.prototype;
	if (hasObjectPrototype(prot) === false) {
		return false;
	}

	// If constructor does not have an Object-specific method
	// eslint-disable-next-line no-prototype-builtins
	if (prot.hasOwnProperty("isPrototypeOf") === false) {
		return false;
	}

	// Most likely a plain Object
	return true;
}

function hasObjectPrototype(obj: any) {
	return Object.prototype.toString.call(obj) === "[object Object]";
}

/*
 *
 */

// type QueryparamTypeMap = {
// 	string: string;
// 	boolean: boolean;
// 	number: number;
// };

// type QueryParamType = keyof QueryparamTypeMap;

// type QueryparamConfig = {
// 	[key in string]: QueryParamType;
// };

// type QueryParamResult<T extends QueryparamConfig> = {
// 	[key in keyof T]?: QueryparamTypeMap[T[key]];
// };

// const v = {
// 	parse(value: string | null, type: QueryParamType) {
// 		if (value === null) return undefined;
// 		switch (type) {
// 			case "string":
// 				return value;
// 			case "number":
// 				return Number(value);
// 			case "boolean":
// 				return value === "true";
// 		}
// 	},
// 	serialize(value: any, type: QueryParamType) {
// 		if (value === undefined || value === null) return undefined;
// 		switch (type) {
// 			case "string":
// 				return String(value);
// 			case "number":
// 				return String(value);
// 			case "boolean":
// 				return value ? "true" : "false";
// 		}
// 	},
// };

// export function useQueryParams<T extends QueryparamConfig>(
// 	config: T,
// 	deps: any[] = [],
// ): [QueryParamResult<T>, (newParams: Partial<QueryParamResult<T>>) => void] {
// 	const getParams = useCallback(() => {
// 		const searchParams = getSearchParams();
// 		const newParams = {} as QueryParamResult<T>;
// 		for (const key in config) {
// 			const type = config[key];
// 			const value = v.parse(searchParams.get(key), type);
// 			newParams[key] = value as any;
// 		}
// 		return newParams;
// 	}, [config]);

// 	const [params, _setParams] = useState<QueryParamResult<T>>(() => {
// 		return getParams();
// 	});

// 	const setParams = useCallback((newParams: QueryParamResult<T>) => {
// 		_setParams((params) => {
// 			return isEqual(params, newParams) ? params : { ...params, ...newParams };
// 		});
// 	}, []);

// 	const syncParams = useCallback((newParams: Partial<QueryParamResult<T>>) => {
// 		if (typeof window === "undefined") return;

// 		const searchParams = getSearchParams();
// 		for (const key in newParams) {
// 			const type = config[key];
// 			const value = v.serialize(newParams[key], type);
// 			if (value != null) {
// 				searchParams.set(key, value);
// 			} else {
// 				searchParams.delete(key);
// 			}
// 		}
// 		const newUrl =
// 			window.location.pathname +
// 			"?" +
// 			searchParams.toString() +
// 			window.location.hash;

// 		pushState(newUrl);
// 	}, deps);

// 	useEffect(() => {
// 		const handleStateChange = () => {
// 			const newParams = getParams();
// 			setParams(newParams);
// 		};

// 		window.addEventListener("popstate", handleStateChange);
// 		pushStateEventManager.addEventListener(handleStateChange);

// 		return () => {
// 			window.removeEventListener("popstate", handleStateChange);
// 			pushStateEventManager.removeEventListener(handleStateChange);
// 		};
// 	}, deps);

// 	return [params, syncParams];
// }

// const pushStateEventManager = (function () {
// 	let subscribers: Function[] = [];

// 	return {
// 		notify: () => {
// 			subscribers.forEach((callback) => {
// 				callback();
// 			});
// 		},
// 		addEventListener: (callback: Function) => {
// 			subscribers.push(callback);
// 		},
// 		removeEventListener: (callback: Function) => {
// 			subscribers = subscribers.filter((v) => callback !== v);
// 		},
// 	};
// })();

// export function pushState(newUrl: string) {
// 	window.history.pushState({}, "", newUrl);
// 	pushStateEventManager.notify();
// }

// function getSearchParams() {
// 	return new URLSearchParams(window.location.search);
// }

// function isEqual(a: any, b: any): boolean {
// 	if (a === b) return true;
// 	if (typeof a !== typeof b) return false;

// 	if (typeof a === "object") {
// 		const aEntries = Object.entries(a);
// 		const bEntries = Object.entries(b);

// 		if (aEntries.length !== bEntries.length) return false;

// 		return aEntries.every(([key, value]) => b[key as any] === value);
// 	}

// 	return false;
// }
