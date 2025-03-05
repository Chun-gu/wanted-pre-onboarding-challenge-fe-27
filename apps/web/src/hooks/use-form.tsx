import { z } from "zod";

import { signUpSchema } from "@/types/user";

export function useForm<TValues>(
	schema: z.Schema<TValues>,
	onSubmit: (values: TValues) => void,
) {
	return {
		onSubmit: (values: unknown) => {
			const parsedValues = schema.parse(values);
			onSubmit(parsedValues);
		},
	};
}

function Form() {
	const form = useForm(signUpSchema, (values) => {
		console.log(values);
	});
}
