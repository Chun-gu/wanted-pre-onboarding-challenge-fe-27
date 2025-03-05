import { ComponentType } from "react";

type Hoc<Props extends object> = (
	component: ComponentType<Props>,
) => ComponentType<Props>;

type ComposeReturnType<Props extends object> = (
	component: ComponentType<Props>,
) => ComponentType<Props>;

export function compose<Props extends object>(
	...hocs: Array<Hoc<Props>>
): ComposeReturnType<Props> {
	return (component: ComponentType<Props>) =>
		hocs.reduceRight((composed, hoc) => hoc(composed), component);
}
