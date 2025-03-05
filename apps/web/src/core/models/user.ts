import { z } from "zod";

export interface User {
	id: string;
	email: string;
	password: string;
	createdAt: Date;
}

export const UserSchema = z.object({
	email: z.string().email({ message: "이메일 주소를 확인해 주세요." }),
	password: z
		.string()
		.min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." }),
});
