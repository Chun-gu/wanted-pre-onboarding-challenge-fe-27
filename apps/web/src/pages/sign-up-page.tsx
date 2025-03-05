import { useNavigate } from "react-router-dom";

import { signUp } from "@/apis/auth";
import { tokenStore } from "@/lib/use-token-store";
import { validate } from "@/lib/validate";
import { signUpSchema } from "@/types/user";

export const SignUpPage = () => {
	const navigate = useNavigate();

	async function handleSumbitSignUpForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const formDataObj = Object.fromEntries(formData);

		const { isValid, data, error } = validate(formDataObj, signUpSchema);

		if (isValid === false) {
			console.log(error);
			return;
		}

		const { token } = await signUp(data);

		tokenStore.setToken(token);

		navigate("/", { replace: true });
	}

	return (
		<>
			<h1>회원 가입</h1>

			<form noValidate onSubmit={handleSumbitSignUpForm}>
				<label htmlFor="email">이메일</label>
				<input
					id="email"
					name="email"
					type="email"
					autoComplete="username"
					required
					aria-required
					defaultValue="test@email.com"
				/>

				<label htmlFor="password">비밀번호</label>
				<input
					id="password"
					name="password"
					type="password"
					autoComplete="new-password"
					required
					aria-required
					minLength={8}
					defaultValue="qwer1234"
				/>

				<label htmlFor="passwordConfirm">비밀번호 확인</label>
				<input
					id="passwordConfirm"
					name="passwordConfirm"
					type="password"
					autoComplete="new-password"
					required
					aria-required
					minLength={8}
					defaultValue="qwer1234"
				/>

				<button type="submit">가입</button>
			</form>
		</>
	);
};
