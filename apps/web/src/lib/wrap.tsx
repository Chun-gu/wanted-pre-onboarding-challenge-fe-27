/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import type { ComponentProps, ComponentType } from "react";

type Wrapper<
	TWrapper extends typeof Suspense | typeof ErrorBoundary | ComponentType,
> = [TWrapper, Omit<ComponentProps<TWrapper>, "children">];

type Wrappers = (
	| Wrapper<typeof Suspense>
	| Wrapper<typeof ErrorBoundary>
	| Wrapper<ComponentType<any>>
)[];

class Wrap {
	constructor(private wrappers: Wrappers) {}

	onSuspense(props: Omit<ComponentProps<typeof Suspense>, "children"> = {}) {
		this.wrappers.unshift([Suspense, props]);
		return this;
	}

	onError(props: Omit<ComponentProps<typeof ErrorBoundary>, "children">) {
		this.wrappers.unshift([ErrorBoundary, props]);
		return this;
	}

	onEmpty<TProps extends ComponentProps<ComponentType>>(
		Component: ComponentType<TProps>,
	) {
		this.wrappers.unshift([Component, {}]);
		return this;
	}

	on<TProps extends ComponentProps<ComponentType>>(
		Component: ComponentType<TProps>,
	) {
		const WrappedComponent = (props: TProps) =>
			this.wrappers.reduce(
				(acc, [WrapperComponent, wrapperProps]) => (
					<WrapperComponent {...(wrapperProps as any)}>{acc}</WrapperComponent>
				),
				<Component {...props} />,
			);

		return WrappedComponent;
	}
}

export const wrap = {
	onSuspense: (props: Omit<ComponentProps<typeof Suspense>, "children"> = {}) =>
		new Wrap([[Suspense, props]]),
	onError: (props: Omit<ComponentProps<typeof ErrorBoundary>, "children">) =>
		new Wrap([[ErrorBoundary, props]]),
};
