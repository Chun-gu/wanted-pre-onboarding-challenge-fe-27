// /* eslint-disable @typescript-eslint/no-explicit-any */
// import * as React from "react";

// type ShouldAllowNavigation = any;
// type BlockerFn = () => Promise<ShouldAllowNavigation> | ShouldAllowNavigation;
// type ReactNode = any;
// type Register = object;
// type Router<T = any, K = any, O = any, P = any> = T | K | O | P;
// type AnyRouter = Router<any, any, any, any>;
// type RegisteredRouter = Register extends {
// 	router: infer TRouter extends AnyRouter;
// }
// 	? TRouter
// 	: AnyRouter;
// const routerContext = React.createContext<Router<any, any>>(null!);

// export function getRouterContext() {
// 	if (typeof document === "undefined") {
// 		return routerContext;
// 	}

// 	if (window.__TSR_ROUTER_CONTEXT__) {
// 		return window.__TSR_ROUTER_CONTEXT__;
// 	}

// 	window.__TSR_ROUTER_CONTEXT__ = routerContext as any;

// 	return routerContext;
// }

// export function useRouter<TRouter extends AnyRouter = RegisteredRouter>(opts?: {
// 	warn?: boolean;
// }): TRouter {
// 	const value = React.useContext(getRouterContext());
// 	console.warn(
// 		!((opts?.warn ?? true) && !value),
// 		"useRouter must be used inside a <RouterProvider> component!",
// 	);
// 	return value as any;
// }

// type BlockerResolver = {
// 	status: "idle" | "blocked";
// 	proceed: () => void;
// 	reset: () => void;
// };

// type BlockerOpts = {
// 	blockerFn?: BlockerFn;
// 	condition?: boolean | any;
// };

// export function useBlocker(blockerFnOrOpts?: BlockerOpts): BlockerResolver;
// export function useBlocker(
// 	blockerFnOrOpts?: BlockerFn | BlockerOpts,
// 	condition: boolean | any = true,
// ): BlockerResolver {
// 	const { blockerFn, blockerCondition } = blockerFnOrOpts
// 		? typeof blockerFnOrOpts === "function"
// 			? { blockerFn: blockerFnOrOpts, blockerCondition: condition }
// 			: {
// 					blockerFn: blockerFnOrOpts.blockerFn,
// 					blockerCondition: blockerFnOrOpts.condition,
// 				}
// 		: { blockerFn: undefined, blockerCondition: condition };

// 	const { history } = useRouter();

// 	const [resolver, setResolver] = React.useState<BlockerResolver>({
// 		status: "idle",
// 		proceed: () => {},
// 		reset: () => {},
// 	});

// 	React.useEffect(() => {
// 		const blockerFnComposed = async () => {
// 			// If a function is provided, it takes precedence over the promise blocker
// 			if (blockerFn) return await blockerFn();

// 			const promise = new Promise<boolean>((resolve) => {
// 				setResolver({
// 					status: "blocked",
// 					proceed: () => resolve(true),
// 					reset: () => resolve(false),
// 				});
// 			});

// 			const canNavigateAsync = await promise;

// 			setResolver({
// 				status: "idle",
// 				proceed: () => {},
// 				reset: () => {},
// 			});

// 			return canNavigateAsync;
// 		};

// 		return !blockerCondition ? undefined : history.block(blockerFnComposed);
// 	}, [blockerFn, blockerCondition, history]);

// 	return resolver;
// }

// export function Block({ blockerFn, condition, children }: PromptProps) {
// 	const resolver = useBlocker({ blockerFn, condition });

// 	return children
// 		? typeof children === "function"
// 			? children(resolver)
// 			: children
// 		: null;
// }

// export type PromptProps = {
// 	blockerFn?: BlockerFn;
// 	condition?: boolean | any;
// 	children?: ReactNode | (({ proceed, reset }: BlockerResolver) => ReactNode);
// };
