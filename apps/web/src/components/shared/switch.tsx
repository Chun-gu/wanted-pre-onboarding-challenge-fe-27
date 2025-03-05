import React from "react";

export const Switch = <TCase,>({
	target,
	cases,
	fallthrough = null,
}: {
	// trigger: React.Key;
	// fallback?: React.ReactNode;
	// children: TMatch | Array<TMatch>;
	target: TCase;
	cases: Array<{ case: TCase; value: React.ReactNode }>;

	fallthrough?: React.ReactNode;
}) => {
	const match = cases.find((singleCase) => singleCase.case === target);

	// const candidates = Array.isArray(children) ? children : [children];

	// const Matched = candidates.find((candidate) => {
	// 	return (
	// 		(candidate.arguments as React.ComponentProps<TMatch>).target === trigger
	// 	);
	// });

	// const props = Matched?.arguments as React.ComponentProps<TMatch>;

	// if (Matched) return <Matched {...props} />;
	// return fallback;
	return match ? match.value : fallthrough;
};

// type MatchProps = { target: string; children: React.ReactNode };

// export const Match = ({ target, children }: MatchProps) => {
// 	return (
// 		<div>
// 			<span>{target}</span>
// 			{children}
// 		</div>
// 	);
// };

export const Example = () => {
	return (
		<Switch
			target="a"
			cases={[
				{
					case: "a",
					value: <div>'a'</div>,
				},
				{
					case: "b",
					value: <div>'b'</div>,
				},
			]}
		/>
	);
};

export function createContext<TContextValue extends object | null>(
	rootComponentName: string,
	defaultContext?: TContextValue,
) {
	const Context = React.createContext<TContextValue | undefined>(
		defaultContext,
	);

	const Provider: React.FC<TContextValue & { children: React.ReactNode }> = (
		props,
	) => {
		const { children, ...context } = props;

		// prop이 변경됐을 때만 다시 메모
		const value = React.useMemo(
			() => context,
			// eslint-disable-next-line react-hooks/exhaustive-deps
			Object.values(context),
		) as TContextValue;

		return <Context.Provider value={value}>{children}</Context.Provider>;
	};

	Provider.displayName = rootComponentName + "Provider";

	function useContext(consumerName: string) {
		const context = React.useContext(Context);

		if (context) return context;
		if (defaultContext !== undefined) return defaultContext;

		// defaultContext가 지정되지 않았다면, 꼭 필요한 context이므로 오류 던지기
		throw new Error(`${consumerName} must be used within ${rootComponentName}`);
	}

	return [Provider, useContext] as const;
}
