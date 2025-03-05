import { forwardRef, useState } from "react";

export const PasswordInput = forwardRef<
	HTMLInputElement,
	React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
	const [showPassword, setShowPassword] = useState(false);
	const disabled =
		props.value === "" || props.value === undefined || props.disabled;

	return (
		<div className="relative">
			<input
				type={showPassword ? "text" : "password"}
				className={"hide-password-toggle pr-10" + className}
				ref={ref}
				{...props}
			/>
			<button
				type="button"
				onClick={() => setShowPassword((prev) => !prev)}
				disabled={disabled}
			>
				{showPassword && !disabled ? (
					<EyeIcon className="h-4 w-4" aria-hidden="true" />
				) : (
					<EyeOffIcon className="h-4 w-4" aria-hidden="true" />
				)}
				<span className="sr-only">
					{showPassword ? "Hide password" : "Show password"}
				</span>
			</button>

			{/* hides browsers password toggles */}
			<style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
		</div>
	);
});

PasswordInput.displayName = "PasswordInput";

const EyeIcon = (props: React.ComponentPropsWithoutRef<"svg">) => {
	return <svg></svg>;
};
const EyeOffIcon = (props: React.ComponentPropsWithoutRef<"svg">) => {
	return <svg></svg>;
};
