import { z } from "zod";

export interface User {
	id: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

export type SignUpPayload = Pick<User, "email" | "password">;
export type SignInPayload = Pick<User, "email" | "password">;

const ERR_MSG = {
	email: {
		required: "이메일을 입력해 주세요.",
		format: "이메일 형식을 확인해 주세요.",
	},
	password: {
		required: "비밀번호를 입력해 주세요.",
		minLength: "비밀번호는 최소 8자 이상이어야 합니다.",
		confirm: "비밀번호가 일치하지 않습니다.",
	},
};

const emailSchema = z
	.string()
	.min(1, { message: ERR_MSG.email.required })
	.email({ message: ERR_MSG.email.format });

const passwordSchema = z
	.string({ required_error: ERR_MSG.password.required })
	.min(8, { message: ERR_MSG.password.minLength });

export const signInSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
});

export const signUpSchema = signInSchema
	.extend({
		passwordConfirm: passwordSchema,
	})
	.refine(({ password, passwordConfirm }) => password === passwordConfirm, {
		path: ["passwordConfirm"],
		message: ERR_MSG.password.confirm,
	});

export type SignUpSchema = z.infer<typeof signUpSchema>;
