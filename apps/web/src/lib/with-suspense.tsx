// import type { ComponentType, ForwardedRef, SuspenseProps } from "react";
// import { Suspense, createElement, forwardRef } from "react";

// export function withSuspense<Props extends object>(
// 	component: ComponentType<Props>,
// 	suspenseProps: SuspenseProps & {
// 		FallbackComponent?: ComponentType;
// 	},
// ) {
// 	const Wrapped = forwardRef<ComponentType<Props>, Props>(
// 		(props: Props, ref: ForwardedRef<ComponentType<Props>>) =>
// 			createElement(
// 				Suspense,
// 				{
// 					fallback:
// 						suspenseProps.fallback ||
// 						(suspenseProps.FallbackComponent &&
// 							createElement(suspenseProps.FallbackComponent)),
// 				},
// 				createElement(component, { ...props, ref }),
// 			),
// 	);

// 	const name = component.displayName || component.name || "Unknown";
// 	Wrapped.displayName = `withSuspense(${name})`;

// 	return Wrapped;
// }
