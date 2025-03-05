import { useEffect, useRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	defaultCustomValidity?: string;
	customValidity?: string;
};

/**
 * Usage:
 * <Input customValidity="your validation message" /> // add constraint
 * or
 * <Input customValidity="" /> // remove constraint
 * or
 * <Input defaultCustomValidity="you message" /> // initial validationMessage
 */
export const Input = ({
	defaultCustomValidity,
	customValidity,
	...props
}: InputProps) => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	// 1. "Controlled" case
	useEffect(() => {
		const input = inputRef.current;

		if (customValidity != null && input) {
			input.setCustomValidity(customValidity);
		}
	}, [customValidity]);

	// 2. "Uncontrolled" case
	const customValidityRef = useRef(defaultCustomValidity);

	useEffect(() => {
		const input = inputRef.current;

		if (customValidityRef.current && input) {
			input.setCustomValidity(customValidityRef.current);
		}
	}, []);

	return <input ref={inputRef} {...props} />;
};
