import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthService } from "@/hooks/use-auth-service";
import { cn } from "@/lib/utils";
import { validateFormData } from "@/lib/validate";
import { signInSchema } from "@/types/user";

import type { SubmitHandler } from "react-hook-form";
import type { ZodFormattedError, z } from "zod";

import styles from "./sign-in-page.module.css";

type FormValues = z.infer<typeof signInSchema>;

export const SignInPage = () => {
	// const {
	// 	register,
	// 	handleSubmit,
	// 	formState: { errors },
	// } = useForm<FormValues>({
	// 	resolver: zodResolver(signInSchema),
	// });
	const { signIn } = useAuthService();
	const [formError, setFormError] = useState<ZodFormattedError<FormValues>>();

	// const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);
	async function handleSumbitSignInForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const { isValid, data, error } = validateFormData(
			new FormData(e.currentTarget),
			signInSchema,
		);

		if (isValid === false) {
			console.log(error);
			setFormError(error);
			return;
		}

		signIn(data);
	}

	return (
		<>
			<h1>로그인</h1>

			<form noValidate onSubmit={handleSumbitSignInForm}>
				<label htmlFor="email">이메일</label>
				<input
					// {...register("email")}
					id="email"
					name="email"
					type="email"
					autoComplete="username"
					required
					aria-required
					defaultValue="test@email.com"
					className={styles["email-input"]}
					// className={cn(
					// 	styles["email-input"],
					// 	formError?.email?._errors && "border-red-500",
					// )}
				/>
				{/* <p className={styles["error-message"]}> */}
				<p
					className={cn(
						styles["error-message"],
						formError?.email?._errors && "text-red-500",
					)}
				>
					{formError?.email?._errors[0]}
				</p>

				<label htmlFor="password">비밀번호</label>
				<input
					// {...register("password")}
					id="password"
					name="password"
					type="password"
					autoComplete="password"
					required
					aria-required
					minLength={8}
					defaultValue="qwer1234"
				/>
				<p className="text-red-500">{formError?.password?._errors[0]}</p>

				<button type="submit" className={styles["submit-button"]}>
					로그인
				</button>
			</form>
		</>
	);
};
